# ===== Create Logs Folder =====
$logDir = "logs"
if (!(Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir
}

Write-Output "Collecting logs..."

# ===== Backend Logs =====
"=== Backend NPM Info ===" | Out-File "$logDir/backend-npm.txt"
npm --prefix backend list --depth=0 | Out-File "$logDir/backend-npm.txt" -Append

"=== Backend ENV Variables ===" | Out-File "$logDir/backend-env.txt"
Get-Content backend/.env | Out-File "$logDir/backend-env.txt" -Append

# Copy backend server logs if any exist
if (Test-Path "backend/server.log") {
    Copy-Item "backend/server.log" "$logDir/server.log"
}

# ===== Frontend Logs =====
"=== Frontend NPM Info ===" | Out-File "$logDir/frontend-npm.txt"
npm --prefix frontend list --depth=0 | Out-File "$logDir/frontend-npm.txt" -Append

"=== Frontend ENV Variables ===" | Out-File "$logDir/frontend-env.txt"
Get-Content frontend/.env | Out-File "$logDir/frontend-env.txt" -Append

# ===== System Info =====
"=== System Information ===" | Out-File "$logDir/system-info.txt"
systeminfo | Out-File "$logDir/system-info.txt" -Append

"=== Node Version ===" | Out-File "$logDir/system-info.txt" -Append
node -v | Out-File "$logDir/system-info.txt" -Append

"=== NPM Version ===" | Out-File "$logDir/system-info.txt" -Append
npm -v | Out-File "$logDir/system-info.txt" -Append

Write-Output "Logs collected successfully in /logs"
