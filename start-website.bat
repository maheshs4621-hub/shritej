@echo off
cd /d C:\Users\Mahesh\OneDrive\Desktop\website
set PATH=C:\Program Files\nodejs;%PATH%
echo ===================================================
echo   Starting SHRITEJ AYURVED Premium Website
echo   Local Address: http://localhost:3000
echo ===================================================
start http://localhost:3000
npm run dev