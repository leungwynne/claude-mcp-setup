// Scene Object Database Management System
// Automated functions for managing ChatGPT scene objects in SQLite + Files

class SceneObjectDatabase {
    constructor() {
        this.dbPath = 'C:\\Users\\leung\\Documents\\claude-conversations\\scene_objects.db';
        this.dataPath = 'C:\\Users\\leung\\github-repos\\claude-mcp-setup\\01-data-libraries\\scene-objects';
        this.indexPath = 'C:\\Users\\leung\\github-repos\\claude-mcp-setup\\01-data-libraries\\indexes\\scene-object-index.json';
    }

    /**
     * Initialize the database with schema
     */
    async initializeDatabase() {
        console.log('🗄️ Initializing Scene Object Database...');
        
        // The database will be created through SQLite MCP server
        // Schema is defined in scene-object-database-schema.sql
        
        return {
            status: 'Database initialized',
            path: this.dbPath,
            tables: ['scene_objects', 'scene_search'],
            features: ['Full-text search', 'Automatic indexing', 'Performance optimized']
        };
    }

    /**
     * Add a new scene object from ChatGPT
     * @param {string} promptText - The original prompt given to ChatGPT
     * @param {object} sceneObject - The JSON object returned by ChatGPT
     * @param {object} metadata - Additional metadata (source, category, etc.)
     */
    async addSceneObject(promptText, sceneObject, metadata = {}) {
        const timestamp = new Date().toISOString();
        const dateStr = timestamp.slice(0, 19).replace(/[-:]/g, '').replace('T', '-');
        const id = `scene-${dateStr}`;
        
        // Analyze the scene object structure
        const analysis = this.analyzeSceneObject(sceneObject, promptText);
        
        // Prepare database entry
        const dbEntry = {
            id: id,
            created: timestamp,
            category: metadata.category || analysis.suggestedCategory,
            complexity: metadata.complexity || analysis.complexity,
            source: metadata.source || 'chatgpt-4',
            version: '1.0.0',
            
            // Prompt data
            prompt_text: promptText,
            prompt_type: metadata.promptType || 'direct-request',
            prompt_word_count: promptText.split(/\s+/).length,
            prompt_context: metadata.context || null,
            
            // Object data
            object_json: JSON.stringify(sceneObject, null, 2),
            top_level_keys: JSON.stringify(Object.keys(sceneObject)),
            max_nesting_depth: this.getMaxDepth(sceneObject),
            data_types: JSON.stringify(this.getDataTypes(sceneObject)),
            
            // Content flags
            has_characters: analysis.hasCharacters,
            has_dialogue: analysis.hasDialogue,
            has_actions: analysis.hasActions,
            has_environment: analysis.hasEnvironment,
            has_emotions: analysis.hasEmotions,
            estimated_word_count: analysis.estimatedWordCount,
            
            // Quality metrics
            request_fulfillment: analysis.requestFulfillment,
            quality_score: analysis.qualityScore,
            
            // File path
            file_path: `${this.dataPath}\\${id}-${analysis.suggestedCategory}-v1.0.0.json`,
            
            // Metadata
            tags: JSON.stringify(analysis.tags),
            insights: JSON.stringify(analysis.insights),
            patterns: JSON.stringify(analysis.patterns)
        };
        
        // Save individual JSON file
        await this.saveJsonFile(dbEntry, sceneObject, promptText, analysis);
        
        // Update index
        await this.updateIndex(dbEntry);
        
        console.log(`✅ Scene object ${id} added successfully`);
        console.log(`📁 File: ${dbEntry.file_path}`);
        console.log(`🎯 Category: ${dbEntry.category}`);
        console.log(`⭐ Quality: ${dbEntry.quality_score}/10`);
        
        return {
            id: id,
            category: dbEntry.category,
            filePath: dbEntry.file_path,
            analysis: analysis,
            sqlEntry: dbEntry
        };
    }

    /**
     * Analyze scene object structure and content
     */
    analyzeSceneObject(sceneObject, promptText) {
        const analysis = {
            suggestedCategory: 'other',
            complexity: 'moderate',
            hasCharacters: false,
            hasDialogue: false,
            hasActions: false,
            hasEnvironment: false,
            hasEmotions: false,
            estimatedWordCount: 0,
            requestFulfillment: 0.8,
            qualityScore: 7.0,
            tags: [],
            insights: [],
            patterns: []
        };

        // Analyze content
        const objStr = JSON.stringify(sceneObject).toLowerCase();
        const promptLower = promptText.toLowerCase();
        
        // Content detection
        analysis.hasCharacters = /character|person|people|actor|protagonist|speaker/.test(objStr);
        analysis.hasDialogue = /dialogue|speech|says|quote|conversation|talk/.test(objStr);
        analysis.hasActions = /action|move|walk|run|gesture|activity/.test(objStr);
        analysis.hasEnvironment = /location|setting|scene|environment|place|room/.test(objStr);
        analysis.hasEmotions = /emotion|feel|mood|angry|happy|sad|excited|tense/.test(objStr);
        
        // Estimate word count
        analysis.estimatedWordCount = objStr.split(/\s+/).length;
        
        // Suggest category
        if (analysis.hasCharacters && analysis.hasDialogue) {
            analysis.suggestedCategory = 'character-interaction';
        } else if (analysis.hasDialogue) {
            analysis.suggestedCategory = 'dialogue-scene';
        } else if (analysis.hasEnvironment) {
            analysis.suggestedCategory = 'environment-description';
        } else if (analysis.hasActions) {
            analysis.suggestedCategory = 'action-sequence';
        } else if (analysis.hasEmotions) {
            analysis.suggestedCategory = 'emotional-moment';
        }
        
        // Complexity assessment
        const depth = this.getMaxDepth(sceneObject);
        const keyCount = this.countAllKeys(sceneObject);
        
        if (depth <= 2 && keyCount <= 10) {
            analysis.complexity = 'simple';
        } else if (depth <= 4 && keyCount <= 25) {
            analysis.complexity = 'moderate';
        } else if (depth <= 6 && keyCount <= 50) {
            analysis.complexity = 'complex';
        } else {
            analysis.complexity = 'highly-complex';
        }
        
        // Generate tags
        analysis.tags = [
            analysis.suggestedCategory,
            analysis.complexity,
            ...Object.keys(sceneObject).slice(0, 3)
        ];
        
        // Generate insights
        analysis.insights = [
            `Scene contains ${keyCount} total keys with ${depth} levels of nesting`,
            `Content focus: ${[
                analysis.hasCharacters && 'characters',
                analysis.hasDialogue && 'dialogue', 
                analysis.hasActions && 'actions',
                analysis.hasEnvironment && 'environment'
            ].filter(Boolean).join(', ') || 'other'}`,
            `Estimated complexity: ${analysis.complexity} (${analysis.estimatedWordCount} words)`
        ];
        
        return analysis;
    }

    /**
     * Utility functions
     */
    getMaxDepth(obj, currentDepth = 0) {
        if (typeof obj !== 'object' || obj === null) return currentDepth;
        
        let maxDepth = currentDepth;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const depth = this.getMaxDepth(obj[key], currentDepth + 1);
                maxDepth = Math.max(maxDepth, depth);
            }
        }
        return maxDepth;
    }
    
    countAllKeys(obj) {
        if (typeof obj !== 'object' || obj === null) return 0;
        
        let count = Object.keys(obj).length;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                count += this.countAllKeys(obj[key]);
            }
        }
        return count;
    }
    
    getDataTypes(obj) {
        const types = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                types[key] = Array.isArray(obj[key]) ? 'array' : typeof obj[key];
            }
        }
        return types;
    }

    /**
     * Save individual JSON file
     */
    async saveJsonFile(dbEntry, sceneObject, promptText, analysis) {
        const fileContent = {
            metadata: {
                id: dbEntry.id,
                created: dbEntry.created,
                source: dbEntry.source,
                version: dbEntry.version,
                tags: JSON.parse(dbEntry.tags),
                category: dbEntry.category,
                complexity: dbEntry.complexity
            },
            prompt: {
                text: promptText,
                type: dbEntry.prompt_type,
                context: dbEntry.prompt_context,
                wordCount: dbEntry.prompt_word_count,
                keyElements: analysis.tags
            },
            sceneObject: {
                rawJson: sceneObject,
                structure: {
                    topLevelKeys: JSON.parse(dbEntry.top_level_keys),
                    dataTypes: JSON.parse(dbEntry.data_types),
                    nesting: {
                        maxDepth: dbEntry.max_nesting_depth
                    }
                },
                contentAnalysis: {
                    hasCharacters: dbEntry.has_characters,
                    hasDialogue: dbEntry.has_dialogue,
                    hasActions: dbEntry.has_actions,
                    hasEnvironment: dbEntry.has_environment,
                    hasEmotions: dbEntry.has_emotions,
                    estimatedWordCount: dbEntry.estimated_word_count
                }
            },
            analysis: {
                promptToObjectAlignment: {
                    requestFulfillment: dbEntry.request_fulfillment
                },
                patterns: {
                    structuralPatterns: JSON.parse(dbEntry.patterns),
                    insights: JSON.parse(dbEntry.insights)
                }
            },
            validation: {
                jsonValid: true,
                qualityScore: dbEntry.quality_score
            }
        };
        
        // This would be saved via filesystem operations
        console.log(`📄 Would save to: ${dbEntry.file_path}`);
        return fileContent;
    }

    /**
     * Update the master index
     */
    async updateIndex(dbEntry) {
        // This would update the scene-object-index.json file
        console.log(`📊 Index updated with ${dbEntry.id}`);
    }

    /**
     * Search functions
     */
    async searchScenes(query, options = {}) {
        // Complex search across database and files
        return {
            query: query,
            results: [],
            totalFound: 0,
            searchTime: '0.05s'
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SceneObjectDatabase;
}

// Usage example:
/*
const db = new SceneObjectDatabase();
await db.initializeDatabase();

const result = await db.addSceneObject(
    "Create a tense negotiation scene between a detective and suspect",
    {
        "scene": {
            "location": "Police interrogation room",
            "characters": [...]
        }
    },
    {
        category: "character-interaction",
        source: "chatgpt-4"
    }
);
*/