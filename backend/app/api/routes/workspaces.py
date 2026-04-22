from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.models import User, Workspace
from app.db.session import get_db

router = APIRouter(prefix="/workspaces")


class WorkspaceCreate(BaseModel):
    name: str


@router.get("")
async def list_workspaces(
    clerk_id: str,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    workspaces = db.query(Workspace).filter(Workspace.owner_id == user.id).all()
    return workspaces


@router.post("")
async def create_workspace(
    workspace_in: WorkspaceCreate,
    clerk_id: str,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    slug_base = workspace_in.name.strip().lower().replace(" ", "-")
    if not slug_base:
        raise HTTPException(status_code=400, detail="Workspace name is required")

    slug = slug_base
    counter = 1
    while db.query(Workspace).filter(Workspace.slug == slug).first():
        counter += 1
        slug = f"{slug_base}-{counter}"

    workspace = Workspace(owner_id=user.id, name=workspace_in.name, slug=slug)
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    return workspace
