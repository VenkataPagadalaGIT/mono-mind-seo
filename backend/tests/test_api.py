"""
Backend API Tests for Mono Mind SEO Portfolio
Tests: health, contact, newsletter, stats endpoints

NOTE: As of iteration 2, /api/contact/submissions and /api/newsletter/subscribers
require authentication. Tests updated to use auth token.
"""
import pytest
import requests
import os
import uuid

# Use external URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    raise RuntimeError("REACT_APP_BACKEND_URL must be set in environment to run tests")

# Admin credentials for protected endpoints
ADMIN_EMAIL = os.environ.get("TEST_ADMIN_EMAIL", "admin@monomind.com")
ADMIN_PASSWORD = os.environ.get("TEST_ADMIN_PASSWORD", "MonoMind2026!")


def get_auth_token():
    """Helper to get auth token for protected endpoints"""
    payload = {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
    response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
    if response.status_code == 200:
        return response.json()["access_token"]
    return None


class TestHealthEndpoints:
    """Health and root endpoint tests"""

    def test_root_endpoint_returns_service_info(self):
        """GET /api/ — root health info {service, status, version, time}"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        
        data = response.json()
        assert data["service"] == "mono-mind-api"
        assert data["status"] == "ok"
        assert "version" in data
        assert "time" in data
        print(f"Root endpoint OK: {data}")

    def test_health_endpoint_returns_mongo_status(self):
        """GET /api/health — returns {ok: true, mongo: true}"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        
        data = response.json()
        assert data["ok"] is True
        assert data["mongo"] is True
        assert "time" in data
        print(f"Health endpoint OK: {data}")


class TestStatsEndpoint:
    """Stats endpoint tests"""

    def test_stats_returns_counts(self):
        """GET /api/stats — returns counts for contact_submissions and newsletter_subscribers"""
        response = requests.get(f"{BASE_URL}/api/stats")
        assert response.status_code == 200
        
        data = response.json()
        assert "contact_submissions" in data
        assert "newsletter_subscribers" in data
        assert isinstance(data["contact_submissions"], int)
        assert isinstance(data["newsletter_subscribers"], int)
        print(f"Stats endpoint OK: {data}")


class TestContactEndpoint:
    """Contact form submission tests"""

    def test_contact_submit_valid_data(self):
        """POST /api/contact — accepts valid contact data"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test User",
            "email": unique_email,
            "subject": "Test Subject",
            "message": "This is a test message with at least 5 characters.",
            "source": "test_suite"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["ok"] is True
        assert "message" in data
        assert "id" in data
        assert data["id"] is not None
        print(f"Contact submit OK: {data}")

    def test_contact_submit_minimal_data(self):
        """POST /api/contact — accepts minimal required fields (name, email, message)"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "A",  # min_length=1
            "email": unique_email,
            "message": "Hello"  # min_length=5
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["ok"] is True
        assert "id" in data
        print(f"Contact minimal submit OK: {data}")

    def test_contact_submit_invalid_email_returns_422(self):
        """POST /api/contact — invalid email should return 422"""
        payload = {
            "name": "Test User",
            "email": "not-a-valid-email",
            "message": "This is a test message."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print(f"Contact invalid email returns 422 as expected")

    def test_contact_submit_missing_name_returns_422(self):
        """POST /api/contact — missing name should return 422"""
        payload = {
            "email": "test@example.com",
            "message": "This is a test message."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print(f"Contact missing name returns 422 as expected")

    def test_contact_submit_missing_message_returns_422(self):
        """POST /api/contact — missing message should return 422"""
        payload = {
            "name": "Test User",
            "email": "test@example.com"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print(f"Contact missing message returns 422 as expected")

    def test_contact_submit_message_too_short_returns_422(self):
        """POST /api/contact — message < 5 chars should return 422"""
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Hi"  # Only 2 chars, min is 5
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print(f"Contact short message returns 422 as expected")

    def test_contact_submit_empty_name_returns_422(self):
        """POST /api/contact — empty name should return 422"""
        payload = {
            "name": "",  # Empty, min_length=1
            "email": "test@example.com",
            "message": "This is a test message."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422
        print(f"Contact empty name returns 422 as expected")


class TestContactSubmissionsList:
    """Contact submissions list tests (requires auth as of iteration 2)"""

    @pytest.fixture
    def auth_headers(self):
        """Get auth headers for protected endpoints"""
        token = get_auth_token()
        if not token:
            pytest.skip("Could not obtain auth token")
        return {"Authorization": f"Bearer {token}"}

    def test_list_contacts_returns_list(self, auth_headers):
        """GET /api/contact/submissions — returns list of ContactRecord (auth required)"""
        response = requests.get(f"{BASE_URL}/api/contact/submissions", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"Contact submissions list OK: {len(data)} records")

    def test_list_contacts_excludes_sensitive_fields(self, auth_headers):
        """GET /api/contact/submissions — excludes _id, ip, user_agent"""
        # First create a contact
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Sensitive Test",
            "email": unique_email,
            "message": "Testing sensitive field exclusion"
        }
        requests.post(f"{BASE_URL}/api/contact", json=payload)
        
        # Now fetch and verify exclusion (with auth)
        response = requests.get(f"{BASE_URL}/api/contact/submissions?limit=10", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        if len(data) > 0:
            record = data[0]
            assert "_id" not in record
            assert "ip" not in record
            assert "user_agent" not in record
            # Verify expected fields are present
            assert "id" in record
            assert "name" in record
            assert "email" in record
            assert "message" in record
            assert "created_at" in record
        print(f"Contact submissions excludes sensitive fields OK")

    def test_list_contacts_with_limit(self, auth_headers):
        """GET /api/contact/submissions — accepts ?limit=N"""
        response = requests.get(f"{BASE_URL}/api/contact/submissions?limit=5", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) <= 5
        print(f"Contact submissions with limit OK: {len(data)} records")

    def test_list_contacts_sorted_newest_first(self, auth_headers):
        """GET /api/contact/submissions — returns newest first"""
        response = requests.get(f"{BASE_URL}/api/contact/submissions?limit=10", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        if len(data) >= 2:
            # Verify descending order by created_at
            for i in range(len(data) - 1):
                assert data[i]["created_at"] >= data[i + 1]["created_at"]
        print(f"Contact submissions sorted newest first OK")


class TestNewsletterEndpoint:
    """Newsletter subscription tests"""

    def test_newsletter_subscribe_valid_email(self):
        """POST /api/newsletter — accepts valid email"""
        unique_email = f"newsletter_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "email": unique_email,
            "source": "test_suite",
            "tag": "test"
        }
        response = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["ok"] is True
        assert "message" in data
        assert "id" in data
        assert data["id"] is not None
        print(f"Newsletter subscribe OK: {data}")

    def test_newsletter_subscribe_minimal_data(self):
        """POST /api/newsletter — accepts minimal required fields (email only)"""
        unique_email = f"newsletter_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "email": unique_email
        }
        response = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["ok"] is True
        assert "id" in data
        print(f"Newsletter minimal subscribe OK: {data}")

    def test_newsletter_subscribe_idempotent(self):
        """POST /api/newsletter — second call with same email returns existing id (idempotent)"""
        unique_email = f"newsletter_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": unique_email}
        
        # First subscription
        response1 = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response1.status_code == 200
        data1 = response1.json()
        first_id = data1["id"]
        
        # Second subscription with same email
        response2 = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response2.status_code == 200
        data2 = response2.json()
        second_id = data2["id"]
        
        # Should return same id (idempotent)
        assert first_id == second_id
        assert data2["ok"] is True
        print(f"Newsletter idempotent OK: same id {first_id} returned")

    def test_newsletter_subscribe_invalid_email_returns_422(self):
        """POST /api/newsletter — invalid email returns 422"""
        payload = {
            "email": "not-a-valid-email"
        }
        response = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response.status_code == 422
        print(f"Newsletter invalid email returns 422 as expected")

    def test_newsletter_subscribe_missing_email_returns_422(self):
        """POST /api/newsletter — missing email returns 422"""
        payload = {
            "source": "test"
        }
        response = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response.status_code == 422
        print(f"Newsletter missing email returns 422 as expected")


class TestNewsletterSubscribersList:
    """Newsletter subscribers list tests (requires auth as of iteration 2)"""

    @pytest.fixture
    def auth_headers(self):
        """Get auth headers for protected endpoints"""
        token = get_auth_token()
        if not token:
            pytest.skip("Could not obtain auth token")
        return {"Authorization": f"Bearer {token}"}

    def test_list_subscribers_returns_list(self, auth_headers):
        """GET /api/newsletter/subscribers — returns list of NewsletterRecord (auth required)"""
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"Newsletter subscribers list OK: {len(data)} records")

    def test_list_subscribers_excludes_sensitive_fields(self, auth_headers):
        """GET /api/newsletter/subscribers — excludes _id, ip"""
        # First create a subscriber
        unique_email = f"newsletter_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": unique_email}
        requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        
        # Now fetch and verify exclusion (with auth)
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers?limit=10", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        if len(data) > 0:
            record = data[0]
            assert "_id" not in record
            assert "ip" not in record
            # Verify expected fields are present
            assert "id" in record
            assert "email" in record
            assert "created_at" in record
        print(f"Newsletter subscribers excludes sensitive fields OK")

    def test_list_subscribers_with_limit(self, auth_headers):
        """GET /api/newsletter/subscribers — accepts ?limit=N"""
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers?limit=5", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) <= 5
        print(f"Newsletter subscribers with limit OK: {len(data)} records")

    def test_list_subscribers_sorted_newest_first(self, auth_headers):
        """GET /api/newsletter/subscribers — returns newest first"""
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers?limit=10", headers=auth_headers)
        assert response.status_code == 200
        
        data = response.json()
        if len(data) >= 2:
            # Verify descending order by created_at
            for i in range(len(data) - 1):
                assert data[i]["created_at"] >= data[i + 1]["created_at"]
        print(f"Newsletter subscribers sorted newest first OK")


class TestMongoDBIndexes:
    """MongoDB index tests - newsletter email uniqueness"""

    def test_newsletter_email_unique_index_handled_gracefully(self):
        """MongoDB indexes: newsletter_subscribers.email must be unique (handled via idempotent POST)"""
        unique_email = f"unique_test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": unique_email}
        
        # First subscription
        response1 = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response1.status_code == 200
        
        # Second subscription - should NOT return 500 (graceful handling)
        response2 = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response2.status_code == 200  # Not 500
        assert response2.json()["ok"] is True
        print(f"Newsletter unique email index handled gracefully OK")


class TestEndToEndFlow:
    """End-to-end flow tests (requires auth for list endpoints as of iteration 2)"""

    @pytest.fixture
    def auth_headers(self):
        """Get auth headers for protected endpoints"""
        token = get_auth_token()
        if not token:
            pytest.skip("Could not obtain auth token")
        return {"Authorization": f"Bearer {token}"}

    def test_full_contact_flow(self, auth_headers):
        """E2E: Submit contact → verify in list → check stats"""
        # Get initial stats
        stats_before = requests.get(f"{BASE_URL}/api/stats").json()
        initial_contacts = stats_before["contact_submissions"]
        
        # Submit contact
        unique_email = f"e2e_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "E2E Test User",
            "email": unique_email,
            "subject": "E2E Test",
            "message": "This is an end-to-end test message."
        }
        submit_response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert submit_response.status_code == 200
        contact_id = submit_response.json()["id"]
        
        # Verify in list (with auth)
        list_response = requests.get(f"{BASE_URL}/api/contact/submissions?limit=10", headers=auth_headers)
        assert list_response.status_code == 200
        contacts = list_response.json()
        found = any(c["id"] == contact_id for c in contacts)
        assert found, f"Contact {contact_id} not found in list"
        
        # Check stats increased
        stats_after = requests.get(f"{BASE_URL}/api/stats").json()
        assert stats_after["contact_submissions"] == initial_contacts + 1
        print(f"E2E contact flow OK: created {contact_id}")

    def test_full_newsletter_flow(self, auth_headers):
        """E2E: Subscribe → verify in list → check stats → re-subscribe (idempotent)"""
        # Get initial stats
        stats_before = requests.get(f"{BASE_URL}/api/stats").json()
        initial_subs = stats_before["newsletter_subscribers"]
        
        # Subscribe
        unique_email = f"e2e_news_{uuid.uuid4().hex[:8]}@example.com"
        payload = {"email": unique_email, "tag": "e2e_test"}
        sub_response = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert sub_response.status_code == 200
        sub_id = sub_response.json()["id"]
        
        # Verify in list (with auth)
        list_response = requests.get(f"{BASE_URL}/api/newsletter/subscribers?limit=10", headers=auth_headers)
        assert list_response.status_code == 200
        subs = list_response.json()
        found = any(s["id"] == sub_id for s in subs)
        assert found, f"Subscriber {sub_id} not found in list"
        
        # Check stats increased
        stats_after = requests.get(f"{BASE_URL}/api/stats").json()
        assert stats_after["newsletter_subscribers"] == initial_subs + 1
        
        # Re-subscribe (idempotent) - stats should NOT increase
        resub_response = requests.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert resub_response.status_code == 200
        assert resub_response.json()["id"] == sub_id
        
        stats_final = requests.get(f"{BASE_URL}/api/stats").json()
        assert stats_final["newsletter_subscribers"] == initial_subs + 1  # Same count
        print(f"E2E newsletter flow OK: created {sub_id}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
