"""
Backend API Tests for Mono Mind - Conference Notebook (Iteration 3)
Tests new endpoints under /api/notebook/notes/* (admin-protected).

Endpoints:
- GET /api/notebook/notes/{conference_slug} (auth)
- PUT /api/notebook/notes/{conference_slug}/{session_id} (auth, upsert)
- DELETE /api/notebook/notes/{conference_slug}/{session_id} (auth)

Also smoke-checks regression of existing endpoints.
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    BASE_URL = "https://github-checker-8.preview.emergentagent.com"

ADMIN_EMAIL = "admin@monomind.com"
ADMIN_PASSWORD = "MonoMind2026!"
CONF_SLUG = "seo-week-2026"


def _login_token() -> str:
    r = requests.post(
        f"{BASE_URL}/api/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=20,
    )
    if r.status_code != 200:
        pytest.skip(f"Could not obtain auth token: {r.status_code} {r.text}")
    return r.json()["access_token"]


@pytest.fixture(scope="module")
def auth_headers():
    return {"Authorization": f"Bearer {_login_token()}"}


# ---------------- Auth gating ----------------

class TestNotebookAuthGating:
    def test_list_without_auth_returns_401(self):
        r = requests.get(f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}")
        assert r.status_code == 401

    def test_put_without_auth_returns_401(self):
        r = requests.put(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/sess-noauth",
            json={"note": "x"},
        )
        assert r.status_code == 401

    def test_delete_without_auth_returns_401(self):
        r = requests.delete(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/sess-noauth"
        )
        assert r.status_code == 401

    def test_list_with_invalid_bearer_returns_401(self):
        r = requests.get(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}",
            headers={"Authorization": "Bearer not_a_real_token"},
        )
        assert r.status_code == 401


# ---------------- Functional CRUD ----------------

class TestNotebookCrud:
    def test_list_returns_list_when_authed(self, auth_headers):
        r = requests.get(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}", headers=auth_headers
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data, list)
        for d in data:
            assert "_id" not in d
            assert d.get("conference_slug") == CONF_SLUG
            assert "session_id" in d
            assert "note" in d
            assert "takeaways" in d
            assert "status" in d
            assert "updated_at" in d

    def test_put_upsert_creates_note_and_get_returns_it(self, auth_headers):
        session_id = f"TEST-sess-{uuid.uuid4().hex[:8]}"
        try:
            payload = {
                "note": "Initial note text",
                "takeaways": ["one", "two"],
                "status": "attended",
            }
            r = requests.put(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
                json=payload,
                headers=auth_headers,
            )
            assert r.status_code == 200, r.text
            data = r.json()
            assert data["conference_slug"] == CONF_SLUG
            assert data["session_id"] == session_id
            assert data["note"] == "Initial note text"
            assert data["takeaways"] == ["one", "two"]
            assert data["status"] == "attended"
            assert "updated_at" in data and len(data["updated_at"]) > 0

            # GET list and verify the record is present
            list_r = requests.get(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}",
                headers=auth_headers,
            )
            assert list_r.status_code == 200
            items = list_r.json()
            match = [x for x in items if x["session_id"] == session_id]
            assert len(match) == 1, "Created note should appear exactly once"
            assert match[0]["note"] == "Initial note text"
            assert match[0]["takeaways"] == ["one", "two"]
            assert match[0]["status"] == "attended"
        finally:
            requests.delete(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
                headers=auth_headers,
            )

    def test_put_idempotent_no_duplicates(self, auth_headers):
        session_id = f"TEST-sess-idem-{uuid.uuid4().hex[:8]}"
        try:
            # First call
            r1 = requests.put(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
                json={"note": "v1", "takeaways": ["a"], "status": "revisit"},
                headers=auth_headers,
            )
            assert r1.status_code == 200
            ts1 = r1.json()["updated_at"]

            # Second call updates same record
            r2 = requests.put(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
                json={"note": "v2", "takeaways": ["a", "b"], "status": "skipped"},
                headers=auth_headers,
            )
            assert r2.status_code == 200
            data2 = r2.json()
            assert data2["note"] == "v2"
            assert data2["takeaways"] == ["a", "b"]
            assert data2["status"] == "skipped"
            assert data2["updated_at"] >= ts1

            # Verify only ONE record exists for this session_id
            list_r = requests.get(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}",
                headers=auth_headers,
            )
            assert list_r.status_code == 200
            match = [x for x in list_r.json() if x["session_id"] == session_id]
            assert len(match) == 1, f"Expected 1 record, got {len(match)} (no duplicate from upsert)"
            assert match[0]["note"] == "v2"
        finally:
            requests.delete(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
                headers=auth_headers,
            )

    def test_delete_removes_note(self, auth_headers):
        session_id = f"TEST-sess-del-{uuid.uuid4().hex[:8]}"
        # Create
        r1 = requests.put(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
            json={"note": "to be deleted", "takeaways": [], "status": ""},
            headers=auth_headers,
        )
        assert r1.status_code == 200

        # Delete
        rd = requests.delete(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
            headers=auth_headers,
        )
        assert rd.status_code == 200
        assert rd.json().get("ok") is True

        # Verify gone
        list_r = requests.get(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}", headers=auth_headers
        )
        assert list_r.status_code == 200
        match = [x for x in list_r.json() if x["session_id"] == session_id]
        assert len(match) == 0, "Note should be removed after DELETE"

    def test_delete_nonexistent_is_idempotent(self, auth_headers):
        rd = requests.delete(
            f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/TEST-does-not-exist-{uuid.uuid4().hex[:6]}",
            headers=auth_headers,
        )
        # Should succeed (idempotent) or 200 ok
        assert rd.status_code in (200, 204)

    def test_put_minimal_payload_defaults(self, auth_headers):
        """Empty payload should still upsert with safe defaults."""
        session_id = f"TEST-sess-min-{uuid.uuid4().hex[:8]}"
        try:
            r = requests.put(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
                json={},
                headers=auth_headers,
            )
            assert r.status_code == 200, r.text
            data = r.json()
            assert data["note"] == ""
            assert data["takeaways"] == []
            assert data["status"] == ""
        finally:
            requests.delete(
                f"{BASE_URL}/api/notebook/notes/{CONF_SLUG}/{session_id}",
                headers=auth_headers,
            )


# ---------------- Regression smoke checks ----------------

class TestRegressionSmoke:
    def test_health(self):
        r = requests.get(f"{BASE_URL}/api/health")
        # endpoint may be /api/ or /api/health depending on impl
        assert r.status_code in (200, 404)

    def test_login_still_works(self):
        r = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        )
        assert r.status_code == 200
        assert "access_token" in r.json()

    def test_me_with_token(self, auth_headers):
        r = requests.get(f"{BASE_URL}/api/auth/me", headers=auth_headers)
        assert r.status_code == 200
        assert r.json()["role"] == "admin"

    def test_admin_contact_submissions(self, auth_headers):
        r = requests.get(
            f"{BASE_URL}/api/admin/contact-submissions", headers=auth_headers
        )
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_admin_newsletter_subscribers(self, auth_headers):
        r = requests.get(
            f"{BASE_URL}/api/admin/newsletter-subscribers", headers=auth_headers
        )
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_content_contributors_public(self):
        r = requests.get(f"{BASE_URL}/api/content/contributors")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
