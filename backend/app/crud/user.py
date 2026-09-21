"""CRUD users (auth)."""

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models import User
from app.models.enums import UserRole
from app.schemas.user import RegisterIn


def get_by_identifiant(db: Session, identifiant: str) -> User | None:
    return db.query(User).filter(or_(User.telephone == identifiant, User.email == identifiant)).first()


def create_user(db: Session, data: RegisterIn, role: UserRole = UserRole.CLIENT) -> User:
    user = User(
        nom=data.nom.strip(),
        telephone=data.telephone.strip(),
        email=str(data.email).lower() if data.email else None,
        password_hash=hash_password(data.password),
        role=role,
        adresse=data.adresse,
        ville=data.ville,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
