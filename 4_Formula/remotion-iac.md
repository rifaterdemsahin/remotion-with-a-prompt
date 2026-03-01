# 🎬 Remotion Infrastructure as Code

> **Formula**: every file, every command, every pattern you need to bootstrap Remotion from scratch.

---

## Mental Model

```
Prompt → TSX Component → Root.tsx registers it → index.ts bootstraps it → Remotion renders it
```

The **5 mandatory files** for any Remotion project:

| File | Purpose |
|---|---|
| `package.json` | declares `remotion` + `@remotion/cli` deps |
| `tsconfig.json` | TypeScript config (JSX = react-jsx) |
| `remotion.config.ts` | output format, overwrite, concurrency |
| `src/index.ts` | calls `registerRoot()` — entry point |
| `src/Root.tsx` | registers `<Composition>` elements |

---

## Step 0 — Bootstrap (one time per project)

```bash
# Option A: Remotion's own scaffolder (recommended for new projects)
npx create-video@latest

# Option B: Manual setup (add to existing repo)
npm install remotion @remotion/cli react react-dom
npm install -D typescript @types/react @types/react-dom
```

---

## Step 1 — package.json

```json
{
  "name": "my-remotion-project",
  "version": "1.0.0",
  "scripts": {
    "studio":         "remotion studio src/index.ts",
    "render":         "remotion render src/index.ts MyComposition out/video.mp4",
    "render:still":   "remotion still src/index.ts MyComposition --frame=30 out/still.png",
    "render:webm":    "remotion render src/index.ts MyComposition --codec=vp8 out/video.webm",
    "render:gif":     "remotion render src/index.ts MyComposition --codec=gif out/video.gif"
  },
  "dependencies": {
    "react":     "^18.2.0",
    "react-dom": "^18.2.0",
    "remotion":  "^4.0.0"
  },
  "devDependencies": {
    "@remotion/cli":    "^4.0.0",
    "@types/react":     "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript":       "^5.0.0"
  }
}
```

---

## Step 2 — tsconfig.json

```json
{
  "compilerOptions": {
    "target":     "ES2020",
    "module":     "ESNext",
    "lib":        ["ES2020", "DOM"],
    "jsx":        "react-jsx",
    "strict":     true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "outDir":     "./dist"
  },
  "include": ["src"]
}
```

---

## Step 3 — remotion.config.ts

```ts
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");   // jpeg | png (jpeg = smaller/faster)
Config.setOverwriteOutput(true);      // never prompt before overwriting
// Config.setConcurrency(4);          // parallel render threads (default = CPU cores)
// Config.setPixelFormat("yuv420p");  // for max compatibility with players
```

---

## Step 4 — src/index.ts  (entry point)

```ts
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
```

---

## Step 5 — src/Root.tsx  (composition registry)

```tsx
import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./MyComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComposition"          // used in CLI: remotion render ... MyComposition
        component={MyComposition}
        durationInFrames={150}      // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}           // any props your component accepts
      />
    </>
  );
};
```

### Common dimension presets

| Format | width | height | fps | notes |
|---|---|---|---|---|
| 1080p landscape | 1920 | 1080 | 30 | YouTube, default |
| 1080p portrait | 1080 | 1920 | 30 | Reels / TikTok |
| Square | 1080 | 1080 | 30 | Instagram |
| 4K | 3840 | 2160 | 24 | Film-quality |
| Twitter/X | 1280 | 720 | 30 | Good quality |

---

## Step 6 — Minimal Composition Template

```tsx
// src/MyComposition.tsx
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
  Img,
} from "remotion";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // --- Animations ---
  const opacity = spring({ fps, frame, config: { damping: 200 }, durationInFrames: 30 });
  const scale   = spring({ fps, frame, config: { damping: 150, stiffness: 60 }, from: 0.8, to: 1, durationInFrames: 40 });

  return (
    <AbsoluteFill style={{ background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 80, fontWeight: "bold", color: "white", opacity, transform: `scale(${scale})` }}>
        Hello World
      </div>
    </AbsoluteFill>
  );
};
```

---

## Step 7 — Prompt-Driven Composition Template

```tsx
// src/PromptVideo.tsx  — accepts all animation props as React props
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Sequence, Img } from "remotion";

interface PromptVideoProps {
  text:            string;
  imageUrl?:       string;
  backgroundColor: string;
  animation:       "fade" | "slide" | "zoom" | "bounce" | "rotate" | "typewriter";
  slideDirection?: "left" | "right" | "up" | "down";
  textColor?:      string;
  hasGradientText?: boolean;
}

export const PromptVideo: React.FC<PromptVideoProps> = ({
  text            = "Hello World",
  imageUrl,
  backgroundColor = "#0d1117",
  animation       = "fade",
  slideDirection  = "left",
  textColor       = "white",
  hasGradientText = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // fade
  const fadeOpacity = spring({ fps, frame, config: { damping: 200, stiffness: 80 }, durationInFrames: Math.round(fps * 0.8) });
  // zoom / bounce
  const scaleValue  = spring({ fps, frame, config: { damping: animation === "bounce" ? 40 : 150, stiffness: animation === "bounce" ? 80 : 60 }, from: 0, to: 1, durationInFrames: Math.round(fps * 0.6) });
  // slide
  const slideProgress = spring({ fps, frame, config: { damping: 100, stiffness: 60, mass: 0.8 }, durationInFrames: Math.round(fps * 1.0) });
  const slideOffset   = interpolate(slideProgress, [0, 1], [{ left: -120, right: 120, up: -80, down: 80 }[slideDirection!], 0]);
  // rotate
  const rotation    = interpolate(frame, [0, Math.round(fps * 0.5)], [180, 0], { extrapolateRight: "clamp" });
  // typewriter
  const charsToShow = Math.floor(interpolate(frame, [0, fps * 1.5], [0, text.length], { extrapolateRight: "clamp" }));
  // fade out at end
  const fadeOut     = interpolate(frame, [durationInFrames - fps * 0.5, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const getTransform = () => ({
    fade:       "none",
    slide:      (slideDirection === "left" || slideDirection === "right") ? `translateX(${slideOffset}px)` : `translateY(${slideOffset}px)`,
    zoom:       `scale(${scaleValue})`,
    bounce:     `scale(${scaleValue})`,
    rotate:     `rotate(${rotation}deg)`,
    typewriter: "none",
  }[animation]);

  const opacity = (animation === "fade" ? fadeOpacity : 1) * fadeOut;

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 32 }}>
      {imageUrl && (
        <Img src={imageUrl} style={{ width: 320, height: 320, objectFit: "contain", borderRadius: 16, transform: getTransform(), opacity }} />
      )}
      <div style={{
        fontSize: 72, fontWeight: "bold", textAlign: "center", fontFamily: "sans-serif", maxWidth: "80%",
        color: hasGradientText ? "transparent" : textColor,
        transform: getTransform(), opacity,
        ...(hasGradientText && { background: "linear-gradient(90deg,#ff79c6,#bd93f9,#50fa7b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }),
      }}>
        {animation === "typewriter" ? text.slice(0, charsToShow) : text}
      </div>
    </AbsoluteFill>
  );
};
```

---

## NPX Command Reference

### Studio (live preview)

```bash
npx remotion studio src/index.ts
# Opens http://localhost:3000 — hot reload, scrub timeline, edit props
```

### Render to MP4

```bash
npx remotion render src/index.ts <CompositionId> out/video.mp4

# With options:
npx remotion render src/index.ts MyComposition out/video.mp4 \
  --codec=h264 \
  --fps=30 \
  --frames=0-150 \
  --concurrency=4
```

### Render a single still frame

```bash
npx remotion still src/index.ts MyComposition --frame=0 out/frame-0.png
npx remotion still src/index.ts MyComposition --frame=30 out/thumb.jpg
```

### Render WebM (for web / GitHub Pages preview)

```bash
npx remotion render src/index.ts MyComposition out/video.webm --codec=vp8
```

### Render GIF

```bash
npx remotion render src/index.ts MyComposition out/video.gif --codec=gif
```

### Render to different formats

| Format | Flag | Notes |
|---|---|---|
| MP4 (default) | `--codec=h264` | Best compatibility |
| WebM | `--codec=vp8` | Web, smaller size |
| ProRes | `--codec=prores` | Mac editing |
| GIF | `--codec=gif` | Loops, no audio |
| PNG sequence | `--codec=png` | Each frame as PNG |

---

## Remotion API Quick Reference

### Hooks

```ts
const frame              = useCurrentFrame();             // 0 → durationInFrames-1
const { fps, durationInFrames, width, height } = useVideoConfig();
```

### spring()  — physics-based easing

```ts
const value = spring({
  fps,
  frame,
  from:            0,       // start value (default 0)
  to:              1,       // end value (default 1)
  durationInFrames: fps,    // how many frames to settle
  config: {
    damping:   100,   // 200 = over-damped (no bounce), 40 = bouncy
    stiffness:  60,   // spring stiffness
    mass:        1,   // object mass
  },
});
```

### interpolate()  — linear/eased mapping

```ts
const value = interpolate(
  frame,            // input value
  [0, fps],         // input range
  [0, 1],           // output range
  {
    extrapolateLeft:  "clamp",   // clamp | extend | wrap | identity
    extrapolateRight: "clamp",
    easing:           Easing.ease,  // optional — import Easing from remotion
  }
);
```

### Sequence  — time-shift a sub-tree

```tsx
<Sequence from={30} durationInFrames={60}>
  {/* only renders frames 30-89 */}
  <MyScene />
</Sequence>
```

### Img  — pre-loads images before rendering

```tsx
import { Img } from "remotion";
<Img src="https://example.com/logo.png" style={{ width: 200 }} />
// Always use <Img> instead of <img> for render correctness
```

### Audio / Video

```tsx
import { Audio, Video, staticFile } from "remotion";

<Audio src={staticFile("music.mp3")} startFrom={0} endAt={fps * 5} />
<Video src={staticFile("clip.mp4")} style={{ width: "100%", height: "100%" }} />
// staticFile() resolves paths from the /public folder
```

---

## File Structure Formula

```
my-project/
├── package.json          # Step 1
├── tsconfig.json         # Step 2
├── remotion.config.ts    # Step 3
├── src/
│   ├── index.ts          # Step 4  — registerRoot()
│   ├── Root.tsx          # Step 5  — <Composition> registry
│   ├── MyComposition.tsx # Step 6  — your animation
│   └── PromptVideo.tsx   # Step 7  — prompt-driven (optional)
├── public/               # static assets (images, audio)
│   └── logo.png
└── out/                  # rendered output (gitignored)
    └── video.mp4
```

Add to `.gitignore`:

```
node_modules/
out/
dist/
```

---

## Checklist — Every New Remotion Project

- [ ] `npm install remotion @remotion/cli react react-dom`
- [ ] `npm install -D typescript @types/react @types/react-dom`
- [ ] Create `tsconfig.json` (jsx: react-jsx)
- [ ] Create `remotion.config.ts`
- [ ] Create `src/index.ts` with `registerRoot()`
- [ ] Create `src/Root.tsx` with at least one `<Composition>`
- [ ] Create your composition component in `src/`
- [ ] `npx remotion studio src/index.ts` — verify live preview
- [ ] `npx remotion render src/index.ts <Id> out/video.mp4` — verify render
- [ ] Add `out/` and `node_modules/` to `.gitignore`
