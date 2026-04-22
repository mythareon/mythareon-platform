import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db.session import engine
from app.db import models
from app.api import api_router

# Setup logging
logging.basicConfig(level=settings.log_level)
logger = logging.getLogger(__name__)


# Create tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Creating database tables...")
    models.Base.metadata.create_all(bind=engine)
    logger.info("Application startup complete")
    yield
    # Shutdown
    logger.info("Application shutdown")


app = FastAPI(
    title="Mythareon API",
    description="The control plane for AI reliability",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": "mythareon-api",
        "environment": settings.environment,
    }


# Include routers
app.include_router(api_router)
