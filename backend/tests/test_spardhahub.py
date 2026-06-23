"""SpardhaHub backend tests: auth, exams, eligibility, salary, roadmap, alerts, current-affairs, progress."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://exam-mastery-hub-37.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    return requests.Session()


@pytest.fixture(scope="module")
def new_user(s):
    email = f"test_{uuid.uuid4().hex[:10]}@example.com"
    pwd = "test1234"
    r = s.post(f"{API}/auth/register", json={
        "name": "Test User", "email": email, "password": pwd,
        "target_exam": "UPSC-CSE", "dob": "2000-01-15",
    })
    assert r.status_code == 200, r.text
    data = r.json()
    return {"email": email, "password": pwd, "token": data["token"], "user": data["user"]}


# ---- Auth ----
class TestAuth:
    def test_register_returns_token_and_user(self, new_user):
        assert new_user["token"]
        assert "id" in new_user["user"]
        assert "password_hash" not in new_user["user"]

    def test_register_duplicate_email(self, s, new_user):
        r = s.post(f"{API}/auth/register", json={
            "name": "Dup", "email": new_user["email"], "password": "test1234"
        })
        assert r.status_code == 400

    def test_login_success(self, s, new_user):
        r = s.post(f"{API}/auth/login", json={"email": new_user["email"], "password": new_user["password"]})
        assert r.status_code == 200
        assert "token" in r.json()

    def test_login_wrong_password(self, s, new_user):
        r = s.post(f"{API}/auth/login", json={"email": new_user["email"], "password": "WRONG"})
        assert r.status_code == 401

    def test_me_with_token(self, s, new_user):
        r = s.get(f"{API}/auth/me", headers={"Authorization": f"Bearer {new_user['token']}"})
        assert r.status_code == 200
        body = r.json()
        assert body["email"] == new_user["email"]
        assert "password_hash" not in body

    def test_me_without_token(self, s):
        r = s.get(f"{API}/auth/me")
        assert r.status_code == 401


# ---- Exams ----
class TestExams:
    def test_list_exams_total_20(self, s):
        r = s.get(f"{API}/exams")
        assert r.status_code == 200
        body = r.json()
        assert body["total"] == 20
        bodies = set(body["by_body"].keys())
        assert {"UPSC", "MPSC", "IAF", "Indian Army"}.issubset(bodies)

    def test_get_exam_detail(self, s):
        r = s.get(f"{API}/exams/UPSC-CSE")
        assert r.status_code == 200
        body = r.json()
        assert body["code"] == "UPSC-CSE"
        assert "roadmap" in body and len(body["roadmap"]) > 0

    def test_get_exam_not_found(self, s):
        r = s.get(f"{API}/exams/NOPE-XXX")
        assert r.status_code == 404


# ---- Eligibility ----
class TestEligibility:
    def test_eligibility_check(self, s):
        r = s.post(f"{API}/eligibility/check", json={"dob": "2000-01-15"})
        assert r.status_code == 200
        body = r.json()
        assert "eligible" in body and "not_eligible" in body
        assert len(body["eligible"]) + len(body["not_eligible"]) == 20
        assert isinstance(body["age_years"], (int, float))

    def test_eligibility_bad_dob(self, s):
        r = s.post(f"{API}/eligibility/check", json={"dob": "15/01/2000"})
        assert r.status_code == 422


# ---- Salary ----
class TestSalary:
    def test_salary_upsc(self, s):
        r = s.get(f"{API}/salary/UPSC-CSE")
        assert r.status_code == 200
        body = r.json()
        assert "components" in body
        assert {"metro_x", "tier2_y", "tier3_z"} == set(body["in_hand_monthly"].keys())
        assert body["in_hand_monthly"]["metro_x"] > body["in_hand_monthly"]["tier3_z"]

    def test_salary_not_found(self, s):
        r = s.get(f"{API}/salary/NOPE")
        assert r.status_code == 404


# ---- Roadmap ----
class TestRoadmap:
    def test_roadmap_mpsc(self, s):
        r = s.get(f"{API}/roadmap/MPSC-RAJYA")
        assert r.status_code == 200
        body = r.json()
        assert "phases" in body and len(body["phases"]) >= 1
        assert body["code"] == "MPSC-RAJYA"


# ---- Alerts ----
class TestAlerts:
    def test_alerts(self, s):
        r = s.get(f"{API}/alerts")
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) == 20
        # check sort: None at end, ascending days_left
        numeric = [i["days_left"] for i in items if i["days_left"] is not None]
        assert numeric == sorted(numeric)


# ---- Current Affairs ----
class TestCurrentAffairs:
    def test_ca_all(self, s):
        r = s.get(f"{API}/current-affairs")
        assert r.status_code == 200
        body = r.json()
        assert body["count"] == 6
        assert len(body["items"]) == 6

    def test_ca_filter(self, s):
        r = s.get(f"{API}/current-affairs", params={"exam": "UPSC-CSE"})
        assert r.status_code == 200
        body = r.json()
        for item in body["items"]:
            assert "UPSC-CSE" in item["exam_relevance"]


# ---- Progress (auth) ----
class TestProgress:
    def test_progress_requires_auth(self, s):
        r = s.post(f"{API}/progress", json={"exam_code": "UPSC-CSE", "topic": "NCERTs", "completed": True})
        assert r.status_code == 401

    def test_progress_save_and_get(self, s, new_user):
        headers = {"Authorization": f"Bearer {new_user['token']}"}
        topic = f"TEST_topic_{uuid.uuid4().hex[:6]}"
        r = s.post(f"{API}/progress", json={"exam_code": "UPSC-CSE", "topic": topic, "completed": True}, headers=headers)
        assert r.status_code == 200

        r = s.get(f"{API}/progress", headers=headers)
        assert r.status_code == 200
        body = r.json()
        assert "UPSC-CSE" in body["by_exam"]
        topics = [t["topic"] for t in body["by_exam"]["UPSC-CSE"]]
        assert topic in topics

    def test_progress_bad_exam(self, s, new_user):
        headers = {"Authorization": f"Bearer {new_user['token']}"}
        r = s.post(f"{API}/progress", json={"exam_code": "NOPE-XXX", "topic": "x", "completed": True}, headers=headers)
        assert r.status_code == 404
