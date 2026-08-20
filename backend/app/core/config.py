"""Configuration du backend FastAPI"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Configuration de l'application"""
    
    # Application
    APP_NAME: str = "Jeune Fort Agrobusiness API"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    
    # Base de données
    DATABASE_URL: str = "mysql+pymysql://user:password@localhost:3306/jeune_fort_agrobusiness"
    
    # Sécurité JWT
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001"
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convertit CORS_ORIGINS en liste"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    # Kkiapay (paiement)
    KKIAPAY_API_KEY: str = ""
    KKIAPAY_SECRET: str = ""
    KKIAPAY_SANDBOX: bool = True
    
    # SMTP
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    
    # Cloudinary
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
