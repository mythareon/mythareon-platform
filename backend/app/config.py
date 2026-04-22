import os
from typing import List


class Settings:
    """Application settings from environment variables."""
    
    def __init__(self):
        # Database
        self.database_url = os.getenv(
            "DATABASE_URL",
            "postgresql://mythareon:mythareon_dev@localhost:5432/mythareon_db"
        )
        
        # Redis
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        
        # Environment
        self.environment = os.getenv("ENVIRONMENT", "development")
        self.log_level = os.getenv("LOG_LEVEL", "INFO")
        
        # Clerk Auth
        self.clerk_secret_key = os.getenv("CLERK_SECRET_KEY", "")
        self.clerk_publishable_key = os.getenv("CLERK_PUBLISHABLE_KEY", "")
        
        # Stripe Billing
        self.stripe_secret_key = os.getenv("STRIPE_SECRET_KEY", "")
        self.stripe_publishable_key = os.getenv("STRIPE_PUBLISHABLE_KEY", "")
        self.stripe_webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "")
        self.stripe_price_id_pro = os.getenv("STRIPE_PRICE_ID_PRO", "")

        # App URLs
        self.frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        self.backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")
        
        # LLM Providers
        self.openai_api_key = os.getenv("OPENAI_API_KEY", "")
        self.anthropic_api_key = os.getenv("ANTHROPIC_API_KEY", "")
        
        # CORS
        origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,https://mythareon.vercel.app,https://mythareon-ai.vercel.app")
        self.allowed_origins = origins_str.split(",")
        
        # Storage
        self.storage_type = os.getenv("STORAGE_TYPE", "local")
        self.storage_path = os.getenv("STORAGE_PATH", "./uploads")


settings = Settings()
