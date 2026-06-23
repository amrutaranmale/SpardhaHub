from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="SpardhaHub API")
api_router = APIRouter(prefix="/api")


# ----- Models -----
class Signup(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: str = "hero_cta"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SignupCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "hero_cta"


class SignupResponse(BaseModel):
    id: str
    email: EmailStr
    created_at: datetime
    message: str = "You're on the list — welcome to SpardhaHub!"


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "SpardhaHub API is running", "tagline": "Your Goal. Our Path."}


@api_router.post("/signup", response_model=SignupResponse)
async def create_signup(payload: SignupCreate):
    email_norm = payload.email.lower().strip()

    existing = await db.signups.find_one({"email": email_norm}, {"_id": 0})
    if existing:
        created_at = existing["created_at"]
        if isinstance(created_at, str):
            created_at = datetime.fromisoformat(created_at)
        return SignupResponse(
            id=existing["id"],
            email=existing["email"],
            created_at=created_at,
            message="You're already on the list — see you soon!",
        )

    signup = Signup(email=email_norm, source=payload.source or "hero_cta")
    doc = signup.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["email"] = str(doc["email"])
    await db.signups.insert_one(doc)

    return SignupResponse(
        id=signup.id,
        email=signup.email,
        created_at=signup.created_at,
    )


@api_router.get("/signup/count")
async def signup_count():
    count = await db.signups.count_documents({})
    return {"count": count}


@api_router.get("/signups", response_model=List[Signup])
async def list_signups(limit: int = 100):
    rows = await db.signups.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get("created_at"), str):
            r["created_at"] = datetime.fromisoformat(r["created_at"])
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
