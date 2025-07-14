# Simple MCP Server Installation Script

Write-Host "🚀 Installing Additional MCP Servers..." -ForegroundColor Green

# Tier 1: Critical Servers
Write-Host "`n=== TIER 1: CRITICAL SERVERS ===" -ForegroundColor Magenta

Write-Host "📦 Installing PostgreSQL Server..." -ForegroundColor Yellow
npm install -g @modelcontextprotocol/server-postgres

Write-Host "📦 Installing GitHub Server..." -ForegroundColor Yellow  
npm install -g @modelcontextprotocol/server-github

Write-Host "📦 Installing Google Drive Server..." -ForegroundColor Yellow
npm install -g @modelcontextprotocol/server-gdrive

# Tier 2: High-Value Servers  
Write-Host "`n=== TIER 2: HIGH-VALUE SERVERS ===" -ForegroundColor Magenta

Write-Host "📦 Installing MongoDB Server..." -ForegroundColor Yellow
npm install -g mongo-mcp

Write-Host "📦 Installing Docker Server..." -ForegroundColor Yellow
npm install -g mcp-server-docker

# Tier 3: Productivity Servers
Write-Host "`n=== TIER 3: PRODUCTIVITY SERVERS ===" -ForegroundColor Magenta

Write-Host "📦 Installing Slack Server..." -ForegroundColor Yellow
npm install -g @modelcontextprotocol/server-slack

Write-Host "📦 Installing Google Calendar Server..." -ForegroundColor Yellow
npm install -g google-calendar-mcp

Write-Host "📦 Installing Notion Server..." -ForegroundColor Yellow
npm install -g @modelcontextprotocol/server-notion

Write-Host "`n✅ Installation completed!" -ForegroundColor Green
Write-Host "💡 Next: Update your Claude configuration to enable these servers" -ForegroundColor Yellow