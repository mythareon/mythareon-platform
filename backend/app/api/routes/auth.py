from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models import User

router = APIRouter(prefix="/auth")


@router.post("/sync-user")
async def sync_user(
    clerk_id: str,
    email: str,
    name: str,
    db: Session = Depends(get_db)
):
    """
    Sync user from Clerk webhook or client.
    Creates or updates user record.
    """
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    
    if user:
        user.email = email
        user.name = name
    else:
        user = User(clerk_id=clerk_id, email=email, name=name)
        db.add(user)
    
    db.commit()
    db.refresh(user)
    return {
        "user_id": user.id,
        "email": user.email,
        "plan_tier": user.plan_tier,
        "subscription_status": user.subscription_status,
    }


@router.get("/me")
async def get_current_user(
    clerk_id: str,
    db: Session = Depends(get_db)
):
    """Get current user from Clerk ID."""
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "clerk_id": user.clerk_id,
        "email": user.email,
        "name": user.name,
        "plan_tier": user.plan_tier,
        "subscription_status": user.subscription_status,
        "subscription_current_period_end": user.subscription_current_period_end,
    }
