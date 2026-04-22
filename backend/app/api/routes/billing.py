from datetime import datetime, timezone

import stripe
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.config import settings
from app.db.models import User
from app.db.session import get_db

router = APIRouter(prefix="/billing")


class BillingPortalRequest(BaseModel):
    clerk_id: str
    return_url: str | None = None


def _stripe_client() -> None:
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=500, detail="STRIPE_SECRET_KEY is not configured")
    stripe.api_key = settings.stripe_secret_key


def _get_user_or_404(clerk_id: str, db: Session) -> User:
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def _ensure_customer(user: User, db: Session) -> User:
    _stripe_client()
    if user.stripe_customer_id:
        return user

    customer = stripe.Customer.create(
        email=user.email,
        name=user.name,
        metadata={"clerk_id": user.clerk_id},
    )
    user.stripe_customer_id = customer.id
    db.commit()
    db.refresh(user)
    return user


@router.get("/me")
async def get_billing_status(
    clerk_id: str,
    db: Session = Depends(get_db),
):
    user = _get_user_or_404(clerk_id, db)
    return {
        "plan": user.plan_tier,
        "subscription_status": user.subscription_status,
        "stripe_customer_id": user.stripe_customer_id,
        "subscription_current_period_end": user.subscription_current_period_end,
    }


@router.get("/checkout")
async def create_checkout_redirect(
    clerk_id: str,
    success_url: str | None = None,
    cancel_url: str | None = None,
    db: Session = Depends(get_db),
):
    if not settings.stripe_price_id_pro:
        raise HTTPException(status_code=500, detail="STRIPE_PRICE_ID_PRO is not configured")

    user = _get_user_or_404(clerk_id, db)
    user = _ensure_customer(user, db)
    _stripe_client()

    checkout = stripe.checkout.Session.create(
        mode="subscription",
        customer=user.stripe_customer_id,
        line_items=[{"price": settings.stripe_price_id_pro, "quantity": 1}],
        success_url=success_url or f"{settings.frontend_url}/workspaces?billing=success",
        cancel_url=cancel_url or f"{settings.frontend_url}/workspaces?billing=cancel",
        metadata={"clerk_id": user.clerk_id},
    )
    return RedirectResponse(url=checkout.url, status_code=303)


@router.post("/portal")
async def create_billing_portal(
    payload: BillingPortalRequest,
    db: Session = Depends(get_db),
):
    user = _get_user_or_404(payload.clerk_id, db)
    user = _ensure_customer(user, db)
    _stripe_client()

    portal = stripe.billing_portal.Session.create(
        customer=user.stripe_customer_id,
        return_url=payload.return_url or f"{settings.frontend_url}/workspaces",
    )
    return {"url": portal.url}


@router.get("/portal")
async def create_billing_portal_redirect(
    clerk_id: str,
    return_url: str | None = None,
    db: Session = Depends(get_db),
):
    user = _get_user_or_404(clerk_id, db)
    user = _ensure_customer(user, db)
    _stripe_client()

    portal = stripe.billing_portal.Session.create(
        customer=user.stripe_customer_id,
        return_url=return_url or f"{settings.frontend_url}/workspaces",
    )
    return RedirectResponse(url=portal.url, status_code=303)


def sync_subscription_from_event(subscription: dict, db: Session) -> None:
    customer_id = subscription.get("customer")
    if not customer_id:
        return

    user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
    if not user:
        return

    status = subscription.get("status", "inactive")
    user.subscription_status = status
    user.stripe_subscription_id = subscription.get("id")

    if status in {"active", "trialing", "past_due"}:
        user.plan_tier = "pro"
    else:
        user.plan_tier = "free"

    period_end = subscription.get("current_period_end")
    if period_end:
        user.subscription_current_period_end = datetime.fromtimestamp(period_end, tz=timezone.utc)

    db.commit()
