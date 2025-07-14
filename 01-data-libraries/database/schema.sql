-- Scene Object Library Database Schema
-- SQLite database for storing ChatGPT scene objects with their prompts

-- Main scene objects table
CREATE TABLE IF NOT EXISTS scene_objects (
    id TEXT PRIMARY KEY,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    source TEXT DEFAULT 'chatgpt-4',
    version TEXT DEFAULT '1.0.0',
    category TEXT,
    complexity TEXT,
    
    -- Prompt information
    prompt_text TEXT NOT NULL,
    prompt_type TEXT,
    prompt_word_count INTEGER,
    prompt_context TEXT,
    
    -- Scene object structure
    scene_json TEXT NOT NULL,
    top_level_keys TEXT, -- JSON array as text
    max_nesting_depth INTEGER,
    estimated_word_count INTEGER,
    
    -- Content flags
    has_characters BOOLEAN DEFAULT FALSE,
    has_dialogue BOOLEAN DEFAULT FALSE,
    has_actions BOOLEAN DEFAULT FALSE,
    has_environment BOOLEAN DEFAULT FALSE,
    has_emotions BOOLEAN DEFAULT FALSE,
    has_technical_details BOOLEAN DEFAULT FALSE,
    
    -- Analysis scores
    quality_score REAL,
    request_fulfillment REAL,
    complexity_score REAL,
    
    -- File references
    json_file_path TEXT,
    
    -- Metadata
    tags TEXT, -- JSON array as text
    insights TEXT,
    patterns TEXT,
    notes TEXT
);

-- Full-text search table
CREATE VIRTUAL TABLE IF NOT EXISTS scene_search USING fts5(
    id,
    prompt_text,
    scene_content,
    category,
    tags,
    insights
);

-- Categories lookup
CREATE TABLE IF NOT EXISTS categories (
    name TEXT PRIMARY KEY,
    description TEXT,
    count INTEGER DEFAULT 0
);

-- Insert default categories
INSERT OR IGNORE INTO categories (name, description) VALUES 
('character-interaction', 'Scenes involving character interactions and relationships'),
('environment-description', 'Detailed environmental and setting descriptions'),
('action-sequence', 'Action scenes and movement descriptions'),
('dialogue-scene', 'Conversation and dialogue-focused scenes'),
('emotional-moment', 'Emotionally charged scenes and moments'),
('technical-description', 'Technical instructions and detailed specifications'),
('creative-narrative', 'Creative storytelling and narrative scenes'),
('instructional-content', 'Educational and instructional content'),
('other', 'Uncategorized or unique scene types');

-- Patterns tracking table
CREATE TABLE IF NOT EXISTS patterns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pattern_type TEXT, -- 'structural', 'content', 'naming', etc.
    pattern_description TEXT,
    examples TEXT, -- JSON array
    frequency INTEGER DEFAULT 1,
    first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_seen DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Similarity relationships
CREATE TABLE IF NOT EXISTS similarities (
    scene_id_1 TEXT,
    scene_id_2 TEXT,
    similarity_type TEXT, -- 'structural', 'content', 'prompt-style'
    similarity_score REAL,
    comparison_notes TEXT,
    FOREIGN KEY (scene_id_1) REFERENCES scene_objects(id),
    FOREIGN KEY (scene_id_2) REFERENCES scene_objects(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_scene_category ON scene_objects(category);
CREATE INDEX IF NOT EXISTS idx_scene_created ON scene_objects(created);
CREATE INDEX IF NOT EXISTS idx_scene_source ON scene_objects(source);
CREATE INDEX IF NOT EXISTS idx_scene_complexity ON scene_objects(complexity);
CREATE INDEX IF NOT EXISTS idx_scene_quality ON scene_objects(quality_score);

-- Views for easy querying
CREATE VIEW IF NOT EXISTS scene_summary AS
SELECT 
    id,
    created,
    category,
    complexity,
    LEFT(prompt_text, 100) || '...' as prompt_preview,
    quality_score,
    has_characters,
    has_dialogue,
    has_technical_details,
    json_file_path
FROM scene_objects
ORDER BY created DESC;

CREATE VIEW IF NOT EXISTS category_stats AS
SELECT 
    category,
    COUNT(*) as count,
    AVG(quality_score) as avg_quality,
    AVG(complexity_score) as avg_complexity,
    MAX(created) as latest_entry
FROM scene_objects 
WHERE category IS NOT NULL
GROUP BY category
ORDER BY count DESC;