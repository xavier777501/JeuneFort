@echo off
echo ======================================
echo LANCEMENT DU BACKEND FASTAPI
echo ======================================
echo.

cd /d C:\Projets\jeune-fort-agrobusiness\backend

echo Activation de l'environnement virtuel...
call venv\Scripts\activate.bat

echo.
echo ======================================
echo Serveur demarre sur:
echo   http://localhost:8000/          - Status
echo   http://localhost:8000/health    - Health check
echo   http://localhost:8000/docs      - Documentation Swagger
echo   http://localhost:8000/redoc     - Documentation ReDoc
echo.
echo Appuyez sur CTRL+C pour arreter
echo ======================================
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
