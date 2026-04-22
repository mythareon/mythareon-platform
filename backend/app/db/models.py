from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean, JSON, Text, Float
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
import uuid

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    clerk_id = Column(String(255), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    workspaces = relationship("Workspace", back_populates="owner")


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = relationship("User", back_populates="workspaces")
    projects = relationship("Project", back_populates="workspace")


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    workspace_id = Column(String(36), ForeignKey("workspaces.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    workspace = relationship("Workspace", back_populates="projects")
    environments = relationship("Environment", back_populates="project")
    datasets = relationship("Dataset", back_populates="project")
    versions = relationship("PromptVersion", back_populates="project")
    eval_runs = relationship("EvalRun", back_populates="project")


class Environment(Base):
    __tablename__ = "environments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    name = Column(String(255), nullable=False)  # dev, staging, prod
    config = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="environments")


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    test_cases_count = Column(Integer, default=0)
    s3_path = Column(String(512))  # path in S3 or local storage
    created_at = Column(DateTime, default=datetime.utcnow)
    uploaded_by = Column(String(36), ForeignKey("users.id"))

    project = relationship("Project", back_populates="datasets")
    test_cases = relationship("TestCase", back_populates="dataset")


class TestCase(Base):
    __tablename__ = "test_cases"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    dataset_id = Column(String(36), ForeignKey("datasets.id"), nullable=False)
    input = Column(Text, nullable=False)  # prompt or request
    expected_output = Column(Text)  # gold standard
    test_metadata = Column(JSON, default={})  # renamed from metadata to avoid conflict
    created_at = Column(DateTime, default=datetime.utcnow)

    dataset = relationship("Dataset", back_populates="test_cases")


class PromptVersion(Base):
    __tablename__ = "prompt_versions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    version_name = Column(String(255), nullable=False)
    prompt_text = Column(Text, nullable=False)
    model_id = Column(String(255), nullable=False)
    temperature = Column(Float, default=0.7)
    max_tokens = Column(Integer, default=2000)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="versions")
    eval_runs_baseline = relationship("EvalRun", foreign_keys="EvalRun.baseline_version_id")
    eval_runs_candidate = relationship("EvalRun", foreign_keys="EvalRun.candidate_version_id")


class EvalRun(Base):
    __tablename__ = "eval_runs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    dataset_id = Column(String(36), ForeignKey("datasets.id"), nullable=False)
    baseline_version_id = Column(String(36), ForeignKey("prompt_versions.id"), nullable=False)
    candidate_version_id = Column(String(36), ForeignKey("prompt_versions.id"), nullable=False)
    status = Column(String(50), default="pending")  # pending, running, completed, failed
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    results_s3_path = Column(String(512))
    error_message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="eval_runs")


class EvalResult(Base):
    __tablename__ = "eval_results"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    eval_run_id = Column(String(36), ForeignKey("eval_runs.id"), nullable=False)
    test_case_id = Column(String(36), ForeignKey("test_cases.id"), nullable=False)
    candidate_output = Column(Text)
    score = Column(Float)  # 0-100
    metrics = Column(JSON, default={})  # latency, cost, hallucination_risk, etc
    passed = Column(Boolean, default=True)
    failure_reason = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class ReleasePolicy(Base):
    __tablename__ = "release_policies"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    environment_id = Column(String(36), ForeignKey("environments.id"))
    min_score_change = Column(Float)  # e.g., -5 means fail if score drops >5%
    max_cost_increase = Column(Float)  # e.g., 20 means fail if cost rises >20%
    require_human_approval = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class ReleasedVersion(Base):
    __tablename__ = "released_versions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), nullable=False)
    environment_id = Column(String(36), ForeignKey("environments.id"), nullable=False)
    version_id = Column(String(36), ForeignKey("prompt_versions.id"), nullable=False)
    released_by = Column(String(36), ForeignKey("users.id"))
    released_at = Column(DateTime, default=datetime.utcnow)
    previous_version_id = Column(String(36), ForeignKey("prompt_versions.id"))
