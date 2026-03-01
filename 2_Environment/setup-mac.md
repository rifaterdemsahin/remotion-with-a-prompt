# 🍎 Mac Setup Guide

## Prerequisites

```bash
# Install Node.js via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 18
nvm use 18

# Verify
node --version  # v18.x.x
npm --version   # 9.x.x
```

## Step 1: Clone Repository

```bash
git clone https://github.com/rifaterdemsahin/remotion-with-a-prompt
cd remotion-with-a-prompt
```

## Step 2: Open in Browser (No Build Required)

```bash
# Option A: Direct open
open index.html

# Option B: Local server (recommended for fetch() to work)
npx serve .
# Open http://localhost:3000
```

## Step 3: Use Generated Code with Remotion (Optional)

```bash
# Create a new Remotion project
npx create-video@latest my-video
cd my-video
npm install

# Replace src/Composition.tsx with generated code
# Then render:
npx remotion render src/index.ts MyVideo out/video.mp4
```

## Step 4: Start Docker Services (Optional AI Features)

```bash
# Start Qdrant + Ollama
docker compose up -d

# Pull the embedding model
docker exec -it ollama ollama pull nomic-embed-text

# Verify Qdrant
curl http://localhost:6333/healthz
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `fetch()` fails on `file://` | Use `npx serve .` instead |
| Images not loading from URL | Check CORS headers on image host |
| Canvas preview not rendering | Update browser to latest version |
