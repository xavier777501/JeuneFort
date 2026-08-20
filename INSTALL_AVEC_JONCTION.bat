@echo off
echo ======================================
echo Installation npm avec node_modules sur C:
echo ======================================
echo.

cd /d C:\Projets\jeune-fort-agrobusiness\frontend

echo [1/4] Creation du dossier cible sur C:...
if not exist "C:\DevFast" mkdir "C:\DevFast"
if not exist "C:\DevFast\node_modules-jeune-fort" mkdir "C:\DevFast\node_modules-jeune-fort"
echo OK
echo.

echo [2/4] Suppression de l'ancien node_modules si existe...
if exist "node_modules" (
    rmdir "node_modules" /s /q 2>nul
    if exist "node_modules" (
        echo Attention: node_modules existe encore, tentative avec jonction...
        fsutil reparsepoint delete "node_modules" 2>nul
        rmdir "node_modules" 2>nul
    )
)
echo OK
echo.

echo [3/4] Creation de la jonction node_modules vers C:\DevFast...
mklink /J "node_modules" "C:\DevFast\node_modules-jeune-fort"
if errorlevel 1 (
    echo ERREUR: Impossible de creer la jonction
    pause
    exit /b 1
)
echo OK
echo.

echo [4/4] Lancement de npm install...
echo Cela peut prendre 10-30 minutes selon votre connexion...
echo.
npm install
if errorlevel 1 (
    echo.
    echo ERREUR lors de npm install
    echo Verifiez les logs dans: %LOCALAPPDATA%\Temp\npm-cache\_logs
    pause
    exit /b 1
)

echo.
echo ======================================
echo SUCCES! Dependencies installees
echo ======================================
pause
