"""Routes auth client + admin (US-13/14/16/32).

Contrats (à consommer par Charles) :
- POST /api/v1/auth/register {nom, telephone, email?, password, adresse?, ville?} -> TokenOut
- POST /api/v1/auth/login {identifiant, password} -> TokenOut
- GET /api/v1/auth/me (Bearer) -> UserOut
- PATCH /api/v1/auth/me (Bearer) -> UserOut
- POST /api/v1/admin/login {identifiant, password} -> TokenOut (403 si non admin)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_admin
from app.core.security import create_access_token, verify_password
from app.crud.user import create_user, get_by_identifiant
from app.db.session import get_db
from app.models import User
from app.schemas.user import LoginIn, ProfileUpdateIn, RegisterIn, TokenOut, UserOut

router = APIRouter(tags=["auth"])


def _token_for(user: User) -> TokenOut:
    return TokenOut(
        access_token=create_access_token(str(user.id), user.role.value),
        user=UserOut.model_validate(user),
    )


@router.post("/auth/register", response_model=TokenOut, status_code=201)
def register(data: RegisterIn, db: Session = Depends(get_db)):
    if get_by_identifiant(db, data.telephone.strip()):
        raise HTTPException(status_code=409, detail="Téléphone déjà utilisé")
    if data.email and get_by_identifiant(db, str(data.email).lower()):
        raise HTTPException(status_code=409, detail="Email déjà utilisé")
    user = create_user(db, data)
    return _token_for(user)


def _login(db: Session, data: LoginIn, admin_only: bool = False) -> TokenOut:
    user = get_by_identifiant(db, data.identifiant.strip())
    if user is None or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Identifiants invalides")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Compte désactivé")
    if admin_only and user.role.value != "admin":
        raise HTTPException(status_code=403, detail="Réservé aux administrateurs")
    return _token_for(user)


@router.post("/auth/login", response_model=TokenOut)
def login(data: LoginIn, db: Session = Depends(get_db)):
    return _login(db, data)


@router.post("/admin/login", response_model=TokenOut)
def admin_login(data: LoginIn, db: Session = Depends(get_db)):
    return _login(db, data, admin_only=True)


@router.get("/auth/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
    return UserOut.model_validate(user)


@router.patch("/auth/me", response_model=UserOut)
def update_me(data: ProfileUpdateIn, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if data.nom is not None:
        user.nom = data.nom.strip()
    if data.email is not None:
        email = str(data.email).lower()
        existing = get_by_identifiant(db, email)
        if existing and existing.id != user.id:
            raise HTTPException(status_code=409, detail="Email déjà utilisé")
        user.email = email
    if data.adresse is not None:
        user.adresse = data.adresse
    if data.ville is not None:
        user.ville = data.ville
    db.commit()
    db.refresh(user)
    return UserOut.model_validate(user)


@router.get("/admin/me", response_model=UserOut)
def admin_me(user: User = Depends(require_admin)):
    return UserOut.model_validate(user)
