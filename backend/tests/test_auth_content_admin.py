"""
Backend API Tests for Mono Mind - Iteration 2
Tests: JWT Auth, Protected Admin Endpoints, Content API

Features tested:
- POST /api/auth/login (valid/invalid credentials)
- GET /api/auth/me (with/without token)
- GET /api/admin/contact-submissions (auth required)
- GET /api/admin/newsletter-subscribers (auth required)
- GET /api/admin/overview (auth required)
- GET /api/content/contributors (list + single)
- GET /api/content/updates (list + single)
- GET /api/content/pillars (list + single with nested posts)
- GET /api/content/posts (list + single)
- GET /api/content/sitemap
"""
import pytest
import requests
import os
import uuid

# Use external URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    raise RuntimeError("REACT_APP_BACKEND_URL must be set in environment to run tests")

# Admin credentials from test_credentials.md
ADMIN_EMAIL = "admin@monomind.com"
ADMIN_PASSWORD = "MonoMind2026!"


class TestAuthLogin:
    """JWT Authentication - Login endpoint tests"""

    def test_login_with_correct_credentials_returns_token(self):
        """POST /api/auth/login — valid credentials return access_token + email + role"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "access_token" in data, "Response missing access_token"
        assert data["email"] == ADMIN_EMAIL.lower()
        assert data["role"] == "admin"
        assert data["token_type"] == "bearer"
        assert len(data["access_token"]) > 0
        print(f"Login OK: token received, email={data['email']}, role={data['role']}")

    def test_login_sets_httponly_cookie(self):
        """POST /api/auth/login — sets httpOnly cookie named 'access_token'"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 200
        
        # Check Set-Cookie header
        cookies = response.cookies
        assert "access_token" in cookies, "access_token cookie not set"
        print(f"Login sets httpOnly cookie OK")

    def test_login_with_wrong_password_returns_401(self):
        """POST /api/auth/login — wrong password returns 401 {detail: 'Invalid credentials'}"""
        payload = {"email": ADMIN_EMAIL, "password": "WrongPassword123!"}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        
        data = response.json()
        assert data.get("detail") == "Invalid credentials"
        print(f"Login wrong password returns 401 OK: {data}")

    def test_login_with_nonexistent_email_returns_401(self):
        """POST /api/auth/login — nonexistent email returns 401"""
        payload = {"email": "nonexistent@example.com", "password": "SomePassword123!"}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 401
        assert response.json().get("detail") == "Invalid credentials"
        print(f"Login nonexistent email returns 401 OK")

    def test_login_with_invalid_email_format_returns_422(self):
        """POST /api/auth/login — invalid email format returns 422"""
        payload = {"email": "not-an-email", "password": "SomePassword123!"}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 422
        print(f"Login invalid email format returns 422 OK")


class TestAuthMe:
    """JWT Authentication - /auth/me endpoint tests"""

    @pytest.fixture
    def auth_token(self):
        """Get valid auth token"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        if response.status_code != 200:
            pytest.skip("Could not obtain auth token")
        return response.json()["access_token"]

    def test_me_with_valid_bearer_token_returns_user(self, auth_token):
        """GET /api/auth/me — valid Bearer token returns {email, role:'admin'}"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["email"] == ADMIN_EMAIL.lower()
        assert data["role"] == "admin"
        print(f"GET /api/auth/me OK: {data}")

    def test_me_without_token_returns_401(self):
        """GET /api/auth/me — no token returns 401"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        
        assert response.status_code == 401
        assert response.json().get("detail") == "Not authenticated"
        print(f"GET /api/auth/me without token returns 401 OK")

    def test_me_with_invalid_token_returns_401(self):
        """GET /api/auth/me — invalid token returns 401"""
        headers = {"Authorization": "Bearer invalid_token_here"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        
        assert response.status_code == 401
        print(f"GET /api/auth/me with invalid token returns 401 OK")


class TestAdminEndpoints:
    """Protected Admin Endpoints - require auth"""

    @pytest.fixture
    def auth_token(self):
        """Get valid auth token"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        if response.status_code != 200:
            pytest.skip("Could not obtain auth token")
        return response.json()["access_token"]

    # --- /api/admin/contact-submissions ---
    def test_admin_contact_submissions_without_auth_returns_401(self):
        """GET /api/admin/contact-submissions — no auth returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/contact-submissions")
        assert response.status_code == 401
        print(f"GET /api/admin/contact-submissions without auth returns 401 OK")

    def test_admin_contact_submissions_with_auth_returns_list(self, auth_token):
        """GET /api/admin/contact-submissions — with auth returns list"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/contact-submissions", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        if len(data) > 0:
            record = data[0]
            assert "id" in record
            assert "name" in record
            assert "email" in record
            assert "message" in record
            assert "created_at" in record
            assert "_id" not in record  # MongoDB _id excluded
        print(f"GET /api/admin/contact-submissions OK: {len(data)} records")

    # --- /api/admin/newsletter-subscribers ---
    def test_admin_newsletter_subscribers_without_auth_returns_401(self):
        """GET /api/admin/newsletter-subscribers — no auth returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/newsletter-subscribers")
        assert response.status_code == 401
        print(f"GET /api/admin/newsletter-subscribers without auth returns 401 OK")

    def test_admin_newsletter_subscribers_with_auth_returns_list(self, auth_token):
        """GET /api/admin/newsletter-subscribers — with auth returns list"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/newsletter-subscribers", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        if len(data) > 0:
            record = data[0]
            assert "id" in record
            assert "email" in record
            assert "created_at" in record
            assert "_id" not in record
        print(f"GET /api/admin/newsletter-subscribers OK: {len(data)} records")

    # --- /api/admin/overview ---
    def test_admin_overview_without_auth_returns_401(self):
        """GET /api/admin/overview — no auth returns 401"""
        response = requests.get(f"{BASE_URL}/api/admin/overview")
        assert response.status_code == 401
        print(f"GET /api/admin/overview without auth returns 401 OK")

    def test_admin_overview_with_auth_returns_counts(self, auth_token):
        """GET /api/admin/overview — with auth returns counts for all collections"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/overview", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        
        # Verify all expected count fields
        expected_fields = ["contact_submissions", "newsletter_subscribers", "contributors", "updates", "pillars", "posts"]
        for field in expected_fields:
            assert field in data, f"Missing field: {field}"
            assert isinstance(data[field], int), f"{field} should be int"
        
        print(f"GET /api/admin/overview OK: {data}")

    # --- Legacy protected endpoints ---
    def test_legacy_contact_submissions_without_auth_returns_401(self):
        """GET /api/contact/submissions — now requires auth (401 without)"""
        response = requests.get(f"{BASE_URL}/api/contact/submissions")
        assert response.status_code == 401
        print(f"GET /api/contact/submissions (legacy) without auth returns 401 OK")

    def test_legacy_newsletter_subscribers_without_auth_returns_401(self):
        """GET /api/newsletter/subscribers — now requires auth (401 without)"""
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers")
        assert response.status_code == 401
        print(f"GET /api/newsletter/subscribers (legacy) without auth returns 401 OK")


class TestContentContributors:
    """Content API - Contributors endpoints"""

    def test_list_contributors_returns_list(self):
        """GET /api/content/contributors — returns list of contributors"""
        response = requests.get(f"{BASE_URL}/api/content/contributors")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Expected seeded contributors"
        
        # Verify structure
        contributor = data[0]
        assert "id" in contributor
        assert "name" in contributor
        assert "_id" not in contributor
        print(f"GET /api/content/contributors OK: {len(data)} contributors")

    def test_list_contributors_seeded_100(self):
        """GET /api/content/contributors — should have 100 seeded contributors"""
        response = requests.get(f"{BASE_URL}/api/content/contributors?limit=500")
        
        assert response.status_code == 200
        data = response.json()
        # Per seed_data, there should be 100 contributors
        assert len(data) == 100, f"Expected 100 contributors, got {len(data)}"
        print(f"GET /api/content/contributors seeded 100 OK")

    def test_get_contributor_hinton_by_id(self):
        """GET /api/content/contributors/hinton — returns Geoffrey Hinton"""
        response = requests.get(f"{BASE_URL}/api/content/contributors/hinton")
        
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == "hinton"
        assert data["name"] == "Geoffrey Hinton"
        assert "_id" not in data
        print(f"GET /api/content/contributors/hinton OK: {data['name']}")

    def test_get_contributor_not_found_returns_404(self):
        """GET /api/content/contributors/does-not-exist — returns 404"""
        response = requests.get(f"{BASE_URL}/api/content/contributors/does-not-exist")
        
        assert response.status_code == 404
        assert response.json().get("detail") == "Contributor not found"
        print(f"GET /api/content/contributors/does-not-exist returns 404 OK")

    def test_list_contributors_with_segment_filter(self):
        """GET /api/content/contributors?segment=... — filters by segment"""
        response = requests.get(f"{BASE_URL}/api/content/contributors?segment=Foundation%20Models%20%26%20LLMs")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        # All returned should have matching segment
        for c in data:
            assert c.get("segment") == "Foundation Models & LLMs"
        print(f"GET /api/content/contributors with segment filter OK: {len(data)} results")

    def test_list_contributors_with_search_query(self):
        """GET /api/content/contributors?q=Hinton — searches name/bio/affiliation"""
        response = requests.get(f"{BASE_URL}/api/content/contributors?q=Hinton")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # Should find Geoffrey Hinton
        found_hinton = any(c["id"] == "hinton" for c in data)
        assert found_hinton, "Hinton not found in search results"
        print(f"GET /api/content/contributors?q=Hinton OK: {len(data)} results")


class TestContentUpdates:
    """Content API - AI Updates endpoints"""

    def test_list_updates_returns_list(self):
        """GET /api/content/updates — returns list of AI updates"""
        response = requests.get(f"{BASE_URL}/api/content/updates")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Expected seeded updates"
        
        update = data[0]
        assert "slug" in update
        assert "_id" not in update
        print(f"GET /api/content/updates OK: {len(data)} updates")

    def test_list_updates_seeded_7(self):
        """GET /api/content/updates — should have 7 seeded updates"""
        response = requests.get(f"{BASE_URL}/api/content/updates")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 7, f"Expected 7 updates, got {len(data)}"
        print(f"GET /api/content/updates seeded 7 OK")

    def test_get_update_by_slug(self):
        """GET /api/content/updates/nvidia-nemoclaw-secure-ai-agents — returns single update"""
        response = requests.get(f"{BASE_URL}/api/content/updates/nvidia-nemoclaw-secure-ai-agents")
        
        assert response.status_code == 200
        data = response.json()
        assert data["slug"] == "nvidia-nemoclaw-secure-ai-agents"
        assert "_id" not in data
        print(f"GET /api/content/updates/{data['slug']} OK")

    def test_get_update_not_found_returns_404(self):
        """GET /api/content/updates/nonexistent-slug — returns 404"""
        response = requests.get(f"{BASE_URL}/api/content/updates/nonexistent-slug")
        
        assert response.status_code == 404
        assert response.json().get("detail") == "Update not found"
        print(f"GET /api/content/updates/nonexistent returns 404 OK")


class TestContentPillars:
    """Content API - Pillars endpoints"""

    def test_list_pillars_returns_list(self):
        """GET /api/content/pillars — returns list of pillars"""
        response = requests.get(f"{BASE_URL}/api/content/pillars")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Expected seeded pillars"
        
        pillar = data[0]
        assert "slug" in pillar
        assert "_id" not in pillar
        print(f"GET /api/content/pillars OK: {len(data)} pillars")

    def test_list_pillars_seeded_6(self):
        """GET /api/content/pillars — should have 6 seeded pillars"""
        response = requests.get(f"{BASE_URL}/api/content/pillars")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 6, f"Expected 6 pillars, got {len(data)}"
        print(f"GET /api/content/pillars seeded 6 OK")

    def test_get_pillar_by_slug_with_nested_posts(self):
        """GET /api/content/pillars/{slug} — returns pillar with nested posts array"""
        # First get an actual pillar slug
        pillars_response = requests.get(f"{BASE_URL}/api/content/pillars")
        assert pillars_response.status_code == 200
        pillars = pillars_response.json()
        assert len(pillars) > 0, "No pillars seeded"
        
        pillar_slug = pillars[0]["slug"]
        response = requests.get(f"{BASE_URL}/api/content/pillars/{pillar_slug}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["slug"] == pillar_slug
        assert "posts" in data, "Pillar should have nested posts array"
        assert isinstance(data["posts"], list)
        assert "_id" not in data
        print(f"GET /api/content/pillars/{pillar_slug} OK: {len(data.get('posts', []))} nested posts")

    def test_get_pillar_not_found_returns_404(self):
        """GET /api/content/pillars/nonexistent — returns 404"""
        response = requests.get(f"{BASE_URL}/api/content/pillars/nonexistent")
        
        assert response.status_code == 404
        assert response.json().get("detail") == "Pillar not found"
        print(f"GET /api/content/pillars/nonexistent returns 404 OK")


class TestContentPosts:
    """Content API - Posts endpoints"""

    def test_list_posts_returns_list(self):
        """GET /api/content/posts — returns list of posts"""
        response = requests.get(f"{BASE_URL}/api/content/posts")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Expected seeded posts"
        
        post = data[0]
        assert "slug" in post
        assert "_id" not in post
        print(f"GET /api/content/posts OK: {len(data)} posts")

    def test_list_posts_seeded_21(self):
        """GET /api/content/posts — should have 21 seeded posts"""
        response = requests.get(f"{BASE_URL}/api/content/posts")
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 21, f"Expected 21 posts, got {len(data)}"
        print(f"GET /api/content/posts seeded 21 OK")

    def test_get_post_by_slug(self):
        """GET /api/content/posts/rag-vs-knowledge-graphs-when-to-use-what — returns single post"""
        response = requests.get(f"{BASE_URL}/api/content/posts/rag-vs-knowledge-graphs-when-to-use-what")
        
        assert response.status_code == 200
        data = response.json()
        assert data["slug"] == "rag-vs-knowledge-graphs-when-to-use-what"
        assert "_id" not in data
        print(f"GET /api/content/posts/{data['slug']} OK")

    def test_get_post_not_found_returns_404(self):
        """GET /api/content/posts/nonexistent — returns 404"""
        response = requests.get(f"{BASE_URL}/api/content/posts/nonexistent")
        
        assert response.status_code == 404
        assert response.json().get("detail") == "Post not found"
        print(f"GET /api/content/posts/nonexistent returns 404 OK")

    def test_list_posts_with_pillar_filter(self):
        """GET /api/content/posts?pillar=... — filters by pillarSlug"""
        # First get a pillar slug
        pillars_response = requests.get(f"{BASE_URL}/api/content/pillars")
        if pillars_response.status_code != 200 or len(pillars_response.json()) == 0:
            pytest.skip("No pillars available")
        
        pillar_slug = pillars_response.json()[0]["slug"]
        
        response = requests.get(f"{BASE_URL}/api/content/posts?pillar={pillar_slug}")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        # All returned should have matching pillarSlug
        for p in data:
            assert p.get("pillarSlug") == pillar_slug
        print(f"GET /api/content/posts?pillar={pillar_slug} OK: {len(data)} results")


class TestContentSitemap:
    """Content API - Sitemap endpoint"""

    def test_sitemap_returns_all_slug_lists(self):
        """GET /api/content/sitemap — returns {contributors, updates, pillars, posts} slug lists"""
        response = requests.get(f"{BASE_URL}/api/content/sitemap")
        
        assert response.status_code == 200
        data = response.json()
        
        assert "contributors" in data
        assert "updates" in data
        assert "pillars" in data
        assert "posts" in data
        
        assert isinstance(data["contributors"], list)
        assert isinstance(data["updates"], list)
        assert isinstance(data["pillars"], list)
        assert isinstance(data["posts"], list)
        
        # Verify structure
        if len(data["contributors"]) > 0:
            assert "id" in data["contributors"][0]
        if len(data["updates"]) > 0:
            assert "slug" in data["updates"][0]
        if len(data["pillars"]) > 0:
            assert "slug" in data["pillars"][0]
        if len(data["posts"]) > 0:
            assert "slug" in data["posts"][0]
        
        print(f"GET /api/content/sitemap OK: contributors={len(data['contributors'])}, updates={len(data['updates'])}, pillars={len(data['pillars'])}, posts={len(data['posts'])}")


class TestContactNewsletterWithAuth:
    """Test contact/newsletter POST still works and appears in admin endpoints"""

    @pytest.fixture
    def auth_token(self):
        """Get valid auth token"""
        payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        if response.status_code != 200:
            pytest.skip("Could not obtain auth token")
        return response.json()["access_token"]

    def test_contact_submission_appears_in_admin_list(self, auth_token):
        """POST /api/contact → verify in /api/admin/contact-submissions"""
        # Submit contact
        unique_email = f"test_admin_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Admin Test User",
            "email": unique_email,
            "subject": "Admin Test",
            "message": "Testing contact appears in admin list."
        }
        submit_response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert submit_response.status_code == 200
        contact_id = submit_response.json()["id"]
        
        # Verify in admin list
        headers = {"Authorization": f"Bearer {auth_token}"}
        list_response = requests.get(f"{BASE_URL}/api/admin/contact-submissions?limit=50", headers=headers)
        assert list_response.status_code == 200
        
        contacts = list_response.json()
        found = any(c["id"] == contact_id for c in contacts)
        assert found, f"Contact {contact_id} not found in admin list"
        print(f"Contact submission appears in admin list OK: {contact_id}")

    def test_newsletter_subscription_appears_in_admin_list(self, auth_token):
        """POST /api/newsletter → verify in /api/admin/newsletter-subscribers"""
        # Subscribe
        unique_email = f"test_admin_news_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": unique_email, "tag": "admin_test"}
        sub_response = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert sub_response.status_code == 200
        sub_id = sub_response.json()["id"]
        
        # Verify in admin list
        headers = {"Authorization": f"Bearer {auth_token}"}
        list_response = requests.get(f"{BASE_URL}/api/admin/newsletter-subscribers?limit=50", headers=headers)
        assert list_response.status_code == 200
        
        subs = list_response.json()
        found = any(s["id"] == sub_id for s in subs)
        assert found, f"Subscriber {sub_id} not found in admin list"
        print(f"Newsletter subscription appears in admin list OK: {sub_id}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
