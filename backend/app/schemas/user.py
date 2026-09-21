"""Schémas Pydantic auth + profil (US-13/14/16/32)."""

from pydantic import BaseModel, EmailStr, Field


class RegisterIn(BaseModel):
    nom: str = Field(min_length=2, max_length=150)
    telephone: str = Field(min_length=8, max_length=30)
    email: EmailStr | None = None
    password: str = Field(min_length=6, max_length=72)
    adresse: str | None = Field(default=None, max_length=500)
    ville: str | None = Field(default=None, max_length=100)


class LoginIn(BaseModel):
    identifiant: str = Field(description="Téléphone ou email")
    password: str


class UserOut(BaseModel):
    id: int
    nom: str
    telephone: str
    email: str | None
    role: str
    adresse: str | None
    ville: str | None

    model_config = {"from_attributes": True}


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class ProfileUpdateIn(BaseModel):
    nom: str | None = Field(default=None, min_length=2, max_length=150)
    email: EmailStr | None = None
    adresse: str | None = Field(default=None, max_length=500)
    ville: str | None = Field(default=None, max_length=100)
