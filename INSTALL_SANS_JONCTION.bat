@echo off
echo ======================================
echo Installation npm DIRECTE (sans jonction)
echo node_modules sera sur la cle USB E:
echo Plus lent mais plus compatible
echo ======================================
echo.

cd /d C:\Projets\jeune-fort-agrobusiness\frontend

echo [1/2] Suppression de l'ancien node_modules si existe...
if exist "node_modules" (
    rmdir "node_modules" /s /q 2>nul
    if exist "node_modules" (
        fsutil reparsepoint delete "node_modules" 2>nul
        rmdir "node_modules" 2>nul
    )
)
echo OK
echo.

echo [2/2] Lancement de npm install...
echo Cela peut prendre 20-60 minutes (installation sur cle USB)...
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
