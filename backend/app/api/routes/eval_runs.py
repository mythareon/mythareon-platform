from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.db.models import EvalRun, Project, PromptVersion, Dataset

router = APIRouter(prefix="/projects/{project_id}/eval-runs")


class EvalRunCreate(BaseModel):
    dataset_id: str
    baseline_version_id: str
    candidate_version_id: str


class EvalRunResponse(BaseModel):
    id: str
    status: str
    created_at: str


@router.post("", response_model=EvalRunResponse)
async def create_eval_run(
    project_id: str,
    eval_in: EvalRunCreate,
    db: Session = Depends(get_db)
):
    """
    Create and queue a new evaluation run.
    This triggers an async Celery task to execute against the dataset.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    dataset = db.query(Dataset).filter(Dataset.id == eval_in.dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    baseline = db.query(PromptVersion).filter(PromptVersion.id == eval_in.baseline_version_id).first()
    candidate = db.query(PromptVersion).filter(PromptVersion.id == eval_in.candidate_version_id).first()
    
    if not baseline or not candidate:
        raise HTTPException(status_code=404, detail="Prompt version not found")
    
    eval_run = EvalRun(
        project_id=project_id,
        dataset_id=eval_in.dataset_id,
        baseline_version_id=eval_in.baseline_version_id,
        candidate_version_id=eval_in.candidate_version_id,
        status="pending"
    )
    db.add(eval_run)
    db.commit()
    db.refresh(eval_run)
    
    # TODO: Queue Celery task here
    # from app.workers.eval_worker import run_eval_task
    # run_eval_task.delay(eval_run.id, eval_in.dataset_id, eval_in.candidate_version_id)
    
    return eval_run


@router.get("/{eval_run_id}")
async def get_eval_run(
    project_id: str,
    eval_run_id: str,
    db: Session = Depends(get_db)
):
    """Get evaluation run status and results."""
    eval_run = db.query(EvalRun).filter(
        EvalRun.id == eval_run_id,
        EvalRun.project_id == project_id
    ).first()
    if not eval_run:
        raise HTTPException(status_code=404, detail="Eval run not found")
    return eval_run


@router.get("")
async def list_eval_runs(
    project_id: str,
    db: Session = Depends(get_db)
):
    """List all eval runs in a project."""
    eval_runs = db.query(EvalRun).filter(EvalRun.project_id == project_id).all()
    return eval_runs
