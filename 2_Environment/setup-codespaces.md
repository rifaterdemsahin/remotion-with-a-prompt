# ☁️ GitHub Codespaces Setup

Run the full Remotion Prompt Studio in the cloud — no local install required.

## What is GitHub Codespaces?

Codespaces gives you a browser-based VS Code environment running on GitHub's servers.
Every repo gets a free tier (60 core-hours/month on the free plan).
Your dev container spins up in under 30 seconds.

---

## Quick Launch

Click the badge below (or go to the repo → **Code → Codespaces → Create codespace on main**):

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/rifaterdemsahin/remotion-with-a-prompt)

---

## Step-by-Step

### 1 — Open a Codespace

1. Go to [github.com/rifaterdemsahin/remotion-with-a-prompt](https://github.com/rifaterdemsahin/remotion-with-a-prompt)
2. Click **Code** → **Codespaces** tab → **Create codespace on main**
3. Wait ~30 s for the container to build and VS Code to open in your browser

### 2 — Serve the static site

The project is a pure static site — no build step needed.

```bash
# Option A: npx serve (recommended, no install)
npx serve . -p 8080

# Option B: Python (pre-installed in Codespaces)
python3 -m http.server 8080
```

Codespaces will automatically detect the forwarded port and show a popup.
Click **Open in Browser** to launch the studio.

### 3 — Configure your xAI API key

```bash
# Copy the template (env-config.js is gitignored — safe to add your key)
cp env-config.example.js env-config.js
```

Edit `env-config.js` and replace `YOUR_XAI_KEY_HERE` with your actual key:

```js
window.ENV = {
  XAI_API_KEY: 'xai-your-key-here',
  // ...
};
```

Alternatively, use the **⚙️ Settings** panel inside the app to paste your key — it's stored in `localStorage` and works even on GitHub Pages.

### 4 — (Optional) Run the Remotion CLI

If you want to use Remotion's built-in Studio or render to video files:

```bash
npm install
npx remotion studio 5_Symbols/src/Root.tsx
```

Remotion Studio will open on a different port (also auto-forwarded).

---

## Codespaces vs Local vs GitHub Pages

| Feature | Codespaces | Local | GitHub Pages |
|---|---|---|---|
| Setup time | ~30 s | ~10 min | 0 (deployed) |
| xAI key | `env-config.js` | `env-config.js` | Settings panel |
| File edits | VS Code in browser | Local editor | N/A (read-only) |
| Remotion CLI | ✅ | ✅ | ❌ |
| Docker services | ✅ (with devcontainer) | ✅ | ❌ |
| Free tier | 60 core-h/month | Unlimited | Unlimited |

---

## Codespace Storage Tips

- Codespaces auto-suspend after 30 min of inactivity (configurable)
- Changes are saved to the Codespace until you delete it
- **Push to GitHub** before closing if you want changes preserved in the repo
- Use `git push` from the integrated terminal

---

## Adding a devcontainer (optional)

For a pre-configured Codespace with Node.js and all tools ready:

```bash
mkdir -p .devcontainer
```

Create `.devcontainer/devcontainer.json`:

```json
{
  "name": "Remotion Prompt Studio",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "forwardPorts": [8080, 3000, 3001],
  "postCreateCommand": "npm install",
  "customizations": {
    "vscode": {
      "extensions": [
        "ritwickdey.LiveServer",
        "esbenp.prettier-vscode"
      ]
    }
  }
}
```

Commit this file and recreate your Codespace — it will auto-install deps and forward ports.
