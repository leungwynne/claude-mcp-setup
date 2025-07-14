# Complete GitHub Setup Script
# Run this after token verification

Write-Host "🚀 Completing GitHub Integration Setup..." -ForegroundColor Green

# Set working directory
Set-Location "C:\Users\leung\github-repos\claude-mcp-setup"

# Initialize git if not already done
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Configure git user (replace with your info)
Write-Host "⚙️ Configuring Git user..." -ForegroundColor Yellow
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
Write-Host "📁 Adding all files..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Complete MCP server setup with configs, scripts, and tools

- 11 MCP servers configured and optimized
- Security enhancements and performance tuning
- Automated installation and monitoring scripts
- Comprehensive backup and recovery system
- Professional documentation and organization"

# Instructions for manual GitHub setup
Write-Host "`n🎯 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: claude-mcp-setup" -ForegroundColor White
Write-Host "3. Description: Comprehensive MCP server setup for Claude Desktop" -ForegroundColor White
Write-Host "4. Make it Public (or Private if you prefer)" -ForegroundColor White
Write-Host "5. DON'T initialize with README (we already have one)" -ForegroundColor White
Write-Host "6. Click 'Create repository'" -ForegroundColor White
Write-Host "`n7. Copy the commands GitHub shows you and run them here" -ForegroundColor White
Write-Host "   OR run these commands:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/YourUsername/claude-mcp-setup.git" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray

Write-Host "`n✅ Local repository is ready!" -ForegroundColor Green
Write-Host "📁 Location: C:\Users\leung\github-repos\claude-mcp-setup" -ForegroundColor Gray
Write-Host "📊 Files organized and committed locally" -ForegroundColor Gray