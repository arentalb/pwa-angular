@echo off
cd C:\Users\Click\Documents\angular\code\pwa
cd dist
cd ..
call ng build --configuration=production
cd dist/pwa

:: Stop the HTTP server if it's already running
taskkill /F /IM http-server >nul 2>&1

:: Start the HTTP server with the specified proxy
call http-server -c-1 --proxy http://localhost:9000
