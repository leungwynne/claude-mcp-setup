// ChatGPT Scene Object Processor
// Process extracted ChatGPT scene objects into the database system

const fs = require('fs');
const path = require('path');

// Extracted ChatGPT Scene Objects from "Confident Modern Professional" shoot
const chatGPTSceneObjects = [
    {
        prompt: "Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file",
        sceneObject: {
            scene_id: "scene_b_set2",
            subject: "primary_executive",
            wardrobe: "soft_gray_cashmere_v_neck_sweater",
            pose: "seated sideways on a windowsill, back straight, gaze looking out the window",
            expression: "calm, thoughtful, reflective",
            environment: {
                location: "modern_industrial_loft_apartment",
                wall_color: "sage_green_matte",
                windows: "large_black_grid_industrial_style",
                flooring: "natural_hardwood_warm_tones"
            },
            lighting: {
                color_temperature: "5200K_true_neutral_daylight",
                source: "soft_window_light_45_degrees",
                intensity: "75_percent_natural_light",
                shadow_behavior: "15_percent_opacity_soft_edges",
                diffusion: "sheer_material",
                enforcement: "NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true."
            }
        },
        metadata: {
            source: "chatgpt-4",
            brand_context: "Confident Modern Professional",
            url: "https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6",
            extracted_date: "2025-07-14",
            category: "portrait-professional"
        }
    },
    {
        prompt: "Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file",
        sceneObject: {
            scene_id: "scene_a_set2",
            subject: "primary_executive",
            wardrobe: "crisp_white_oversized_cotton_button_down_sleeves_rolled",
            pose: "standing with arms crossed near sage green wall",
            expression: "calm confidence, relaxed posture, slight smile",
            environment: {
                location: "modern_industrial_loft_apartment",
                wall_color: "sage_green_matte",
                architectural_elements: ["exposed_wood_beam"]
            },
            lighting: {
                color_temperature: "5200K_true_neutral_daylight",
                source: "soft_window_light_45_degrees",
                intensity: "75_percent_natural_light",
                shadow_behavior: "15_percent_opacity_soft_edges",
                diffusion: "sheer_material",
                enforcement: "NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true."
            }
        },
        metadata: {
            source: "chatgpt-4",
            brand_context: "Confident Modern Professional",
            url: "https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6",
            extracted_date: "2025-07-14",
            category: "portrait-professional"
        }
    },
    {
        prompt: "Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file",
        sceneObject: {
            scene_id: "scene_c_set2",
            subject: "primary_executive",
            wardrobe: "soft_gray_cashmere_v_neck_sweater",
            pose: "walking mid-stride through loft space with laptop in one hand",
            expression: "approachable, confident smile toward someone off frame",
            environment: {
                location: "modern_industrial_loft_apartment",
                wall_color: "sage_green_matte",
                architectural_elements: ["large_black_grid_industrial_windows", "exposed_brick", "natural_hardwood_floors"]
            },
            lighting: {
                color_temperature: "5200K_true_neutral_daylight",
                source: "soft_window_light_45_degrees",
                intensity: "75_percent_natural_light",
                shadow_behavior: "15_percent_opacity_soft_edges",
                diffusion: "sheer_material",
                enforcement: "NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true."
            }
        },
        metadata: {
            source: "chatgpt-4",
            brand_context: "Confident Modern Professional",
            url: "https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6",
            extracted_date: "2025-07-14",
            category: "lifestyle-professional"
        }
    },
    {
        prompt: "Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file",
        sceneObject: {
            scene_id: "scene_d_set2",
            subjects: ["primary_executive", "supporting_professional_b"],
            wardrobe: {
                primary_executive: "soft_gray_cashmere_v_neck_sweater",
                supporting_professional_b: "coral_blouse_warm_approachable_sophisticated"
            },
            environment: {
                location: "modern_industrial_loft_apartment",
                wall_color: "sage_green_matte",
                architectural_elements: ["exposed_brick", "black_grid_window"]
            },
            accessories: {
                primary_executive: ["delicate_gold_chain_necklace", "small_gold_hoop_earrings"],
                supporting_professional_b: ["rose_gold_geometric_necklace"]
            },
            lighting: {
                color_temperature: "5200K_true_neutral_daylight",
                source: "soft_window_light_45_degrees",
                intensity: "75_percent_natural_light",
                shadow_behavior: "15_percent_opacity_soft_edges",
                diffusion: "sheer_material",
                enforcement: "NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Coral blouse must render correctly. Sage wall must appear true."
            }
        },
        metadata: {
            source: "chatgpt-4",
            brand_context: "Confident Modern Professional",
            url: "https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6",
            extracted_date: "2025-07-14",
            category: "collaboration-professional"
        }
    },
    {
        prompt: "Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file",
        sceneObject: {
            scene_id: "macro_water_droplets_abstract",
            subject: "macro_water_droplets",
            camera: {
                lens: "100mm_macro_lens",
                focus_mode: "manual_focus_on_surface_tension_edges",
                aperture: "f/8",
                depth_of_field: "shallow_with_smooth_falloff",
                framing: "top_down_flatlay",
                composition: "asymmetrical_group_of_five_droplets"
            },
            surface: {
                material: "smooth_frosted_glass",
                color: "cool_gray",
                reflectivity: "subtle_matte_reflectivity",
                texture: "non-visible, ultra-polished"
            },
            liquid_properties: {
                type: "pure_water",
                shape_behavior: "natural_surface_tension_dome_shapes",
                edge_definition: "clean_soft_rounded_margins"
            },
            lighting: {
                type: "soft_diffused_backlight",
                angle: "top_left_45_degrees",
                shadow_behavior: "feathered_gradual_shadow_under_each_droplet",
                highlights: "subtle_specular_glow_on_top_surface",
                color_temperature: "5400K_studio_daylight",
                enforcement: "NO color tinting, NO warmth bias. Surfaces must appear neutral gray, and water must read clear and dimensional."
            },
            style_reference: {
                mood: "abstract_minimalist",
                emotion: "calm_precision",
                inspiration: "product_macro_photography",
                background: "gradient_gray_cool_tone"
            }
        },
        metadata: {
            source: "chatgpt-4",
            brand_context: "Confident Modern Professional",
            url: "https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6",
            extracted_date: "2025-07-14",
            category: "macro-abstract"
        }
    }
];

// Analysis functions
function analyzeSceneStructure(sceneObject) {
    const keys = Object.keys(sceneObject);
    const depth = getObjectDepth(sceneObject);
    const complexity = calculateComplexity(sceneObject);
    
    return {
        topLevelKeys: keys,
        depth: depth,
        complexity: complexity,
        hasLighting: keys.includes('lighting'),
        hasEnvironment: keys.includes('environment'),
        hasCamera: keys.includes('camera'),
        subjectType: sceneObject.subject || (sceneObject.subjects ? 'multiple' : 'unknown')
    };
}

function getObjectDepth(obj) {
    if (typeof obj !== 'object' || obj === null) return 0;
    return 1 + Math.max(0, ...Object.values(obj).map(getObjectDepth));
}

function calculateComplexity(obj) {
    const str = JSON.stringify(obj);
    const keyCount = (str.match(/"/g) || []).length / 2;
    if (keyCount < 10) return 'simple';
    if (keyCount < 20) return 'medium';
    return 'complex';
}

function categorizeScene(sceneObject, metadata) {
    if (sceneObject.scene_id && sceneObject.scene_id.includes('macro')) {
        return 'macro-abstract';
    }
    
    if (sceneObject.subjects && Array.isArray(sceneObject.subjects)) {
        return 'collaboration-professional';
    }
    
    if (sceneObject.pose && sceneObject.pose.includes('walking')) {
        return 'lifestyle-professional';
    }
    
    if (sceneObject.pose && (sceneObject.pose.includes('standing') || sceneObject.pose.includes('seated'))) {
        return 'portrait-professional';
    }
    
    return metadata.category || 'general';
}

// Process all scene objects
function processAllScenes() {
    console.log('🎬 Processing ChatGPT Scene Objects...');
    
    const results = chatGPTSceneObjects.map((item, index) => {
        const analysis = analyzeSceneStructure(item.sceneObject);
        const category = categorizeScene(item.sceneObject, item.metadata);
        
        const processed = {
            id: `chatgpt-${item.sceneObject.scene_id || `scene-${index + 1}`}`,
            prompt: item.prompt,
            sceneObject: item.sceneObject,
            metadata: {
                ...item.metadata,
                category: category,
                structure_analysis: analysis,
                processing_date: new Date().toISOString()
            }
        };
        
        console.log(`✅ Processed: ${processed.id} (${category})`);
        return processed;
    });
    
    return results;
}

// Export for use with the database manager
module.exports = {
    chatGPTSceneObjects,
    processAllScenes,
    analyzeSceneStructure,
    categorizeScene
};

// If run directly, process and display results
if (require.main === module) {
    const results = processAllScenes();
    
    console.log('\n📊 Processing Summary:');
    console.log(`Total scenes processed: ${results.length}`);
    
    const categories = {};
    results.forEach(r => {
        categories[r.metadata.category] = (categories[r.metadata.category] || 0) + 1;
    });
    
    console.log('Categories:');
    Object.entries(categories).forEach(([cat, count]) => {
        console.log(`  ${cat}: ${count}`);
    });
    
    console.log('\n🚀 Ready for database insertion!');
}