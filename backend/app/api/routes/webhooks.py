from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
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
