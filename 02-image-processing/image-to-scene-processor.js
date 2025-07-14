// Image-to-Scene Object Reverse Engineering System
// Automates ChatGPT image analysis and scene object extraction

const fs = require('fs');
const path = require('path');

class ImageToSceneProcessor {
    constructor() {
        this.inputPath = path.join(__dirname, 'input-images');
        this.outputPath = path.join(__dirname, 'processed-results');
        this.databasePath = '../01-data-libraries/scene-objects/reverse-engineered';
    }

    /**
     * Process all images in the input folder
     */
    async processAllImages() {
        console.log('🖼️ Starting Image-to-Scene Object Processing...');
        
        const imageFiles = this.getImageFiles();
        console.log(`Found ${imageFiles.length} images to process`);
        
        const results = [];
        
        for (const imageFile of imageFiles) {
            console.log(`\n📸 Processing: ${imageFile}`);
            
            try {
                const result = await this.processImage(imageFile);
                results.push(result);
                console.log(`✅ Successfully processed: ${imageFile}`);
            } catch (error) {
                console.error(`❌ Error processing ${imageFile}:`, error.message);
                results.push({
                    image: imageFile,
                    status: 'error',
                    error: error.message
                });
            }
        }
        
        return results;
    }

    /**
     * Get all image files from input directory
     */
    getImageFiles() {
        if (!fs.existsSync(this.inputPath)) {
            fs.mkdirSync(this.inputPath, { recursive: true });
            console.log(`📁 Created input directory: ${this.inputPath}`);
            return [];
        }
        
        const files = fs.readdirSync(this.inputPath);
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        
        return files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });
    }

    /**
     * Process a single image through ChatGPT
     * @param {string} imageFile - Filename of the image to process
     */
    async processImage(imageFile) {
        const imagePath = path.join(this.inputPath, imageFile);
        const timestamp = new Date().toISOString();
        
        // This will be executed in the new chat with ChatGPT automation
        const processingPlan = {
            imageFile: imageFile,
            imagePath: imagePath,
            timestamp: timestamp,
            steps: [
                '1. Upload image to ChatGPT',
                '2. Request detailed scene object analysis',
                '3. Request hybrid text prompt for recreation',
                '4. Extract structured data',
                '5. Save to database with metadata'
            ],
            chatgptPrompt: this.generateChatGPTPrompt(),
            expectedOutput: {
                sceneObject: 'Detailed JSON scene object',
                textPrompt: 'Hybrid text prompt for image generation',
                metadata: 'Analysis and processing information'
            }
        };
        
        // Save processing plan for the automation
        const planFile = path.join(this.outputPath, `${path.parse(imageFile).name}-processing-plan.json`);
        fs.writeFileSync(planFile, JSON.stringify(processingPlan, null, 2));
        
        return processingPlan;
    }

    /**
     * Generate the prompt to send to ChatGPT for image analysis
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

2. **HYBRID TEXT PROMPT**: Create a detailed text prompt that could be sent to an AI image generation model to recreate this image. Make it comprehensive but concise, focusing on the most important visual elements.

Please structure the scene object as a properly formatted JSON with clear hierarchical organization. Be as technically precise as possible - imagine a photographer needs to recreate this exact image from your description.

Format your response like this:

**SCENE OBJECT:**
\`\`\`json
{
  // Your detailed scene object here
}
\`\`\`

**HYBRID TEXT PROMPT:**
\`\`\`
Your comprehensive text prompt here
\`\`\`

**TECHNICAL NOTES:**
Any additional observations or technical considerations`;
    }

    /**
     * Process ChatGPT response and save to database
     * @param {string} imageFile - Original image filename
     * @param {object} chatgptResponse - Response from ChatGPT
     */
    async saveToDatabas(imageFile, chatgptResponse) {
        const timestamp = new Date().toISOString();
        const id = `reverse-${path.parse(imageFile).name}-${timestamp.slice(0, 10)}`;
        
        const databaseEntry = {
            id: id,
            created: timestamp,
            source: 'reverse-engineering',
            originalImage: imageFile,
            sceneObject: chatgptResponse.sceneObject,
            textPrompt: chatgptResponse.textPrompt,
            technicalNotes: chatgptResponse.technicalNotes || '',
            metadata: {
                category: this.categorizeFromImage(chatgptResponse.sceneObject),
                complexity: this.assessComplexity(chatgptResponse.sceneObject),
                quality_score: this.calculateQualityScore(chatgptResponse),
                processing_method: 'chatgpt-reverse-engineering',
                original_image_path: `02-image-processing/input-images/${imageFile}`
            }
        };
        
        // Ensure database directory exists
        const dbDir = path.join(__dirname, this.databasePath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        
        // Save individual JSON file
        const filename = `${id}.json`;
        const filepath = path.join(dbDir, filename);
        fs.writeFileSync(filepath, JSON.stringify(databaseEntry, null, 2));
        
        console.log(`💾 Saved to database: ${filename}`);
        return databaseEntry;
    }

    categorizeFromImage(sceneObject) {
        // Simple categorization logic - can be enhanced
        const objStr = JSON.stringify(sceneObject).toLowerCase();
        
        if (objStr.includes('portrait') || objStr.includes('headshot')) return 'portrait';
        if (objStr.includes('product') || objStr.includes('commercial')) return 'product';
        if (objStr.includes('landscape') || objStr.includes('environment')) return 'landscape';
        if (objStr.includes('macro') || objStr.includes('close-up')) return 'macro';
        if (objStr.includes('lifestyle') || objStr.includes('candid')) return 'lifestyle';
        
        return 'general';
    }

    assessComplexity(sceneObject) {
        const str = JSON.stringify(sceneObject);
        const keyCount = (str.match(/"/g) || []).length / 2;
        
        if (keyCount < 15) return 'simple';
        if (keyCount < 30) return 'medium';
        return 'complex';
    }

    calculateQualityScore(response) {
        let score = 5; // Base score
        
        if (response.sceneObject && Object.keys(response.sceneObject).length > 5) score += 2;
        if (response.textPrompt && response.textPrompt.length > 100) score += 1;
        if (response.technicalNotes && response.technicalNotes.length > 50) score += 1;
        if (JSON.stringify(response.sceneObject).includes('lighting')) score += 1;
        
        return Math.min(score, 10);
    }
}

module.exports = ImageToSceneProcessor;

// CLI usage
if (require.main === module) {
    const processor = new ImageToSceneProcessor();
    
    console.log('🎬 Image-to-Scene Object Processor');
    console.log('📁 Place images in:', processor.inputPath);
    console.log('📊 Results will be saved to:', processor.outputPath);
    console.log('\n🚀 Run processor.processAllImages() to start');
}
