-- ChatGPT Scene Objects Database Insertion
-- Generated: 2025-07-14T20:58:58.234Z
-- Source: https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6

BEGIN TRANSACTION;


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
    'chatgpt-macro_water_droplets_abstract',
    '2025-07-14T17:30:00.000Z',
    'macro-abstract',
    'complex',
    'chatgpt-4',
    '1.0.0',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file',
    '{"scene_id":"macro_water_droplets_abstract","subject":"macro_water_droplets","camera":{"lens":"100mm_macro_lens","focus_mode":"manual_focus_on_surface_tension_edges","aperture":"f/8","depth_of_field":"shallow_with_smooth_falloff","framing":"top_down_flatlay","composition":"asymmetrical_group_of_five_droplets"},"surface":{"material":"smooth_frosted_glass","color":"cool_gray","reflectivity":"subtle_matte_reflectivity","texture":"non-visible, ultra-polished"},"liquid_properties":{"type":"pure_water","shape_behavior":"natural_surface_tension_dome_shapes","edge_definition":"clean_soft_rounded_margins"},"lighting":{"type":"soft_diffused_backlight","angle":"top_left_45_degrees","shadow_behavior":"feathered_gradual_shadow_under_each_droplet","highlights":"subtle_specular_glow_on_top_surface","color_temperature":"5400K_studio_daylight","enforcement":"NO color tinting, NO warmth bias. Surfaces must appear neutral gray, and water must read clear and dimensional."},"style_reference":{"mood":"abstract_minimalist","emotion":"calm_precision","inspiration":"product_macro_photography","background":"gradient_gray_cool_tone"}}',
    '{"source":"chatgpt-4","brand_context":"Confident Modern Professional","url":"https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6","extracted_date":"2025-07-14","category":"macro-abstract","structure_analysis":{"topLevelKeys":["scene_id","subject","camera","surface","liquid_properties","lighting","style_reference"],"depth":3,"complexity":"complex","hasLighting":true,"hasEnvironment":false,"hasCamera":true,"subjectType":"macro_water_droplets"},"quality_score":10,"processing_date":"2025-07-14T17:30:00.000Z"}',
    10,
    '{"topLevelKeys":["scene_id","subject","camera","surface","liquid_properties","lighting","style_reference"],"depth":3,"complexity":"complex","hasLighting":true,"hasEnvironment":false,"hasCamera":true,"subjectType":"macro_water_droplets"}',
    'scene-objects/chatgpt-confident-modern-professional/macro_water_droplets_abstract.json'
);

INSERT INTO scene_search (
    scene_id,
    content
) VALUES (
    'chatgpt-macro_water_droplets_abstract',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file   scene_id : macro_water_droplets_abstract   subject : macro_water_droplets   camera :  lens : 100mm_macro_lens   focus_mode : manual_focus_on_surface_tension_edges   aperture : f/8   depth_of_field : shallow_with_smooth_falloff   framing : top_down_flatlay   composition : asymmetrical_group_of_five_droplets    surface :  material : smooth_frosted_glass   color : cool_gray   reflectivity : subtle_matte_reflectivity   texture : non-visible  ultra-polished    liquid_properties :  type : pure_water   shape_behavior : natural_surface_tension_dome_shapes   edge_definition : clean_soft_rounded_margins    lighting :  type : soft_diffused_backlight   angle : top_left_45_degrees   shadow_behavior : feathered_gradual_shadow_under_each_droplet   highlights : subtle_specular_glow_on_top_surface   color_temperature : 5400K_studio_daylight   enforcement : NO color tinting  NO warmth bias. Surfaces must appear neutral gray  and water must read clear and dimensional.    style_reference :  mood : abstract_minimalist   emotion : calm_precision   inspiration : product_macro_photography   background : gradient_gray_cool_tone   '
);

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
    'chatgpt-scene_a_set2',
    '2025-07-14T17:30:00.000Z',
    'portrait-professional',
    'medium',
    'chatgpt-4',
    '1.0.0',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file',
    '{"scene_id":"scene_a_set2","subject":"primary_executive","wardrobe":"crisp_white_oversized_cotton_button_down_sleeves_rolled","pose":"standing with arms crossed near sage green wall","expression":"calm confidence, relaxed posture, slight smile","environment":{"location":"modern_industrial_loft_apartment","wall_color":"sage_green_matte","architectural_elements":["exposed_wood_beam"]},"lighting":{"color_temperature":"5200K_true_neutral_daylight","source":"soft_window_light_45_degrees","intensity":"75_percent_natural_light","shadow_behavior":"15_percent_opacity_soft_edges","diffusion":"sheer_material","enforcement":"NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true."}}',
    '{"source":"chatgpt-4","brand_context":"Confident Modern Professional","url":"https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6","extracted_date":"2025-07-14","category":"portrait-professional","structure_analysis":{"topLevelKeys":["scene_id","subject","wardrobe","pose","expression","environment","lighting"],"depth":3,"complexity":"medium","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"primary_executive"},"quality_score":9,"processing_date":"2025-07-14T17:30:00.000Z"}',
    9,
    '{"topLevelKeys":["scene_id","subject","wardrobe","pose","expression","environment","lighting"],"depth":3,"complexity":"medium","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"primary_executive"}',
    'scene-objects/chatgpt-confident-modern-professional/scene_a_set2.json'
);

INSERT INTO scene_search (
    scene_id,
    content
) VALUES (
    'chatgpt-scene_a_set2',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file   scene_id : scene_a_set2   subject : primary_executive   wardrobe : crisp_white_oversized_cotton_button_down_sleeves_rolled   pose : standing with arms crossed near sage green wall   expression : calm confidence  relaxed posture  slight smile   environment :  location : modern_industrial_loft_apartment   wall_color : sage_green_matte   architectural_elements :[ exposed_wood_beam ]   lighting :  color_temperature : 5200K_true_neutral_daylight   source : soft_window_light_45_degrees   intensity : 75_percent_natural_light   shadow_behavior : 15_percent_opacity_soft_edges   diffusion : sheer_material   enforcement : NO yellow  orange  or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true.   '
);

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
    'chatgpt-scene_b_set2',
    '2025-07-14T17:30:00.000Z',
    'portrait-professional',
    'medium',
    'chatgpt-4',
    '1.0.0',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file',
    '{"scene_id":"scene_b_set2","subject":"primary_executive","wardrobe":"soft_gray_cashmere_v_neck_sweater","pose":"seated sideways on a windowsill, back straight, gaze looking out the window","expression":"calm, thoughtful, reflective","environment":{"location":"modern_industrial_loft_apartment","wall_color":"sage_green_matte","windows":"large_black_grid_industrial_style","flooring":"natural_hardwood_warm_tones"},"lighting":{"color_temperature":"5200K_true_neutral_daylight","source":"soft_window_light_45_degrees","intensity":"75_percent_natural_light","shadow_behavior":"15_percent_opacity_soft_edges","diffusion":"sheer_material","enforcement":"NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true."}}',
    '{"source":"chatgpt-4","brand_context":"Confident Modern Professional","url":"https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6","extracted_date":"2025-07-14","category":"portrait-professional","structure_analysis":{"topLevelKeys":["scene_id","subject","wardrobe","pose","expression","environment","lighting"],"depth":3,"complexity":"medium","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"primary_executive"},"quality_score":9,"processing_date":"2025-07-14T17:30:00.000Z"}',
    9,
    '{"topLevelKeys":["scene_id","subject","wardrobe","pose","expression","environment","lighting"],"depth":3,"complexity":"medium","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"primary_executive"}',
    'scene-objects/chatgpt-confident-modern-professional/scene_b_set2.json'
);

INSERT INTO scene_search (
    scene_id,
    content
) VALUES (
    'chatgpt-scene_b_set2',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file   scene_id : scene_b_set2   subject : primary_executive   wardrobe : soft_gray_cashmere_v_neck_sweater   pose : seated sideways on a windowsill  back straight  gaze looking out the window   expression : calm  thoughtful  reflective   environment :  location : modern_industrial_loft_apartment   wall_color : sage_green_matte   windows : large_black_grid_industrial_style   flooring : natural_hardwood_warm_tones    lighting :  color_temperature : 5200K_true_neutral_daylight   source : soft_window_light_45_degrees   intensity : 75_percent_natural_light   shadow_behavior : 15_percent_opacity_soft_edges   diffusion : sheer_material   enforcement : NO yellow  orange  or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true.   '
);

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
    'chatgpt-scene_c_set2',
    '2025-07-14T17:30:00.000Z',
    'lifestyle-professional',
    'medium',
    'chatgpt-4',
    '1.0.0',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file',
    '{"scene_id":"scene_c_set2","subject":"primary_executive","wardrobe":"soft_gray_cashmere_v_neck_sweater","pose":"walking mid-stride through loft space with laptop in one hand","expression":"approachable, confident smile toward someone off frame","environment":{"location":"modern_industrial_loft_apartment","wall_color":"sage_green_matte","architectural_elements":["large_black_grid_industrial_windows","exposed_brick","natural_hardwood_floors"]},"lighting":{"color_temperature":"5200K_true_neutral_daylight","source":"soft_window_light_45_degrees","intensity":"75_percent_natural_light","shadow_behavior":"15_percent_opacity_soft_edges","diffusion":"sheer_material","enforcement":"NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true."}}',
    '{"source":"chatgpt-4","brand_context":"Confident Modern Professional","url":"https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6","extracted_date":"2025-07-14","category":"lifestyle-professional","structure_analysis":{"topLevelKeys":["scene_id","subject","wardrobe","pose","expression","environment","lighting"],"depth":3,"complexity":"medium","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"primary_executive"},"quality_score":9,"processing_date":"2025-07-14T17:30:00.000Z"}',
    9,
    '{"topLevelKeys":["scene_id","subject","wardrobe","pose","expression","environment","lighting"],"depth":3,"complexity":"medium","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"primary_executive"}',
    'scene-objects/chatgpt-confident-modern-professional/scene_c_set2.json'
);

INSERT INTO scene_search (
    scene_id,
    content
) VALUES (
    'chatgpt-scene_c_set2',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file   scene_id : scene_c_set2   subject : primary_executive   wardrobe : soft_gray_cashmere_v_neck_sweater   pose : walking mid-stride through loft space with laptop in one hand   expression : approachable  confident smile toward someone off frame   environment :  location : modern_industrial_loft_apartment   wall_color : sage_green_matte   architectural_elements :[ large_black_grid_industrial_windows   exposed_brick   natural_hardwood_floors ]   lighting :  color_temperature : 5200K_true_neutral_daylight   source : soft_window_light_45_degrees   intensity : 75_percent_natural_light   shadow_behavior : 15_percent_opacity_soft_edges   diffusion : sheer_material   enforcement : NO yellow  orange  or warm cast. Whites must appear neutral. Skin tones must be balanced. Sage wall must appear true.   '
);

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
    'chatgpt-scene_d_set2',
    '2025-07-14T17:30:00.000Z',
    'collaboration-professional',
    'complex',
    'chatgpt-4',
    '1.0.0',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file',
    '{"scene_id":"scene_d_set2","subjects":["primary_executive","supporting_professional_b"],"wardrobe":{"primary_executive":"soft_gray_cashmere_v_neck_sweater","supporting_professional_b":"coral_blouse_warm_approachable_sophisticated"},"environment":{"location":"modern_industrial_loft_apartment","wall_color":"sage_green_matte","architectural_elements":["exposed_brick","black_grid_window"]},"accessories":{"primary_executive":["delicate_gold_chain_necklace","small_gold_hoop_earrings"],"supporting_professional_b":["rose_gold_geometric_necklace"]},"lighting":{"color_temperature":"5200K_true_neutral_daylight","source":"soft_window_light_45_degrees","intensity":"75_percent_natural_light","shadow_behavior":"15_percent_opacity_soft_edges","diffusion":"sheer_material","enforcement":"NO yellow, orange, or warm cast. Whites must appear neutral. Skin tones must be balanced. Coral blouse must render correctly. Sage wall must appear true."}}',
    '{"source":"chatgpt-4","brand_context":"Confident Modern Professional","url":"https://chatgpt.com/share/687569fe-77dc-800e-86bc-2e9800b368b6","extracted_date":"2025-07-14","category":"collaboration-professional","structure_analysis":{"topLevelKeys":["scene_id","subjects","wardrobe","environment","accessories","lighting"],"depth":3,"complexity":"complex","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"multiple"},"quality_score":9,"processing_date":"2025-07-14T17:30:00.000Z"}',
    9,
    '{"topLevelKeys":["scene_id","subjects","wardrobe","environment","accessories","lighting"],"depth":3,"complexity":"complex","hasLighting":true,"hasEnvironment":true,"hasCamera":false,"subjectType":"multiple"}',
    'scene-objects/chatgpt-confident-modern-professional/scene_d_set2.json'
);

INSERT INTO scene_search (
    scene_id,
    content
) VALUES (
    'chatgpt-scene_d_set2',
    'Create scene objects for a Confident Modern Professional photoshoot based on uploaded brand context file   scene_id : scene_d_set2   subjects :[ primary_executive   supporting_professional_b ]  wardrobe :  primary_executive : soft_gray_cashmere_v_neck_sweater   supporting_professional_b : coral_blouse_warm_approachable_sophisticated    environment :  location : modern_industrial_loft_apartment   wall_color : sage_green_matte   architectural_elements :[ exposed_brick   black_grid_window ]   accessories :  primary_executive :[ delicate_gold_chain_necklace   small_gold_hoop_earrings ]  supporting_professional_b :[ rose_gold_geometric_necklace ]   lighting :  color_temperature : 5200K_true_neutral_daylight   source : soft_window_light_45_degrees   intensity : 75_percent_natural_light   shadow_behavior : 15_percent_opacity_soft_edges   diffusion : sheer_material   enforcement : NO yellow  orange  or warm cast. Whites must appear neutral. Skin tones must be balanced. Coral blouse must render correctly. Sage wall must appear true.   '
);

COMMIT;

-- Verify insertion
SELECT COUNT(*) as total_scenes FROM scene_objects;
SELECT category, COUNT(*) as count FROM scene_objects GROUP BY category;