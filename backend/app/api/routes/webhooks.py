import stripe
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from app.config import settings
from app.api.routes.billing import sync_subscription_from_event
from app.db.session import get_db
from app.db.models import User, Workspace

router = APIRouter(prefix="/webhooks")


@router.post("/clerk")
async def clerk_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Clerk webhook handler for user lifecycle events.
    https://clerk.com/docs/integrations/webhooks
    
    TODO:
    - Verify Clerk webhook signature (svix)
    - Handle user.created, user.updated, user.deleted events
    """
    body = await request.json()
    # Handle event type: body["type"] in ["user.created", "user.updated", ...]
    return {"ok": True}


@router.post("/github")
async def github_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    GitHub webhook for CI/CD integration.
    Triggers eval runs on PR/push events.
    
    TODO:
    - Verify GitHub webhook signature
    - Extract PR branch, commit SHA
    - Trigger eval run if release policy configured
    """
    body = await request.json()
    return {"ok": True}


@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Stripe webhook handler for subscription lifecycle events.
    """
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=500, detail="STRIPE_WEBHOOK_SECRET is not configured")

    payload = await request.body()
    signature = request.headers.get("stripe-signature")
    if not signature:
        raise HTTPException(status_code=400, detail="Missing Stripe signature")

    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=signature,
            secret=settings.stripe_webhook_secret,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=f"Invalid payload: {exc}")
    except stripe.error.SignatureVerificationError as exc:
        raise HTTPException(status_code=400, detail=f"Invalid signature: {exc}")

    event_type = event.get("type", "")
    data_object = event.get("data", {}).get("object", {})

    if event_type in {
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted",
    }:
        sync_subscription_from_event(data_object, db)

    return {"ok": True, "event_type": event_type}
