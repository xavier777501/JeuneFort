"""Tests US-S2 — socle API : routes legacy + versionnées + health DB."""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_api_health():
    r = client.get("/api/v1/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


def test_api_health_db():
    r = client.get("/api/v1/health/db")
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"
    assert data["tables"] >= 10
