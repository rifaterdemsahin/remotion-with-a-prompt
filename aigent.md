# 🤖 Aigent Rules — Remotion Prompt Studio

## Project Purpose
Transform text prompts and images into Remotion video compositions through a structured self-learning journey.

## Folder Navigation
- `1_Real_Unknown` → WHY we build this
- `2_Environment` → HOW to set up
- `3_Simulation` → WHAT it looks like
- `4_Formula` → THE recipe
- `5_Symbols` → THE code
- `6_Semblance` → THE errors
- `7_Testing_Known` → THE proof

## Core Rules
1. Always commit after significant changes with descriptive messages
2. Move obsolete files to `_obsolete/` subdirectory
3. Every folder must have a testing checklist
4. Navigation menus must read from JSON (menu-debug.json, menu-content.json)
5. Debug menu controlled by `debug` cookie only

## Tech Stack
- Frontend: Vanilla HTML/CSS/JS (GitHub Pages compatible)
- Video: Remotion (React-based video compositions)
- Vector DB: Qdrant (localhost:6333)
- Embeddings: Ollama nomic-embed-text (4096 dims)
- Search: In-page autocomplete from search-index.json

## Remotion Prompt Rules
- Parse prompts for: fade, slide, zoom, rotate, bounce, text, logo, background
- Generate TypeScript/TSX compositions
- Support image URLs and data URIs
- Default: 30fps, 1920×1080, 5 seconds
