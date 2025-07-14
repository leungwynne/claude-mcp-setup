# Simple MCP Backup Script
$BackupDir = "C:\Users\leung\Documents\mcp-backups"
$TimeStamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$BackupPath = "$BackupDir\mcp-backup-$TimeStamp"

Write-Host "Creating backup directory: $BackupPath" -ForegroundColor Green
New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null

# Backup Claude configs
$ConfigDir = "C:\Users\leung\AppData\Roaming\Claude"
Copy-Item "$ConfigDir\claude_desktop_config.json" "$BackupPath\" -ErrorAction SilentlyContinue
Copy-Item "$ConfigDir\claude_desktop_config_enhanced.json" "$BackupPath\" -ErrorAction SilentlyContinue

# Backup project configs  
$ProjectDir = "C:\Users\leung\claude-mcp-configs"
if (Test-Path $ProjectDir) {
    Copy-Item $ProjectDir "$BackupPath\claude-mcp-configs" -Recurse -Force
}

Write-Host "Backup completed: $BackupPath" -ForegroundColor Green