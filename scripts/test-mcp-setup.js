// MCP Server Testing and Validation Script
// Run with: node test-mcp-setup.js

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class MCPTester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            tests: []
        };
    }

    async runTest(name, testFunction) {
        console.log(`\n🧪 Testing: ${name}`);
        try {
            await testFunction();
            this.results.passed++;
            this.results.tests.push({ name, status: 'PASSED' });
            console.log(`✅ ${name}: PASSED`);
        } catch (error) {
            this.results.failed++;
            this.results.tests.push({ name, status: 'FAILED', error: error.message });
            console.log(`❌ ${name}: FAILED - ${error.message}`);
        }
    }

    async testDesktopCommander() {
        // Test Desktop Commander availability
        return new Promise((resolve, reject) => {
            exec('npx -y @wonderwhy-er/desktop-commander --version', (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(`Desktop Commander not available: ${error.message}`));
                } else {
                    resolve();
                }
            });
        });
    }

    async testBasicMemory() {
        // Test Basic Memory availability
        return new Promise((resolve, reject) => {
            exec('uvx basic-memory --version', (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(`Basic Memory not available: ${error.message}`));
                } else {
                    resolve();
                }
            });
        });
    }

    async testFileSystemAccess() {
        const testDir = 'C:\\Users\\leung\\Documents\\safe-workspace';
        if (!fs.existsSync(testDir)) {
            throw new Error(`Safe workspace directory doesn't exist: ${testDir}`);
        }
        
        // Test write permissions
        const testFile = path.join(testDir, 'mcp-test.txt');
        fs.writeFileSync(testFile, 'MCP Test File');
        
        if (!fs.existsSync(testFile)) {
            throw new Error('Cannot write to safe workspace directory');
        }
        
        // Cleanup
        fs.unlinkSync(testFile);
    }

    async testConfigurationValidity() {
        const configPath = 'C:\\Users\\leung\\AppData\\Roaming\\Claude\\claude_desktop_config_optimized.json';
        
        if (!fs.existsSync(configPath)) {
            throw new Error('Optimized configuration file not found');
        }
        
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        
        if (!config.mcpServers) {
            throw new Error('Configuration missing mcpServers section');
        }
        
        if (!config.globalSettings) {
            throw new Error('Configuration missing globalSettings section');
        }
    }

    async testServerAvailability() {
        const requiredServers = [
            '@modelcontextprotocol/server-filesystem',
            '@modelcontextprotocol/server-puppeteer',
            '@modelcontextprotocol/server-brave-search',
            '@modelcontextprotocol/server-git',
            '@modelcontextprotocol/server-sqlite'
        ];
        
        for (const server of requiredServers) {
            await new Promise((resolve, reject) => {
                exec(`npm list -g ${server}`, (error, stdout, stderr) => {
                    if (error && !stdout.includes(server)) {
                        reject(new Error(`Server ${server} not installed globally`));
                    } else {
                        resolve();
                    }
                });
            });
        }
    }

    async generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 MCP SETUP VALIDATION REPORT');
        console.log('='.repeat(60));
        console.log(`✅ Tests Passed: ${this.results.passed}`);
        console.log(`❌ Tests Failed: ${this.results.failed}`);
        console.log(`📈 Success Rate: ${((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(1)}%`);
        
        if (this.results.failed > 0) {
            console.log('\n🚨 FAILED TESTS:');
            this.results.tests
                .filter(test => test.status === 'FAILED')
                .forEach(test => {
                    console.log(`   • ${test.name}: ${test.error}`);
                });
        }
        
        console.log('\n💡 RECOMMENDATIONS:');
        if (this.results.failed === 0) {
            console.log('   • All tests passed! Your MCP setup is optimized.');
            console.log('   • Consider adding monitoring and backup procedures.');
        } else {
            console.log('   • Fix failed tests before proceeding with additional installations.');
            console.log('   • Check server installations and configuration files.');
        }
        
        // Save report to file
        const reportPath = 'C:\\Users\\leung\\Documents\\mcp-validation-report.json';
        fs.writeFileSync(reportPath, JSON.stringify({
            timestamp: new Date().toISOString(),
            results: this.results,
            recommendations: this.generateRecommendations()
        }, null, 2));
        
        console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.results.failed > 0) {
            recommendations.push('Fix failed tests before adding new MCP servers');
            recommendations.push('Verify all server installations are complete');
            recommendations.push('Check network connectivity for npm installations');
        }
        
        recommendations.push('Install additional recommended servers: PostgreSQL, GitHub, Google Drive');
        recommendations.push('Set up monitoring with Prometheus/Grafana');
        recommendations.push('Implement regular backup procedures for configurations');
        
        return recommendations;
    }

    async runAllTests() {
        console.log('🚀 Starting MCP Server Validation...\n');
        
        await this.runTest('Desktop Commander Availability', () => this.testDesktopCommander());
        await this.runTest('Basic Memory Availability', () => this.testBasicMemory());
        await this.runTest('File System Access', () => this.testFileSystemAccess());
        await this.runTest('Configuration Validity', () => this.testConfigurationValidity());
        await this.runTest('Required Servers Available', () => this.testServerAvailability());
        
        await this.generateReport();
    }
}

// Run the tests
if (require.main === module) {
    const tester = new MCPTester();
    tester.runAllTests().catch(console.error);
}

module.exports = MCPTester;