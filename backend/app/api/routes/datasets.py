from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from pydantic import BaseModel
import json
from app.db.session import get_db
from app.db.models import Dataset, TestCase, Project

router = APIRouter(prefix="/projects/{project_id}/datasets")


class DatasetCreate(BaseModel):
    name: str
    description: str = None


class TestCaseCreate(BaseModel):
    input: str
    expected_output: str = None
    test_metadata: dict = {}


@router.post("", response_model=dict)
async def create_dataset(
    project_id: str,
    dataset_in: DatasetCreate,
    db: Session = Depends(get_db)
):
    """Create a new dataset."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    dataset = Dataset(
        project_id=project_id,
        name=dataset_in.name,
        description=dataset_in.description
    )
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    return {"id": dataset.id, "name": dataset.name}


@router.get("")
async def list_datasets(
    project_id: str,
    db: Session = Depends(get_db)
):
    """List datasets for a project."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    datasets = db.query(Dataset).filter(Dataset.project_id == project_id).all()
    return datasets


@router.post("/{dataset_id}/upload")
async def upload_dataset(
    project_id: str,
    dataset_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload a JSON file with test cases.
    Format: [{"input": "...", "expected_output": "...", "metadata": {...}}, ...]
    """
    dataset = db.query(Dataset).filter(
        Dataset.id == dataset_id,
        Dataset.project_id == project_id
    ).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    try:
        content = await file.read()
        test_cases_data = json.loads(content)
        
        for tc_data in test_cases_data:
            test_case = TestCase(
                dataset_id=dataset_id,
                input=tc_data["input"],
                expected_output=tc_data.get("expected_output"),
                test_metadata=tc_data.get("test_metadata", {})
            )
            db.add(test_case)
        
        dataset.test_cases_count = len(test_cases_data)
        db.commit()
        return {"message": "OK", "count": len(test_cases_data)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{dataset_id}")
async def get_dataset(
    project_id: str,
    dataset_id: str,
    db: Session = Depends(get_db)
):
    """Get a specific dataset with test case count."""
    dataset = db.query(Dataset).filter(
        Dataset.id == dataset_id,
        Dataset.project_id == project_id
    ).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset
