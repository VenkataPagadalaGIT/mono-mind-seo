from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Mono Mind API", version="1.0.0")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------

class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=300)
    message: str = Field(min_length=5, max_length=5000)
    source: Optional[str] = Field(default="contact_form", max_length=100)

    @field_validator("name", "message")
    @classmethod
    def _strip(cls, v: str) -> str:
        return v.strip()


class ContactRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    source: Optional[str] = "contact_form"
    created_at: str  # ISO


class NewsletterCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = Field(default="kit_signup", max_length=100)
    tag: Optional[str] = Field(default=None, max_length=100)


class NewsletterRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    email: str
    source: Optional[str] = "kit_signup"
    tag: Optional[str] = None
    created_at: str


class OkResponse(BaseModel):
    ok: bool = True
    message: str
    id: Optional[str] = None


# ---------- Helpers ----------

def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _new_id() -> str:
    return str(uuid.uuid4())


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {
        "service": "mono-mind-api",
        "status": "ok",
        "version": app.version,
        "time": _now_iso(),
    }


@api_router.get("/health")
async def health():
    try:
        await db.command("ping")
        mongo_ok = True
    except Exception as e:  # noqa: BLE001
        mongo_ok = False
        logger.error("Mongo ping failed: %s", e)
    return {"ok": True, "mongo": mongo_ok, "time": _now_iso()}


@api_router.post("/contact", response_model=OkResponse)
async def submit_contact(payload: ContactCreate, request: Request):
    doc = {
        "id": _new_id(),
        "name": payload.name,
        "email": payload.email.lower(),
        "subject": payload.subject,
        "message": payload.message,
        "source": payload.source or "contact_form",
        "created_at": _now_iso(),
        "ip": request.client.host if request.client else None,
        "user_agent": request.headers.get("user-agent"),
    }
    await db.contact_submissions.insert_one(doc)
    return OkResponse(ok=True, message="Thanks — we'll get back to you soon.", id=doc["id"])


@api_router.get("/contact/submissions", response_model=List[ContactRecord])
async def list_contacts(limit: int = 100):
    limit = max(1, min(limit, 500))
    cursor = (
        db.contact_submissions.find({}, {"_id": 0, "ip": 0, "user_agent": 0})
        .sort("created_at", -1)
        .limit(limit)
    )
    return [ContactRecord(**doc) async for doc in cursor]


@api_router.post("/newsletter", response_model=OkResponse)
async def subscribe_newsletter(payload: NewsletterCreate, request: Request):
    email = payload.email.lower()
    existing = await db.newsletter_subscribers.find_one({"email": email}, {"_id": 0, "id": 1})
    if existing:
        return OkResponse(ok=True, message="You're already subscribed.", id=existing.get("id"))
    doc = {
        "id": _new_id(),
        "email": email,
        "source": payload.source or "kit_signup",
        "tag": payload.tag,
        "created_at": _now_iso(),
        "ip": request.client.host if request.client else None,
    }
    await db.newsletter_subscribers.insert_one(doc)
    return OkResponse(ok=True, message="Subscribed — welcome to Mono Mind.", id=doc["id"])


@api_router.get("/newsletter/subscribers", response_model=List[NewsletterRecord])
async def list_subscribers(limit: int = 100):
    limit = max(1, min(limit, 500))
    cursor = (
        db.newsletter_subscribers.find({}, {"_id": 0, "ip": 0})
        .sort("created_at", -1)
        .limit(limit)
    )
    return [NewsletterRecord(**doc) async for doc in cursor]


@api_router.get("/stats")
async def stats():
    contacts = await db.contact_submissions.count_documents({})
    subs = await db.newsletter_subscribers.count_documents({})
    return {"contact_submissions": contacts, "newsletter_subscribers": subs}


# Register router
app.include_router(api_router)

# CORS — allow all origins since preview + future custom domains
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("mono-mind")


@app.on_event("startup")
async def on_startup():
    try:
        await db.contact_submissions.create_index("email")
        await db.contact_submissions.create_index([("created_at", -1)])
        await db.newsletter_subscribers.create_index("email", unique=True)
        await db.newsletter_subscribers.create_index([("created_at", -1)])
        logger.info("Mongo indexes ensured.")
    except Exception as e:  # noqa: BLE001
        logger.warning("Index creation error: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
