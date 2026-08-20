@echo off
echo ======================================
echo TEST DU BACKEND FASTAPI
echo ======================================
echo.

cd /d C:\Projets\jeune-fort-agrobusiness\backend

echo [1/5] Verification Python...
py -3.12 --version
if errorlevel 1 (
    echo ERREUR: Python 3.12 non trouve
    echo Essayez: py --version
    py --version
    pause
    exit /b 1
)
echo OK
echo.

echo [2/5] Creation environnement virtuel (si necessaire)...
if not exist "venv" (
    echo Creation de venv...
    py -3.12 -m venv venv
    if errorlevel 1 (
        echo ERREUR: Impossible de creer venv
        pause
        exit /b 1
    )
    echo Venv cree
) else (
    echo Venv existe deja
)
echo.

echo [3/5] Activation environnement virtuel...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERREUR: Impossible d'activer venv
    pause
    exit /b 1
)
echo OK
echo.

echo [4/5] Installation des dependances...
echo Cela peut prendre 2-5 minutes...
pip install --upgrade pip
pip install -r requirements.txt
if errorlevel 1 (
    echo ERREUR: Installation pip echouee
    pause
    exit /b 1
)
echo OK
echo.

echo [5/5] Test de lancement du serveur...
echo.
echo ======================================
echo Le serveur va demarrer sur http://localhost:8000
echo.
echo Endpoints disponibles:
echo   - http://localhost:8000/          (status)
echo   - http://localhost:8000/health    (health check)
echo   - http://localhost:8000/docs      (documentation Swagger)
echo.
echo Appuyez sur CTRL+C pour arreter le serveur
echo ======================================
echo.

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
