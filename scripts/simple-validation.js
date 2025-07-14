// Simple MCP Validation Script
console.log('🔍 Validating MCP Setup...\n');

const fs = require('fs');
const path = require('path');

// Check Configuration Files
console.log('📋 Configuration Files:');
const configFiles = [
    'C:\\Users\\leung\\AppData\\Roaming\\Claude\\claude_desktop_config.json',
    'C:\\Users\\leung\\claude-mcp-configs\\claude_desktop_config_complete.json'
];

configFiles.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            const config = JSON.parse(fs.readFileSync(file, 'utf8'));
            const serverCount = Object.keys(config.mcpServers || {}).length;
            console.log(`  ✅ ${path.basename(file)}: ${serverCount} servers configured`);
        } catch (error) {
            console.log(`  ❌ ${path.basename(file)}: Invalid JSON - ${error.message}`);
        }
    } else {
        console.log(`  ⚠️  ${path.basename(file)}: Not found`);
    }
});

// Check Directories
console.log('\n📁 Required Directories:');
const requiredDirs = [
    'C:\\Users\\leung\\Documents\\safe-workspace',
    'C:\\Users\\leung\\Projects',
    'C:\\Users\\leung\\claude-mcp-configs'
];

requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`  ✅ ${path.basename(dir)}: Exists`);
    } else {
        console.log(`  ❌ ${path.basename(dir)}: Missing`);
    }
});

// Check Basic Memory Status
console.log('\n🧠 Basic Memory Status:');
const memoryDir = path.join(process.env.USERPROFILE, '.basic_memory');
if (fs.existsSync(memoryDir)) {
    console.log(`  ✅ Basic Memory directory exists`);
} else {
    console.log(`  ⚠️  Basic Memory directory not found`);
}

console.log('\n✨ Validation completed!');
console.log('\n💡 Next Steps:');
console.log('  1. Restart Claude Desktop');
console.log('  2. Install additional servers: powershell C:\\Users\\leung\\Projects\\install-mcp-servers.ps1');
console.log('  3. Run performance monitor: node C:\\Users\\leung\\Projects\\mcp-performance-monitor.js');
console.log('  4. Create backup: powershell C:\\Users\\leung\\Projects\\mcp-backup-recovery.ps1 -Action backup');