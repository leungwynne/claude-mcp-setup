# Scene Object Library System 🎬

## **📚 Purpose**

This library collects and analyzes ChatGPT scene objects paired with their generating prompts to:
- Learn patterns in how prompts translate to structured objects
- Build a reference dataset for validation and improvement
- Understand ChatGPT's interpretation and extrapolation methods
- Develop better prompting strategies

---

## **🔄 How to Add Scene Objects**

### **Quick Method**
Just say: *"Save this scene object and prompt to the library"* and provide:
1. **The prompt** you gave to ChatGPT
2. **The scene object JSON** ChatGPT returned

### **Example Request**
```
Save this to the scene object library:

PROMPT: "Create a scene object for a tense conversation between two characters in a coffee shop"

SCENE OBJECT: 
{
  "scene": {
    "location": "Busy downtown coffee shop",
    "characters": [...]
  }
}
```

### **What I'll Do Automatically**
1. ✅ **Analyze the structure** → Extract patterns, data types, nesting
2. ✅ **Categorize the content** → Assign category and complexity 
3. ✅ **Compare to existing** → Find similar entries and patterns
4. ✅ **Generate insights** → Note how prompt was interpreted
5. ✅ **Save systematically** → Follow naming conventions and schema
6. ✅ **Update indexes** → Keep searchable database current

---

## **🗂️ File Structure**

### **Individual Entries**
```
01-data-libraries/scene-objects/
├── scene-20250714-204500-character-interaction-v1.0.0.json
├── scene-20250714-205123-environment-description-v1.0.0.json
└── scene-20250714-210445-dialogue-scene-v1.0.0.json
```

### **Organization**
- **Naming**: `scene-YYYYMMDD-HHMMSS-[category]-v[version].json`
- **Schema**: All entries follow the comprehensive schema
- **Indexing**: Automatically tracked in searchable index
- **Categories**: 9 predefined categories for organization

---

## **🔍 Search & Analysis**

### **Find Similar Entries**
*"Show me scene objects similar to [description]"*

### **Analyze Patterns** 
*"What patterns do you see in the character-interaction scenes?"*

### **Compare Prompts**
*"How do different prompts for dialogue scenes compare?"*

### **Extract Insights**
*"What insights can you share from the scene object library?"*

---

## **📊 What Gets Tracked**

### **Prompt Analysis**
- Word count and complexity
- Key elements requested  
- Prompt type and style
- Context and conversation history

### **Object Structure**
- JSON structure and nesting depth
- Data types and field patterns
- Array structures and content
- Naming conventions used

### **Content Analysis**
- Characters, dialogue, actions, environment
- Emotional content and complexity
- Estimated word count and primary elements

### **Alignment Study**
- How well object fulfills prompt
- Unexpected elements added
- Missing requested elements
- ChatGPT's extrapolations

---

## **🎯 Use Cases**

### **Learning**
- Understand how ChatGPT interprets different prompts
- See what elements it adds beyond explicit requests
- Learn effective prompting strategies

### **Validation**
- Compare our scene objects to proven examples
- Validate structural patterns and conventions
- Check completeness and quality

### **Pattern Recognition**
- Identify common structural patterns
- Understand naming and organization conventions
- Recognize content generation tendencies

### **Improvement**
- Refine prompting techniques based on successful examples
- Develop better scene object templates
- Create more effective prompt strategies

---

## **🚀 Getting Started**

### **Repository Rename**
*Note: To rename from "claude-mcp-setup" to "claude":*
1. Go to GitHub repository settings
2. Scroll to "Repository name" 
3. Change to "claude"
4. Update local remote: `git remote set-url origin https://github.com/leungwynne/claude.git`

### **Start Adding Entries**
Just provide any ChatGPT scene object + prompt pair and I'll handle the rest systematically!

### **Build Your Library**
Each entry becomes part of a growing knowledge base that improves with every addition.

---

**Maintained by**: Claude AI Assistant  
**System**: Fully automated analysis and organization  
**Schema**: Comprehensive structure tracking  
**Growth**: Scalable to thousands of entries