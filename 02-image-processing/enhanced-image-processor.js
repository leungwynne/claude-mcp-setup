// Enhanced Image-to-Scene Object Processor with Image Management
// Handles systematic image organization and database integration

const fs = require('fs');
const path = require('path');

class EnhancedImageProcessor {
    constructor() {
        this.inputPath = path.join(__dirname, 'input-images');
        this.processedPath = path.join(__dirname, 'processed-images');
        this.logsPath = path.join(__dirname, 'processing-logs');
        this.databasePath = '../01-data-libraries/scene-objects/reverse-engineered';
        
        this.categories = {
            portraits: 'portraits',
            products: 'products', 
            landscapes: 'landscapes',
            macro: 'macro',
            general: 'general'
        };
    }

    /**
     * Generate unique image ID with timestamp
     * @param {string} originalName - Original filename
     * @param {string} category - Image category
     */
    generateImageID(originalName, category = 'general') {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
        const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
        const cleanName = path.parse(originalName).name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const ext = path.extname(originalName);
        
        return `REV-${dateStr}-${timeStr}-${category}-${cleanName}${ext}`;
    }

    /**
     * Copy and rename image to processed folder
     * @param {string} originalFile - Original filename in input folder
     * @param {string} category - Detected/assigned category
     */
    archiveImage(originalFile, category) {
        const originalPath = path.join(this.inputPath, originalFile);
        const newImageID = this.generateImageID(originalFile, category);
        const categoryFolder = path.join(this.processedPath, category);
        const newPath = path.join(categoryFolder, newImageID);
        
        // Ensure category folder exists
        if (!fs.existsSync(categoryFolder)) {
            fs.mkdirSync(categoryFolder, { recursive: true });
        }
        
        // Copy file to new location
        fs.copyFileSync(originalPath, newPath);
        
        console.log(`📸 Archived: ${originalFile} → ${newImageID}`);
        
        return {
            originalName: originalFile,
            imageID: newImageID,
            category: category,
            filePath: path.relative(this.processedPath, newPath),
            fullPath: newPath,
            fileSize: fs.statSync(newPath).size,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Analyze image and auto-detect category
     * @param {string} filename - Image filename to analyze
     */
    detectCategory(filename) {
        const name = filename.toLowerCase();
        
        if (name.includes('portrait') || name.includes('headshot') || name.includes('person') || name.includes('face')) {
            return 'portraits';
        }
        if (name.includes('product') || name.includes('commercial') || name.includes('watch') || name.includes('bottle')) {
            return 'products';
        }
        if (name.includes('landscape') || name.includes('mountain') || name.includes('sunset') || name.includes('nature')) {
            return 'landscapes';
        }
        if (name.includes('macro') || name.includes('close') || name.includes('detail') || name.includes('texture')) {
            return 'macro';
        }
        
        return 'general';
    }

    /**
     * Process all images with enhanced tracking
     */
    async processAllImagesEnhanced() {
        console.log('🎬 Enhanced Image Processing with Systematic Organization...');
        
        const imageFiles = this.getImageFiles();
        if (imageFiles.length === 0) {
            console.log('📁 No images found in input folder');
            return [];
        }
        
        console.log(`Found ${imageFiles.length} images to process:`);
        imageFiles.forEach(file => console.log(`  📸 ${file}`));
        
        const processingSession = {
            sessionID: `SESSION-${new Date().toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '-')}`,
            startTime: new Date().toISOString(),
            totalImages: imageFiles.length,
            processedImages: [],
            errors: []
        };
        
        for (let i = 0; i < imageFiles.length; i++) {
            const imageFile = imageFiles[i];
            console.log(`\n[${i + 1}/${imageFiles.length}] Processing: ${imageFile}`);
            
            try {
                // Auto-detect category
                const category = this.detectCategory(imageFile);
                console.log(`  📋 Detected category: ${category}`);
                
                // Archive image with new ID
                const archiveInfo = this.archiveImage(imageFile, category);
                
                // Create processing instruction for ChatGPT automation
                const processingPlan = {
                    ...archiveInfo,
                    chatgptPrompt: this.generateChatGPTPrompt(),
                    processingStatus: 'ready-for-chatgpt',
                    sessionID: processingSession.sessionID
                };
                
                processingSession.processedImages.push(processingPlan);
                console.log(`  ✅ Ready for ChatGPT: ${archiveInfo.imageID}`);
                
            } catch (error) {
                console.error(`  ❌ Error processing ${imageFile}:`, error.message);
                processingSession.errors.push({
                    file: imageFile,
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
            }
        }
        
        // Save processing session log
        const logFile = path.join(this.logsPath, `${processingSession.sessionID}.json`);
        fs.writeFileSync(logFile, JSON.stringify(processingSession, null, 2));
        
        console.log(`\n📊 Processing Session Complete:`);
        console.log(`  Session ID: ${processingSession.sessionID}`);
        console.log(`  Images processed: ${processingSession.processedImages.length}`);
        console.log(`  Errors: ${processingSession.errors.length}`);
        console.log(`  Log saved: ${logFile}`);
        
        return processingSession;
    }

    /**
     * Generate ChatGPT prompt for image analysis
     */
    generateChatGPTPrompt() {
        return `I need you to analyze this image and provide two outputs:

1. **DETAILED SCENE OBJECT**: Create a comprehensive JSON scene object that captures every technical and creative detail needed to recreate this exact image. Include:
   - Camera settings and technical specifications
   - Lighting setup (type, direction, intensity, color temperature)
   - Subject details (pose, expression, wardrobe, props)
   - Environment description (location, background, architectural elements)
   - Composition and framing details
   - Color grading and post-processing notes
   - Any special effects or techniques used

2. **CHATGPT DALL-E PROMPT**: Create the hyperspecific text prompt that ChatGPT would use internally when sending instructions to DALL-E to recreate this exact image. Format it exactly as ChatGPT would structure it for its own image generation system, including all technical specifications and visual details that DALL-E needs.

Please structure the scene object as a properly formatted JSON with clear hierarchical organization. Be as technically precise as possible - imagine a photographer needs to recreate this exact image from your description.

Format your response like this:

**SCENE OBJECT:**
\`\`\`json
{
  // Your detailed scene object here
}
\`\`\`

**CHATGPT DALL-E PROMPT:**
\`\`\`
Your hyperspecific DALL-E prompt here (exactly as ChatGPT would format it)
\`\`\`

**TECHNICAL NOTES:**
Any additional observations or technical considerations`;
    }

    /**
     * Save ChatGPT results to database with image references
     * @param {object} archiveInfo - Image archive information
     * @param {object} chatgptResponse - ChatGPT analysis results
     */
    saveToDatabaseWithImageRef(archiveInfo, chatgptResponse) {
        const sceneObjectID = `reverse-${archiveInfo.imageID.replace(/\.[^/.]+$/, '')}`;
        
        const databaseEntry = {
            id: sceneObjectID,
            created: new Date().toISOString(),
            source: 'reverse-engineering-enhanced',
            
            // Image references (NO binary data)
            imageID: archiveInfo.imageID,
            originalImageName: archiveInfo.originalName,
            imagePath: archiveInfo.filePath,
            imageCategory: archiveInfo.category,
            imageFileSize: archiveInfo.fileSize,
            
            // ChatGPT analysis results
            sceneObject: chatgptResponse.sceneObject,
            dallePrompt: chatgptResponse.dallePrompt,
            technicalNotes: chatgptResponse.technicalNotes || '',
            
            // Metadata
            metadata: {
                category: archiveInfo.category,
                complexity: this.assessComplexity(chatgptResponse.sceneObject),
                quality_score: this.calculateQualityScore(chatgptResponse),
                processing_method: 'chatgpt-reverse-engineering-enhanced',
                processing_timestamp: new Date().toISOString(),
                sessionID: archiveInfo.sessionID
            }
        };
        
        // Save to reverse-engineered folder
        const dbDir = path.join(__dirname, this.databasePath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        
        const filename = `${sceneObjectID}.json`;
        const filepath = path.join(dbDir, filename);
        fs.writeFileSync(filepath, JSON.stringify(databaseEntry, null, 2));
        
        console.log(`💾 Saved to database: ${filename}`);
        console.log(`🖼️  Image reference: ${archiveInfo.imagePath}`);
        
        return databaseEntry;
    }

    /**
     * Get list of images ready for processing
     */
    getImageFiles() {
        if (!fs.existsSync(this.inputPath)) {
            fs.mkdirSync(this.inputPath, { recursive: true });
            return [];
        }
        
        const files = fs.readdirSync(this.inputPath);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];
        
        return files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });
    }

    assessComplexity(sceneObject) {
        const str = JSON.stringify(sceneObject);
        const keyCount = (str.match(/"/g) || []).length / 2;
        
        if (keyCount < 15) return 'simple';
        if (keyCount < 30) return 'medium';
        return 'complex';
    }

    calculateQualityScore(response) {
        let score = 5;
        
        if (response.sceneObject && Object.keys(response.sceneObject).length > 5) score += 2;
        if (response.dallePrompt && response.dallePrompt.length > 100) score += 1;
        if (response.technicalNotes && response.technicalNotes.length > 50) score += 1;
        if (JSON.stringify(response.sceneObject).includes('lighting')) score += 1;
        
        return Math.min(score, 10);
    }
}

module.exports = EnhancedImageProcessor;

// CLI Usage
if (require.main === module) {
    const processor = new EnhancedImageProcessor();
    
    console.log('🎬 Enhanced Image-to-Scene Object Processor');
    console.log('📁 Input folder:', processor.inputPath);
    console.log('🗄️ Processed images:', processor.processedPath);
    console.log('📊 Processing logs:', processor.logsPath);
    console.log('\n🚀 Run: processor.processAllImagesEnhanced()');
}
