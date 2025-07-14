// MCP Performance Monitor
// Monitors resource usage, response times, and server health

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class MCPPerformanceMonitor {
    constructor() {
        this.metrics = {
            timestamp: new Date().toISOString(),
            system: {},
            servers: {},
            performance: {}
        };
        this.logFile = 'C:\\Users\\leung\\Projects\\mcp-performance.log';
    }

    async collectSystemMetrics() {
        this.metrics.system = {
            platform: os.platform(),
            arch: os.arch(),
            nodeVersion: process.version,
            totalMemory: Math.round(os.totalmem() / 1024 / 1024) + ' MB',
            freeMemory: Math.round(os.freemem() / 1024 / 1024) + ' MB',
            cpuUsage: os.loadavg(),
            uptime: Math.round(os.uptime() / 3600) + ' hours'
        };
    }

    async testServerResponse(serverName, testCommand, timeout = 5000) {
        const start = Date.now();
        
        return new Promise((resolve) => {
            const child = exec(testCommand, { timeout }, (error, stdout, stderr) => {
                const duration = Date.now() - start;
                
                resolve({
                    server: serverName,
                    responseTime: duration,
                    success: !error,
                    error: error ? error.message : null,
                    stdout: stdout ? stdout.substring(0, 100) : null
                });
            });
        });
    }

    async benchmarkServers() {
        const serverTests = [
            {
                name: 'Desktop Commander',
                command: 'npx -y @wonderwhy-er/desktop-commander --version'
            },
            {
                name: 'Basic Memory',
                command: 'uvx basic-memory --version'
            },
            {
                name: 'Filesystem Server',
                command: 'npx -y @modelcontextprotocol/server-filesystem --version'
            },
            {
                name: 'Puppeteer Server',
                command: 'npx -y @modelcontextprotocol/server-puppeteer --version'
            },
            {
                name: 'Brave Search',
                command: 'npx -y @modelcontextprotocol/server-brave-search --version'
            }
        ];

        console.log('🔍 Benchmarking MCP Servers...');
        
        for (const test of serverTests) {
            console.log(`  Testing ${test.name}...`);
            const result = await this.testServerResponse(test.name, test.command);
            this.metrics.servers[test.name] = result;
            
            if (result.success) {
                console.log(`  ✅ ${test.name}: ${result.responseTime}ms`);
            } else {
                console.log(`  ❌ ${test.name}: Failed - ${result.error}`);
            }
        }
    }

    async checkConfigurationHealth() {
        const configPaths = [
            'C:\\Users\\leung\\AppData\\Roaming\\Claude\\claude_desktop_config.json',
            'C:\\Users\\leung\\claude-mcp-configs\\claude_desktop_config_complete.json'
        ];

        this.metrics.configuration = {};

        for (const configPath of configPaths) {
            try {
                if (fs.existsSync(configPath)) {
                    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                    const serverCount = Object.keys(config.mcpServers || {}).length;
                    
                    this.metrics.configuration[path.basename(configPath)] = {
                        exists: true,
                        serverCount,
                        hasGlobalSettings: !!config.globalSettings,
                        fileSize: fs.statSync(configPath).size
                    };
                } else {
                    this.metrics.configuration[path.basename(configPath)] = {
                        exists: false
                    };
                }
            } catch (error) {
                this.metrics.configuration[path.basename(configPath)] = {
                    exists: true,
                    error: error.message
                };
            }
        }
    }

    async analyzePerformance() {
        const serverResults = Object.values(this.metrics.servers);
        const successful = serverResults.filter(r => r.success);
        const failed = serverResults.filter(r => !r.success);
        
        if (successful.length > 0) {
            const responseTimes = successful.map(r => r.responseTime);
            this.metrics.performance = {
                totalServers: serverResults.length,
                successfulServers: successful.length,
                failedServers: failed.length,
                successRate: (successful.length / serverResults.length * 100).toFixed(1) + '%',
                averageResponseTime: Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) + 'ms',
                fastestServer: successful.reduce((min, server) => 
                    server.responseTime < min.responseTime ? server : min
                ).server,
                slowestServer: successful.reduce((max, server) => 
                    server.responseTime > max.responseTime ? server : max
                ).server
            };
        }
    }

    async generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 MCP PERFORMANCE REPORT');
        console.log('='.repeat(60));
        
        // System Information
        console.log('\n🖥️  SYSTEM INFORMATION:');
        console.log(`   Platform: ${this.metrics.system.platform} ${this.metrics.system.arch}`);
        console.log(`   Node.js: ${this.metrics.system.nodeVersion}`);
        console.log(`   Memory: ${this.metrics.system.freeMemory} free of ${this.metrics.system.totalMemory}`);
        console.log(`   Uptime: ${this.metrics.system.uptime}`);
        
        // Performance Summary
        if (this.metrics.performance.totalServers) {
            console.log('\n⚡ PERFORMANCE SUMMARY:');
            console.log(`   Success Rate: ${this.metrics.performance.successRate}`);
            console.log(`   Average Response: ${this.metrics.performance.averageResponseTime}`);
            console.log(`   Fastest Server: ${this.metrics.performance.fastestServer}`);
            console.log(`   Slowest Server: ${this.metrics.performance.slowestServer}`);
        }
        
        // Configuration Health
        console.log('\n⚙️  CONFIGURATION HEALTH:');
        Object.entries(this.metrics.configuration).forEach(([file, info]) => {
            if (info.exists && !info.error) {
                console.log(`   ✅ ${file}: ${info.serverCount} servers configured`);
            } else if (info.error) {
                console.log(`   ❌ ${file}: ${info.error}`);
            } else {
                console.log(`   ⚠️  ${file}: Not found`);
            }
        });
        
        // Server Details
        console.log('\n🔌 SERVER STATUS:');
        Object.entries(this.metrics.servers).forEach(([name, result]) => {
            if (result.success) {
                console.log(`   ✅ ${name}: ${result.responseTime}ms`);
            } else {
                console.log(`   ❌ ${name}: ${result.error}`);
            }
        });
        
        // Recommendations
        this.generateRecommendations();
        
        // Save detailed report
        this.saveReport();
    }

    generateRecommendations() {
        console.log('\n💡 PERFORMANCE RECOMMENDATIONS:');
        
        const avgResponseTime = parseInt(this.metrics.performance.averageResponseTime);
        if (avgResponseTime > 2000) {
            console.log('   • Response times are slow - consider caching or local installations');
        }
        
        const successRate = parseFloat(this.metrics.performance.successRate);
        if (successRate < 100) {
            console.log('   • Some servers are failing - check installations and network');
        }
        
        const freeMemory = parseInt(this.metrics.system.freeMemory);
        if (freeMemory < 1024) {
            console.log('   • Low memory detected - consider closing other applications');
        }
        
        console.log('   • Regular monitoring recommended');
        console.log('   • Consider setting up automated health checks');
    }

    saveReport() {
        const reportPath = 'C:\\Users\\leung\\Projects\\mcp-performance-report.json';
        fs.writeFileSync(reportPath, JSON.stringify(this.metrics, null, 2));
        
        // Append to log file
        const logEntry = `${new Date().toISOString()} - Performance: ${this.metrics.performance.successRate} success, ${this.metrics.performance.averageResponseTime} avg response\n`;
        fs.appendFileSync(this.logFile, logEntry);
        
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
        console.log(`📊 Performance log: ${this.logFile}`);
    }

    async run() {
        console.log('🚀 Starting MCP Performance Monitor...\n');
        
        await this.collectSystemMetrics();
        await this.benchmarkServers();
        await this.checkConfigurationHealth();
        await this.analyzePerformance();
        await this.generateReport();
        
        console.log('\n✨ Performance monitoring completed!');
    }
}

// Run the monitor
if (require.main === module) {
    const monitor = new MCPPerformanceMonitor();
    monitor.run().catch(console.error);
}

module.exports = MCPPerformanceMonitor;