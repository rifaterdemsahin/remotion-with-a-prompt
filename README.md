# 🎬 Remotion Prompt Studio

> Transform text prompts and images into Remotion video compositions — powered by the 7-Stage Self-Learning Framework.

**[Live Demo](https://rifaterdemsahin.github.io/remotion-with-a-prompt/)** &nbsp;|&nbsp; [LinkedIn](https://www.linkedin.com/in/rifaterdemsahin/) &nbsp;|&nbsp; [YouTube](https://www.youtube.com/@RifatErdemSahin)

---

## What Is This?

Enter a natural language prompt like _"Fade in my logo with rainbow text saying Hello World"_, upload images, and instantly get:
- ✅ **Live CSS canvas animation preview**
- ✅ **Production-ready Remotion TSX code**
- ✅ **Copy-paste into your Remotion project**

No build step. Pure HTML/CSS/JS. Runs on GitHub Pages.

## Quick Start

```bash
git clone https://github.com/rifaterdemsahin/remotion-with-a-prompt
cd remotion-with-a-prompt
npx serve .   # or open index.html directly
```

## Animation Prompts You Can Use

| Prompt | Effect |
|--------|--------|
| `fade in logo with text` | Opacity spring 0→1 |
| `slide from left with zoom` | TranslateX + scale spring |
| `bounce animation with text` | Low-damping spring |
| `rotate and scale logo reveal` | Rotation interpolate + scale |
| `typewriter text on gradient` | Character-by-character + gradient bg |
| `rainbow text fade in` | Gradient text + opacity spring |

## 7-Stage Journey

| Stage | Folder | Purpose |
|-------|--------|---------|
| ❓ Why | `1_Real_Unknown/` | Problem, OKRs, unknowns |
| 🌍 Context | `2_Environment/` | Setup, constraints |
| 🎨 Vision | `3_Simulation/` | Mockups, carousel |
| 📐 Recipe | `4_Formula/` | Step-by-step logic |
| 💻 Code | `5_Symbols/` | Remotion components |
| 🐛 Scars | `6_Semblance/` | Errors, workarounds |
| 🧪 Proof | `7_Testing_Known/` | Validation checklists |

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (no framework, no build)
- **Video:** [Remotion](https://remotion.dev) (React-based programmatic video)
- **Hosting:** GitHub Pages via GitHub Actions
- **Optional AI:** Qdrant + Ollama nomic-embed-text (4096 dims)

## Using Generated Code

1. Generate code in the Prompt Studio
2. Copy the TSX output
3. `npx create-video@latest my-project`
4. Paste code into `src/Composition.tsx`
5. `npx remotion render`

---

Made with ✨ by [Rifat Erdem Sahin](https://www.linkedin.com/in/rifaterdemsahin/)
