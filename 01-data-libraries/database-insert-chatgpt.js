// Database Insertion Script for ChatGPT Scene Objects
// Insert processed scene objects into SQLite database

const fs = require('fs');
const path = require('path');

// Database configuration (for SQLite MCP server)
const DB_CONFIG = {
    dbPath: 'C:\\Users\\leung\\Documents\\claude-conversations\\scene_objects.db',
    dataPath: 'C:\\Users\\leung\\github-repos\\claude-mcp-setup\\01-data-libraries\\scene-objects\\chatgpt-confident-modern-professional'
};

// Read all scene object files
function loadSceneObjects() {
    const files = fs.readdirSync(DB_CONFIG.dataPath)
        .filter(file => file.endsWith('.json') && file !== 'dataset-index.json');
    
    const sceneObjects = [];
    
    files.forEach(file => {
        const filePath = path.join(DB_CONFIG.dataPath, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        sceneObjects.push(content);
    });
    
    return sceneObjects;
}

// Generate SQL INSERT statements
function generateInsertSQL(sceneObjects) {
    const insertStatements = [];
    
    sceneObjects.forEach(obj => {
        // Main scene_objects table insert
        const mainInsert = `
INSERT INTO scene_objects (
    id,
    created_date,
    category,
    complexity,
    source,
    version,
    prompt_text,
    scene_json,
    metadata_json,
    quality_score,
    structure_analysis,
    file_path
) VALUES (
    '${obj.id}',
    '${obj.created}',
    '${obj.metadata.category}',
    '${obj.metadata.structure_analysis.complexity}',
    '${obj.metadata.source}',
    '1.0.0',
    '${obj.prompt.replace(/'/g, "''")}',
    '${JSON.stringify(obj.sceneObject).replace(/'/g, "''")}',
    '${JSON.stringify(obj.metadata).replace(/'/g, "''")}',
    ${obj.metadata.quality_score},
    '${JSON.stringify(obj.metadata.structure_analysis).replace(/'/g, "''")}',
    'scene-objects/chatgpt-confident-modern-professional/${obj.id.replace("chatgpt-", "")}.json'
);`;

        // FTS search table insert  
        const searchInsert = `
INSERT INTO scene_search (
    scene_id,
    content
) VALUES (
    '${obj.id}',
    '${obj.prompt.replace(/'/g, "''")} ${JSON.stringify(obj.sceneObject).replace(/'/g, "''").replace(/[{}",]/g, ' ')}'
);`;

        insertStatements.push(mainInsert);
        insertStatements.push(searchInsert);
    });
    
    return insertStatements;
}

// Main execution
function main() {
    try {
        console.log('📊 Loading scene objects...');
        const sceneObjects = loadSceneObjects();
        console.log(`✅ Loaded ${sceneObjects.length} scene objects`);
        
        console.log('🗄️ Generating SQL statements...');
        const sqlStatements = generateInsertSQL(sceneObjects);
        console.log(`✅ Generated ${sqlStatements.length} SQL statements`);
        
        // Write SQL file for manual execution
        const sqlContent = [
            '-- ChatGPT Scene Objects Database Insertion',
            '-- Generated: ' + new Date().toISOString(),
            '-- Source: https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6',
            '',
            'BEGIN TRANSACTION;',
            '',
            ...sqlStatements,
            '',
            'COMMIT;',
            '',
            '-- Verify insertion',
            'SELECT COUNT(*) as total_scenes FROM scene_objects;',
            'SELECT category, COUNT(*) as count FROM scene_objects GROUP BY category;'
        ].join('\n');
        
        const sqlFile = path.join(__dirname, 'chatgpt-scene-objects-insert.sql');
        fs.writeFileSync(sqlFile, sqlContent);
        
        console.log(`✅ SQL file created: ${sqlFile}`);
        console.log('\n📋 Summary:');
        console.log(`   • Total scenes: ${sceneObjects.length}`);
        console.log(`   • SQL statements: ${sqlStatements.length}`);
        console.log(`   • Ready for database insertion`);
        
        // Also create a verification script
        const verification = {
            timestamp: new Date().toISOString(),
            total_scenes: sceneObjects.length,
            categories: {},
            files_processed: sceneObjects.map(obj => obj.id)
        };
        
        sceneObjects.forEach(obj => {
            const cat = obj.metadata.category;
            verification.categories[cat] = (verification.categories[cat] || 0) + 1;
        });
        
        fs.writeFileSync(
            path.join(__dirname, 'insertion-verification.json'),
            JSON.stringify(verification, null, 2)
        );
        
        console.log('\n🎯 Next Steps:');
        console.log('1. Use SQLite MCP server to execute the SQL file');
        console.log('2. Verify data with: SELECT * FROM scene_objects LIMIT 5;');
        console.log('3. Test search with: SELECT * FROM scene_search WHERE content MATCH "professional";');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Export for use as module
module.exports = {
    loadSceneObjects,
    generateInsertSQL,
    main
};

// Run if called directly
if (require.main === module) {
    main();
}
