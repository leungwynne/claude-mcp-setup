#!/usr/bin/env powershell
# MCP Configuration Backup and Recovery Script

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("backup", "restore", "cleanup")]
    [string]$Action = "backup"
)

# Configuration
$BackupDir = "C:\Users\leung\Documents\mcp-backups"
$ConfigDir = "C:\Users\leung\AppData\Roaming\Claude"
$ProjectDir = "C:\Users\leung\claude-mcp-configs"

function Create-Backup {
    Write-Host "🔄 Creating MCP Configuration Backup..." -ForegroundColor Green
    
    # Create backup directory with timestamp
    $TimeStamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    $BackupPath = Join-Path $BackupDir "mcp-backup-$TimeStamp"
    New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
    
    # Backup Claude configuration files
    $ClaudeConfigFiles = @(
        "claude_desktop_config.json",
        "claude_desktop_config_enhanced.json",
        "claude_desktop_config_optimized.json"
    )
    
    foreach ($ConfigFile in $ClaudeConfigFiles) {
        $SourcePath = Join-Path $ConfigDir $ConfigFile
        if (Test-Path $SourcePath) {
            $DestPath = Join-Path $BackupPath $ConfigFile
            Copy-Item $SourcePath $DestPath -Force
            Write-Host "  ✅ Backed up $ConfigFile" -ForegroundColor Gray
        }
    }
    
    # Backup project configurations
    if (Test-Path $ProjectDir) {
        $ProjectBackupPath = Join-Path $BackupPath "claude-mcp-configs"
        Copy-Item $ProjectDir $ProjectBackupPath -Recurse -Force
        Write-Host "  ✅ Backed up project configurations" -ForegroundColor Gray
    }
    
    # Backup Basic Memory data if exists
    $MemoryPath = Join-Path $env:USERPROFILE ".basic_memory"
    if (Test-Path $MemoryPath) {
        $MemoryBackupPath = Join-Path $BackupPath "basic_memory"
        Copy-Item $MemoryPath $MemoryBackupPath -Recurse -Force
        Write-Host "  ✅ Backed up Basic Memory data" -ForegroundColor Gray
    }
    
    # Create backup manifest
    $Manifest = @{
        timestamp = $TimeStamp
        hostname = $env:COMPUTERNAME
        username = $env:USERNAME
        files = Get-ChildItem $BackupPath -Recurse | Select-Object Name, Length, LastWriteTime
        nodeVersion = & node --version 2>$null
        npmVersion = & npm --version 2>$null
    }
    
    $ManifestPath = Join-Path $BackupPath "backup-manifest.json"
    $Manifest | ConvertTo-Json -Depth 10 | Out-File $ManifestPath -Encoding UTF8
    
    Write-Host "`n✅ Backup completed successfully!" -ForegroundColor Green
    Write-Host "📁 Backup location: $BackupPath" -ForegroundColor Yellow
    
    return $BackupPath
}

function Restore-Backup {
    param([string]$BackupPath)
    
    if (-not $BackupPath) {
        # Find latest backup
        $LatestBackup = Get-ChildItem $BackupDir -Directory | 
                       Where-Object { $_.Name -match "mcp-backup-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}" } |
                       Sort-Object Name -Descending | 
                       Select-Object -First 1
        
        if (-not $LatestBackup) {
            Write-Host "❌ No backups found in $BackupDir" -ForegroundColor Red
            return
        }
        
        $BackupPath = $LatestBackup.FullName
    }
    
    if (-not (Test-Path $BackupPath)) {
        Write-Host "❌ Backup path not found: $BackupPath" -ForegroundColor Red
        return
    }
    
    Write-Host "🔄 Restoring MCP Configuration from backup..." -ForegroundColor Green
    Write-Host "📁 Source: $BackupPath" -ForegroundColor Yellow
    
    # Create backup of current configuration before restore
    $PreRestoreBackup = Create-Backup
    Write-Host "💾 Current configuration backed up to: $PreRestoreBackup" -ForegroundColor Cyan
    
    # Restore Claude configuration files
    $ClaudeConfigFiles = Get-ChildItem $BackupPath -Filter "*.json" | Where-Object { $_.Name -like "claude_desktop_config*" }
    
    foreach ($ConfigFile in $ClaudeConfigFiles) {
        $DestPath = Join-Path $ConfigDir $ConfigFile.Name
        Copy-Item $ConfigFile.FullName $DestPath -Force
        Write-Host "  ✅ Restored $($ConfigFile.Name)" -ForegroundColor Gray
    }
    
    # Restore project configurations
    $ProjectBackupPath = Join-Path $BackupPath "claude-mcp-configs"
    if (Test-Path $ProjectBackupPath) {
        if (Test-Path $ProjectDir) {
            Remove-Item $ProjectDir -Recurse -Force
        }
        Copy-Item $ProjectBackupPath $ProjectDir -Recurse -Force
        Write-Host "  ✅ Restored project configurations" -ForegroundColor Gray
    }
    
    # Restore Basic Memory data
    $MemoryBackupPath = Join-Path $BackupPath "basic_memory"
    if (Test-Path $MemoryBackupPath) {
        $MemoryPath = Join-Path $env:USERPROFILE ".basic_memory"
        if (Test-Path $MemoryPath) {
            Remove-Item $MemoryPath -Recurse -Force
        }
        Copy-Item $MemoryBackupPath $MemoryPath -Recurse -Force
        Write-Host "  ✅ Restored Basic Memory data" -ForegroundColor Gray
    }
    
    Write-Host "`n✅ Restore completed successfully!" -ForegroundColor Green
    Write-Host "⚠️  Please restart Claude Desktop to apply changes" -ForegroundColor Yellow
}

function Clean-OldBackups {
    param([int]$DaysToKeep = 30)
    
    Write-Host "🧹 Cleaning up old backups (keeping last $DaysToKeep days)..." -ForegroundColor Green
    
    $CutoffDate = (Get-Date).AddDays(-$DaysToKeep)
    $OldBackups = Get-ChildItem $BackupDir -Directory | 
                  Where-Object { 
                      $_.Name -match "mcp-backup-(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})" -and
                      $_.CreationTime -lt $CutoffDate 
                  }
    
    if ($OldBackups.Count -eq 0) {
        Write-Host "  ✅ No old backups to clean up" -ForegroundColor Gray
        return
    }
    
    foreach ($Backup in $OldBackups) {
        Remove-Item $Backup.FullName -Recurse -Force
        Write-Host "  🗑️  Removed old backup: $($Backup.Name)" -ForegroundColor Gray
    }
    
    Write-Host "✅ Cleanup completed. Removed $($OldBackups.Count) old backups" -ForegroundColor Green
}

function Show-BackupStatus {
    Write-Host "📊 MCP Backup Status" -ForegroundColor Cyan
    Write-Host "=" * 50
    
    if (-not (Test-Path $BackupDir)) {
        Write-Host "❌ Backup directory not found: $BackupDir" -ForegroundColor Red
        return
    }
    
    $Backups = Get-ChildItem $BackupDir -Directory | 
               Where-Object { $_.Name -match "mcp-backup-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}" } |
               Sort-Object Name -Descending
    
    Write-Host "Total backups: $($Backups.Count)" -ForegroundColor Yellow
    
    if ($Backups.Count -gt 0) {
        Write-Host "`nRecent backups:" -ForegroundColor Yellow
        $Backups | Select-Object -First 5 | ForEach-Object {
            $Size = (Get-ChildItem $_.FullName -Recurse | Measure-Object -Property Length -Sum).Sum
            $SizeMB = [math]::Round($Size / 1MB, 2)
            Write-Host "  📁 $($_.Name) - $SizeMB MB - $($_.CreationTime)" -ForegroundColor Gray
        }
    }
}

# Main execution
Write-Host "🛠️  MCP Configuration Backup & Recovery Tool" -ForegroundColor Magenta
Write-Host "=" * 60

# Ensure backup directory exists
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Write-Host "📁 Created backup directory: $BackupDir" -ForegroundColor Green
}

switch ($Action.ToLower()) {
    "backup" {
        Create-Backup
        Show-BackupStatus
    }
    "restore" {
        Show-BackupStatus
        Write-Host "`nStarting restore process..." -ForegroundColor Yellow
        Restore-Backup
    }
    "cleanup" {
        Clean-OldBackups
        Show-BackupStatus
    }
    default {
        Write-Host "❌ Invalid action. Use: backup, restore, or cleanup" -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n🎉 Operation completed!" -ForegroundColor Green