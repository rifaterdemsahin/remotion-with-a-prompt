# 🌍 Environment — The "Context"

> Stage 2 of 7: Set the stage for success.

## Architecture

```
Browser (GitHub Pages)
  └── index.html (Remotion Prompt Studio)
        ├── Prompt Input → Prompt Parser → Code Generator
        ├── Image Loader → Canvas Preview
        └── Code Output (copy/download TSX)

Optional: Local Remotion Render
  └── Node.js 18+ + npx create-video
        └── Paste generated code → remotion render
```

## Requirements

| Tool | Version | Purpose |
|------|---------|---------|
| Browser | Modern (Chrome/Firefox/Safari) | Run the web app |
| Node.js | 18+ | Remotion rendering (optional) |
| Git | 2.x | Repository management |
| Docker | 24+ | Qdrant + Ollama (optional AI features) |

## Constraints

- The web app runs entirely client-side (no server needed)
- Video rendering requires Remotion CLI with Node.js
- Images are loaded as data URIs (base64) or URLs
- Preview is CSS Canvas-based, not actual Remotion output
