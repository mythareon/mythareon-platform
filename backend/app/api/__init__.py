from fastapi import APIRouter
from app.api.routes.auth import router as auth_router
from app.api.routes.billing import router as billing_router
from app.api.routes.projects import router as projects_router
from app.api.routes.datasets import router as datasets_router
from app.api.routes.eval_runs import router as eval_runs_router
from app.api.routes.workspaces import router as workspaces_router
from app.api.routes.webhooks import router as webhooks_router

api_router = APIRouter(prefix="/api")
api_router.include_router(auth_router, tags=["auth"])
api_router.include_router(workspaces_router, tags=["workspaces"])
api_router.include_router(projects_router, tags=["projects"])
api_router.include_router(datasets_router, tags=["datasets"])
api_router.include_router(eval_runs_router, tags=["eval-runs"])
api_router.include_router(billing_router, tags=["billing"])
api_router.include_router(webhooks_router, tags=["webhooks"])

__all__ = ["api_router"]
