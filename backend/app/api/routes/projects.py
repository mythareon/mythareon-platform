from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.db.models import Project, Workspace, User

router = APIRouter(prefix="/workspaces/{workspace_id}/projects")


class ProjectCreate(BaseModel):
    name: str
    description: str = None


class ProjectResponse(BaseModel):
    id: str
    name: str
    description: str


@router.post("", response_model=ProjectResponse)
async def create_project(
    workspace_id: str,
    project_in: ProjectCreate,
    db: Session = Depends(get_db)
):
    """Create a new project in a workspace."""
    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    
    project = Project(
        workspace_id=workspace_id,
        name=project_in.name,
        description=project_in.description
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("")
async def list_projects(
    workspace_id: str,
    db: Session = Depends(get_db)
):
    """List all projects in a workspace."""
    projects = db.query(Project).filter(Project.workspace_id == workspace_id).all()
    return projects


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    workspace_id: str,
    project_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific project."""
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.workspace_id == workspace_id
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
