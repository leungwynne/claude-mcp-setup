# GitHub Repository Setup Script
# Run this after Claude Desktop restart to complete GitHub integration

param(
    [string]$GitHubToken = "your-github-token-here",
    [string]$RepoName = "claude-mcp-setup",
    [string]$GitHubUsername = ""
)

Write-Host "🚀 Setting up GitHub Repository Integration..." -ForegroundColor Green

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git for Windows first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Get GitHub username if not provided
if (-not $GitHubUsername) {
    Write-Host "📝 Please enter your GitHub username:" -ForegroundColor Yellow
    $GitHubUsername = Read-Host
}

# Navigate to repository directory
Set-Location "C:\Users\leung\github-repos\claude-mcp-setup"

# Initialize Git repository
Write-Host "📦 Initializing Git repository..." -ForegroundColor Cyan
git init

# Configure Git (if not already configured)
$gitUser = git config --global user.name
if (-not $gitUser) {
    Write-Host "⚙️ Configuring Git user..." -ForegroundColor Cyan
    git config --global user.name "$GitHubUsername"
    git config --global user.email "$GitHubUsername@users.noreply.github.com"
}

# Create .gitignore file
$gitignoreContent = @"
# Sensitive files
*.key
*.pem
.env
*.secret
secrets/

# Temporary files
*.tmp
*.log
*.cache

# Node modules
node_modules/
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/settings.json
.idea/

# Backup files
*.bak
*~
"@

$gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8
Write-Host "✅ Created .gitignore file" -ForegroundColor Green

# Add all files
Write-Host "📋 Adding files to Git..." -ForegroundColor Cyan
git add .

# Initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Claude MCP Setup with GitHub integration

- Added MCP server configurations
- Included automation scripts and tools  
- Set up organized project structure
- Enabled version control workflow"

# Create GitHub repository using GitHub CLI or curl
Write-Host "🌐 Creating GitHub repository..." -ForegroundColor Cyan

$createRepoData = @{
    name = $RepoName
    description = "Claude Desktop MCP Server Setup - Configurations, Scripts, Notes, and Tools"
    private = $false
    auto_init = $false
} | ConvertTo-Json

$headers = @{
    "Authorization" = "token $GitHubToken"
    "Accept" = "application/vnd.github.v3+json"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method POST -Body $createRepoData -Headers $headers
    Write-Host "✅ GitHub repository created successfully!" -ForegroundColor Green
    Write-Host "🔗 Repository URL: $($response.html_url)" -ForegroundColor Yellow
    
    # Add remote origin
    git remote add origin "https://github.com/$GitHubUsername/$RepoName.git"
    
    # Push to GitHub
    Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Cyan
    git branch -M main
    git push -u origin main
    
    Write-Host "🎉 Repository setup completed successfully!" -ForegroundColor Green
    Write-Host "📁 Local path: C:\Users\leung\github-repos\claude-mcp-setup" -ForegroundColor Yellow
    Write-Host "🌐 GitHub URL: https://github.com/$GitHubUsername/$RepoName" -ForegroundColor Yellow
    
} catch {
    Write-Host "⚠️ GitHub repository creation failed. You may need to create it manually." -ForegroundColor Yellow
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Manual steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor Gray
    Write-Host "2. Repository name: $RepoName" -ForegroundColor Gray
    Write-Host "3. Make it public" -ForegroundColor Gray
    Write-Host "4. Don't initialize with README (we already have files)" -ForegroundColor Gray
    Write-Host "5. Run: git remote add origin https://github.com/$GitHubUsername/$RepoName.git" -ForegroundColor Gray
    Write-Host "6. Run: git push -u origin main" -ForegroundColor Gray
}

Write-Host "`n🎯 Next Steps:" -ForegroundColor Magenta
Write-Host "1. Restart Claude Desktop to activate GitHub MCP server" -ForegroundColor Gray
Write-Host "2. All future work will be automatically committed and pushed" -ForegroundColor Gray
Write-Host "3. Access your work from anywhere via GitHub" -ForegroundColor Gray