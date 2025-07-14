-- Scene Object Database Schema
-- SQLite database for ChatGPT scene objects and prompts

-- Main scene objects table
CREATE TABLE IF NOT EXISTS scene_objects (
    id TEXT PRIMARY KEY,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    category TEXT NOT NULL,
    complexity TEXT NOT NULL,
    source TEXT NOT NULL,
    version TEXT NOT NULL,
    
    -- Prompt information
    prompt_text TEXT NOT NULL,
    prompt_type TEXT NOT NULL,
    prompt_word_count INTEGER,
    prompt_context TEXT,
    
    -- Scene object structure
    object_json TEXT NOT NULL,
    top_level_keys TEXT, -- JSON array of keys
    max_nesting_depth INTEGER,
    data_types TEXT, -- JSON object mapping keys to types
    
    -- Content analysis
    has_characters BOOLEAN DEFAULT FALSE,
    has_dialogue BOOLEAN DEFAULT FALSE,
    has_actions BOOLEAN DEFAULT FALSE,
    has_environment BOOLEAN DEFAULT FALSE,
    has_emotions BOOLEAN DEFAULT FALSE,
    estimated_word_count INTEGER,
    
    -- Quality metrics
    request_fulfillment REAL, -- 0-1 scale
    quality_score REAL, -- 0-10 scale
    
    -- File references
    file_path TEXT NOT NULL,
    
    -- Metadata
    tags TEXT, -- JSON array of tags
    insights TEXT, -- JSON array of insights
    patterns TEXT, -- JSON array of patterns
    
    -- Indexing
    created_date DATE GENERATED ALWAYS AS (DATE(created)) STORED,
    created_year INTEGER GENERATED ALWAYS AS (CAST(strftime('%Y', created) AS INTEGER)) STORED,
    created_month INTEGER GENERATED ALWAYS AS (CAST(strftime('%m', created) AS INTEGER)) STORED
);

-- Full-text search table
CREATE VIRTUAL TABLE IF NOT EXISTS scene_search USING fts5(
    id,
    prompt_text,
    object_content,
    category,
    tags,
    insights,
    content=scene_objects,
    content_rowid=rowid
);

-- Triggers to keep FTS in sync
CREATE TRIGGER IF NOT EXISTS scene_objects_ai AFTER INSERT ON scene_objects BEGIN
    INSERT INTO scene_search(rowid, id, prompt_text, object_content, category, tags, insights)
    VALUES (new.rowid, new.id, new.prompt_text, new.object_json, new.category, new.tags, new.insights);
END;

CREATE TRIGGER IF NOT EXISTS scene_objects_ad AFTER DELETE ON scene_objects BEGIN
    INSERT INTO scene_search(scene_search, rowid, id, prompt_text, object_content, category, tags, insights)
    VALUES ('delete', old.rowid, old.id, old.prompt_text, old.object_json, old.category, old.tags, old.insights);
END;

CREATE TRIGGER IF NOT EXISTS scene_objects_au AFTER UPDATE ON scene_objects BEGIN
    INSERT INTO scene_search(scene_search, rowid, id, prompt_text, object_content, category, tags, insights)
    VALUES ('delete', old.rowid, old.id, old.prompt_text, old.object_json, old.category, old.tags, old.insights);
    INSERT INTO scene_search(rowid, id, prompt_text, object_content, category, tags, insights)
    VALUES (new.rowid, new.id, new.prompt_text, new.object_json, new.category, new.tags, new.insights);
END;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_scene_category ON scene_objects(category);
CREATE INDEX IF NOT EXISTS idx_scene_complexity ON scene_objects(complexity);
CREATE INDEX IF NOT EXISTS idx_scene_source ON scene_objects(source);
CREATE INDEX IF NOT EXISTS idx_scene_created_date ON scene_objects(created_date);
CREATE INDEX IF NOT EXISTS idx_scene_quality ON scene_objects(quality_score);
CREATE INDEX IF NOT EXISTS idx_scene_fulfillment ON scene_objects(request_fulfillment);

-- Sample queries for reference
/*
-- Find all character interaction scenes
SELECT id, category, prompt_text, quality_score 
FROM scene_objects 
WHERE category = 'character-interaction' 
ORDER BY quality_score DESC;

-- Full-text search
SELECT id, prompt_text, rank 
FROM scene_search 
WHERE scene_search MATCH 'dialogue tension' 
ORDER BY rank;

-- Complex analysis query
SELECT 
    category,
    AVG(quality_score) as avg_quality,
    AVG(request_fulfillment) as avg_fulfillment,
    COUNT(*) as count
FROM scene_objects 
GROUP BY category 
ORDER BY avg_quality DESC;

-- Find similar prompts by word count
SELECT id, prompt_text, prompt_word_count
FROM scene_objects 
WHERE prompt_word_count BETWEEN ? - 5 AND ? + 5
ORDER BY ABS(prompt_word_count - ?) ASC;
*/