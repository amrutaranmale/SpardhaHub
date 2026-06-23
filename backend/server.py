from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr

from exam_data import EXAMS, CURRENT_AFFAIRS

# ----- Setup -----
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGO = "HS256"
ACCESS_TTL_HOURS = 24 * 7  # 7 days for simplicity

app = FastAPI(title="SpardhaHub API")
api_router = APIRouter(prefix="/api")
bearer = HTTPBearer(auto_error=False)


# ----- Helpers -----
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()


def verify_password(pw: str, hashed: str) -> bool:
    return bcrypt.checkpw(pw.encode(), hashed.encode())


def create_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=ACCESS_TTL_HOURS),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)


async def get_current_user(
    creds: Optional[HTTPAuthorizationCredentials] = Depends(bearer),
) -> dict:
    if not creds or not creds.credentials:
        raise HTTPException(401, "Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALGO])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(401, "User not found")
    return user


def user_public(u: dict) -> dict:
    return {
        "id": u["id"],
        "email": u["email"],
        "name": u.get("name", ""),
        "target_exam": u.get("target_exam"),
        "dob": u.get("dob"),
        "created_at": u.get("created_at"),
    }


# ----- Models -----
class SignupCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "hero_cta"


class AuthRegister(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    password: str = Field(min_length=6, max_length=120)
    target_exam: Optional[str] = None
    dob: Optional[str] = None  # ISO date


class AuthLogin(BaseModel):
    email: EmailStr
    password: str


class EligibilityRequest(BaseModel):
    dob: str  # ISO date YYYY-MM-DD
    qualification: Optional[str] = None  # any text


class ProgressUpdate(BaseModel):
    exam_code: str
    topic: str
    completed: bool


# ----- Public health -----
@api_router.get("/")
async def root():
    return {"message": "SpardhaHub API is running", "tagline": "Your Goal. Our Path."}


# ----- Email signup (existing waitlist) -----
@api_router.post("/signup")
async def create_signup(payload: SignupCreate):
    email_norm = payload.email.lower().strip()
    existing = await db.signups.find_one({"email": email_norm}, {"_id": 0})
    if existing:
        return {
            "id": existing["id"], "email": existing["email"],
            "message": "You're already on the list — see you soon!",
        }
    doc = {
        "id": str(uuid.uuid4()), "email": email_norm,
        "source": payload.source or "hero_cta",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.signups.insert_one(doc)
    return {"id": doc["id"], "email": email_norm, "message": "You're on the list — welcome to SpardhaHub!"}


@api_router.get("/signup/count")
async def signup_count():
    count = await db.signups.count_documents({})
    return {"count": count}


# ----- Auth -----
@api_router.post("/auth/register")
async def register(payload: AuthRegister):
    email_norm = payload.email.lower().strip()
    if await db.users.find_one({"email": email_norm}):
        raise HTTPException(400, "Email already registered. Please sign in.")
    user_id = str(uuid.uuid4())
    doc = {
        "id": user_id,
        "email": email_norm,
        "name": payload.name.strip(),
        "password_hash": hash_password(payload.password),
        "target_exam": payload.target_exam,
        "dob": payload.dob,
        "role": "user",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(doc)
    token = create_token(user_id, email_norm)
    return {"token": token, "user": user_public(doc)}


@api_router.post("/auth/login")
async def login(payload: AuthLogin):
    email_norm = payload.email.lower().strip()
    user = await db.users.find_one({"email": email_norm})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(401, "Invalid email or password")
    token = create_token(user["id"], user["email"])
    return {"token": token, "user": user_public(user)}


@api_router.get("/auth/me")
async def me(current=Depends(get_current_user)):
    return current


@api_router.patch("/auth/me")
async def update_me(
    payload: dict,
    current=Depends(get_current_user),
):
    allowed = {k: v for k, v in payload.items() if k in {"name", "target_exam", "dob"}}
    if allowed:
        await db.users.update_one({"id": current["id"]}, {"$set": allowed})
    updated = await db.users.find_one({"id": current["id"]}, {"_id": 0, "password_hash": 0})
    return updated


# ----- Exams -----
@api_router.get("/exams")
async def list_exams():
    grouped: dict = {}
    for e in EXAMS.values():
        grouped.setdefault(e["body"], []).append(e)
    return {"total": len(EXAMS), "exams": list(EXAMS.values()), "by_body": grouped}


@api_router.get("/exams/{code}")
async def get_exam(code: str):
    exam = EXAMS.get(code.upper())
    if not exam:
        raise HTTPException(404, "Exam not found")
    return exam


# ----- Eligibility checker -----
@api_router.post("/eligibility/check")
async def check_eligibility(payload: EligibilityRequest):
    try:
        dob = datetime.strptime(payload.dob, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(422, "DOB must be in YYYY-MM-DD format")
    today = datetime.now(timezone.utc).date()
    age_years = (today - dob).days / 365.25
    eligible, not_eligible = [], []
    for exam in EXAMS.values():
        if exam["min_age"] <= age_years <= exam["max_age"]:
            eligible.append({
                "code": exam["code"], "body": exam["body"], "name": exam["name"],
                "qualification": exam["qualification"], "exam_date": exam["exam_date"],
                "age_window": f"{exam['min_age']}-{exam['max_age']} yrs",
            })
        else:
            reason = "Below minimum age" if age_years < exam["min_age"] else "Above maximum age"
            not_eligible.append({
                "code": exam["code"], "body": exam["body"], "name": exam["name"],
                "reason": reason,
                "age_window": f"{exam['min_age']}-{exam['max_age']} yrs",
            })
    return {
        "age_years": round(age_years, 1),
        "eligible_count": len(eligible),
        "eligible": eligible,
        "not_eligible": not_eligible,
    }


# ----- Salary calculator -----
@api_router.get("/salary/{code}")
async def salary_for(code: str):
    exam = EXAMS.get(code.upper())
    if not exam:
        raise HTTPException(404, "Exam not found")
    base = exam["salary_inhand"]
    # Approximation of 7th CPC structure
    da = round(base * 0.46)
    hra_x = round(base * 0.27)
    hra_y = round(base * 0.18)
    hra_z = round(base * 0.09)
    npa_or_special = round(base * 0.10) if "Officer" in exam["salary_post"] or "Lieutenant" in exam["salary_post"] else 0
    gross_x = base + da + hra_x + npa_or_special
    gross_y = base + da + hra_y + npa_or_special
    gross_z = base + da + hra_z + npa_or_special
    deductions = round(gross_x * 0.10)
    return {
        "code": exam["code"], "post": exam["salary_post"], "base_pay": base,
        "components": {
            "basic": base, "da": da,
            "hra_metro": hra_x, "hra_tier2": hra_y, "hra_tier3": hra_z,
            "npa_special": npa_or_special, "deductions": deductions,
        },
        "gross_monthly": {"metro_x": gross_x, "tier2_y": gross_y, "tier3_z": gross_z},
        "in_hand_monthly": {
            "metro_x": gross_x - deductions,
            "tier2_y": gross_y - deductions,
            "tier3_z": gross_z - deductions,
        },
    }


# ----- Roadmap -----
@api_router.get("/roadmap/{code}")
async def roadmap_for(code: str):
    exam = EXAMS.get(code.upper())
    if not exam:
        raise HTTPException(404, "Exam not found")
    return {
        "code": exam["code"], "name": exam["name"], "body": exam["body"],
        "exam_date": exam["exam_date"], "form_window": exam["form_window"],
        "phases": exam["roadmap"],
    }


# ----- Progress tracker (authenticated) -----
@api_router.get("/progress")
async def get_progress(current=Depends(get_current_user)):
    rows = await db.progress.find({"user_id": current["id"]}, {"_id": 0}).to_list(1000)
    by_exam: dict = {}
    for r in rows:
        by_exam.setdefault(r["exam_code"], []).append({"topic": r["topic"], "completed": r["completed"]})
    return {"total": len(rows), "by_exam": by_exam}


@api_router.post("/progress")
async def update_progress(payload: ProgressUpdate, current=Depends(get_current_user)):
    if payload.exam_code.upper() not in EXAMS:
        raise HTTPException(404, "Exam not found")
    await db.progress.update_one(
        {"user_id": current["id"], "exam_code": payload.exam_code.upper(), "topic": payload.topic},
        {"$set": {
            "user_id": current["id"], "exam_code": payload.exam_code.upper(),
            "topic": payload.topic, "completed": payload.completed,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }},
        upsert=True,
    )
    return {"ok": True}


# ----- Current affairs -----
@api_router.get("/current-affairs")
async def list_ca(exam: Optional[str] = None):
    items = CURRENT_AFFAIRS
    if exam:
        items = [c for c in items if exam.upper() in c["exam_relevance"]]
    return {"count": len(items), "items": items}


# ----- Exam alerts -----
@api_router.get("/alerts")
async def alerts():
    items = []
    for e in EXAMS.values():
        try:
            d = datetime.strptime(e["exam_date"], "%Y-%m-%d")
            days_left = (d.date() - datetime.now(timezone.utc).date()).days
        except Exception:
            days_left = None
        items.append({
            "code": e["code"], "body": e["body"], "name": e["name"],
            "exam_date": e["exam_date"], "form_window": e["form_window"],
            "days_left": days_left,
        })
    items.sort(key=lambda x: (x["days_left"] is None, x["days_left"] if x["days_left"] is not None else 9999))
    return {"items": items}


# ----- Mount -----
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_start():
    await db.users.create_index("email", unique=True)
    await db.signups.create_index("email", unique=True)
    await db.progress.create_index([("user_id", 1), ("exam_code", 1), ("topic", 1)], unique=True)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
