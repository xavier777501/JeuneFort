@echo off
REM ============================================
REM Jeune Fort Agrobusiness - Lancement du projet
REM Backend FastAPI + Frontend Next.js
REM ============================================
setlocal
cd /d "%~dp0"

REM ---------- 1. Configuration ----------
set BACKEND_DIR=backend
set FRONTEND_DIR=frontend
set BACKEND_PORT=8000
set FRONTEND_PORT=3000

echo.
echo ============================================
echo   JEUNE FORT AGROBUSINESS - DEMARRAGE
echo ============================================
echo.

REM ---------- 2. Backend ----------
if not exist "%BACKEND_DIR%\venv" (
    echo [1/3] Creation de l'environnement virtuel Python...
    cd "%BACKEND_DIR%"
    python -m venv venv
    if errorlevel 1 (
        echo ERREUR: Impossible de creer le venv. Python est-il installe ?
        pause
        exit /b 1
    )
    echo [2/3] Installation des dependances backend...
    call "venv\Scripts\activate.bat"
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ERREUR: Echec de l'installation des dependances.
        pause
        exit /b 1
    )
    cd ..
) else (
    echo [1/3] Environnement Python deja cree, verification des dependances...
    cd "%BACKEND_DIR%"
    call "venv\Scripts\activate.bat"
    pip install -q -r requirements.txt
    cd ..
)

REM Fichier .env du backend (creation si absent)
if not exist "%BACKEND_DIR%\.env" (
    copy "%BACKEND_DIR%\.env.example" "%BACKEND_DIR%\.env" >nul
    echo [info] .env cree depuis .env.example - pensez a le renseigner.
)

echo [3/3] Installation des dependances frontend...
cd "%FRONTEND_DIR%"
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo ERREUR: Echec de npm install.
        pause
        exit /b 1
    )
)
cd ..

echo.
echo Lancement du backend et du frontend...
echo - Backend  : http://localhost:%BACKEND_PORT%  (Swagger: /docs)
echo - Frontend : http://localhost:%FRONTEND_PORT%
echo - Pour arreter : fermer les fenetres ou Ctrl+C
echo.

REM ---------- 3. Lancement (2 fenetres separees) ----------
start "JFA Backend" cmd /k "cd /d %cd%\%BACKEND_DIR% && venv\Scripts\activate.bat && uvicorn app.main:app --reload --host 0.0.0.0 --port %BACKEND_PORT%"
start "JFA Frontend" cmd /k "cd /d %cd%\%FRONTEND_DIR% && npm run dev"

endlocal