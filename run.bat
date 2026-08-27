@echo off
title Optica Lopez - Servidor local
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js no esta instalado.
    echo Descargalo desde https://nodejs.org ^(version LTS^), instalalo y vuelve a ejecutar este archivo.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Instalando dependencias, solo pasa la primera vez. Puede tardar 1-2 minutos...
    call npm install --no-audit --no-fund
    if errorlevel 1 (
        echo [ERROR] Fallo la instalacion de dependencias. Revisa tu conexion a internet.
        pause
        exit /b 1
    )
)

echo.
echo Iniciando Optica Lopez en http://localhost:8000
echo El navegador se abrira automaticamente. Para detener el servidor cierra esta ventana o presiona Ctrl+C.
echo.
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:8000"
call npm run dev
pause
