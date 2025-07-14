#!/usr/bin/env powershell
# MCP Server Installation Script
# Enhanced setup for missing critical servers

Write-Host "🚀 Installing Critical MCP Servers..." -ForegroundColor Green

# Function to install and verify npm packages
function Install-MCPServer {
    param(
        [string]$ServerName,
        [string]$PackageName,
        [string]$TestCommand = ""
    )
    
    Write-Host "`n📦 Installing $ServerName..." -ForegroundColor Yellow
    
    try {
        npm install -g $PackageName
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ $ServerName installed successfully" -ForegroundColor Green
            
            if ($TestCommand) {
                Write-Host "🧪 Testing $ServerName..." -ForegroundColor Cyan
                Invoke-Expression $TestCommand
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ $ServerName test passed" -ForegroundColor Green
                } else {
                    Write-Host "⚠️ $ServerName test failed" -ForegroundColor Red
                }
            }
        } else {
            Write-Host "❌ Failed to install $ServerName" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Error installing $ServerName`: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Install Tier 1 Critical Servers
Write-Host "`n=== TIER 1: CRITICAL SERVERS ===" -ForegroundColor Magenta

Install-MCPServer "PostgreSQL Server" "@modelcontextprotocol/server-postgres"
Install-MCPServer "GitHub Server" "@modelcontextprotocol/server-github"
Install-MCPServer "Google Drive Server" "@modelcontextprotocol/server-gdrive"

# Install Tier 2 High-Value Servers
Write-Host "`n=== TIER 2: HIGH-VALUE SERVERS ===" -ForegroundColor Magenta

Install-MCPServer "MongoDB Server" "mongo-mcp"
Install-MCPServer "Docker Server" "mcp-server-docker"
Install-MCPServer "AWS Server" "@aws-sdk/mcp-server"

# Install Productivity Servers
Write-Host "`n=== TIER 3: PRODUCTIVITY SERVERS ===" -ForegroundColor Magenta

Install-MCPServer "Slack Server" "@modelcontextprotocol/server-slack"
Install-MCPServer "Google Calendar Server" "google-calendar-mcp"
Install-MCPServer "Notion Server" "@modelcontextprotocol/server-notion"

# Install Development Tools
Write-Host "`n=== DEVELOPMENT TOOLS ===" -ForegroundColor Magenta

Install-MCPServer "VS Code Server" "@modelcontextprotocol/server-vscode"
Install-MCPServer "Kubernetes Server" "kubernetes-mcp"

# Verify Node.js and npm versions
Write-Host "`n🔍 Verifying Environment..." -ForegroundColor Cyan
Write-Host "Node.js version: $(node --version)"
Write-Host "npm version: $(npm --version)"

# Create installation summary
$installSummary = @"
MCP Server Installation Summary
Generated: $(Get-Date)

Critical Servers (Tier 1):
- PostgreSQL Server (@modelcontextprotocol/server-postgres)
- GitHub Server (@modelcontextprotocol/server-github)  
- Google Drive Server (@modelcontextprotocol/server-gdrive)

High-Value Servers (Tier 2):
- MongoDB Server (mongo-mcp)
- Docker Server (mcp-server-docker)
- AWS Server (@aws-sdk/mcp-server)

Productivity Servers (Tier 3):
- Slack Server (@modelcontextprotocol/server-slack)
- Google Calendar Server (google-calendar-mcp)
- Notion Server (@modelcontextprotocol/server-notion)

Development Tools:
- VS Code Server (@modelcontextprotocol/server-vscode)
- Kubernetes Server (kubernetes-mcp)

Next Steps:
1. Run the MCP validation script: node C:\Users\leung\Projects\test-mcp-setup.js
2. Update your Claude configuration to include new servers
3. Restart Claude Desktop to apply changes
4. Test each server individually

For server-specific configuration, check:
https://modelcontextprotocol.io/examples
"@

$installSummary | Out-File -FilePath "C:\Users\leung\Projects\mcp-installation-summary.txt" -Encoding UTF8

Write-Host "`n📄 Installation summary saved to: C:\Users\leung\Projects\mcp-installation-summary.txt" -ForegroundColor Green
Write-Host "`n🎉 Installation script completed!" -ForegroundColor Green
Write-Host "📋 Next: Run the validation script to verify your setup" -ForegroundColor Yellow