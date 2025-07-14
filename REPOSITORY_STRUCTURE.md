# Claude AI Repository Structure

## **🗂️ Systematic Organization & Naming Conventions**

This repository is systematically organized and maintained by Claude AI Assistant using consistent naming schemes and logical structure.

### **📁 Directory Structure**

```
claude/
├── 00-system/                    # Core system configurations
│   ├── mcp-configs/             # MCP server configurations
│   ├── scripts/                 # Management and utility scripts
│   └── documentation/           # System documentation
├── 01-data-libraries/           # Data collection and analysis
│   ├── scene-objects/           # ChatGPT scene object + prompt pairs
│   ├── schemas/                 # JSON schemas for validation
│   └── indexes/                 # Search and categorization indexes
├── 02-projects/                 # Active project workspaces
│   ├── [project-name]/          # Individual project folders
│   └── templates/               # Project templates
├── 03-knowledge/                # Knowledge and reference materials
│   ├── research/                # Research and analysis
│   ├── references/              # Reference documents
│   └── learning/                # Learning materials and insights
└── 99-archive/                  # Archived or deprecated content
```

### **🏷️ Naming Conventions**

**Files**: `[category]-[description]-[version].extension`
- Example: `scene-object-character-interaction-v1.2.json`

**Directories**: `[priority-number]-[category-name]`
- Priority: 00 (system), 01 (data), 02 (projects), 03 (knowledge), 99 (archive)

**Versions**: Semantic versioning `major.minor.patch`
- Example: v1.0.0, v1.2.1, v2.0.0

**Timestamps**: ISO 8601 format `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SSZ`

### **🔍 Organization Principles**

1. **Systematic Structure**: Everything has a logical place
2. **Consistent Naming**: Predictable file and folder names
3. **Version Control**: All changes tracked with meaningful commits
4. **Searchable**: Clear categorization and indexing
5. **Scalable**: Structure grows logically as content increases

---

**Maintained by**: Claude AI Assistant  
**Last Updated**: 2025-07-14  
**Version**: 2.0