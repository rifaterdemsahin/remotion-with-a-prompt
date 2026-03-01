# 📐 Formula — The "Recipe"

> Stage 4 of 7: The logic that powers the magic.

## Core Formula: Prompt → Remotion Code

```
Input:  "Fade in my logo with rainbow text saying Hello World for 5 seconds"
         ↓
Parse:  { fadeIn: true, hasGradient: true, hasLogo: true, textContent: "Hello World" }
         ↓
Build:  animation logic (spring) + JSX (AbsoluteFill + Img + div)
         ↓
Output: GeneratedComposition.tsx (copy-paste into Remotion project)
```

## Keyword Vocabulary

| Keyword | Animation |
|---------|-----------|
| fade, fade in | opacity spring 0→1 |
| fade out | opacity interpolate 1→0 at end |
| slide from left | translateX spring |
| slide from right | translateX spring reverse |
| zoom, scale | scale spring |
| bounce | spring with low damping |
| rotate, spin | rotate interpolate |
| typewriter | character-by-character reveal |
| rainbow, gradient | CSS gradient text |
| [color] background | backgroundColor on AbsoluteFill |

## Remotion Core APIs Used

```typescript
import {
  useCurrentFrame,   // Current frame number (0-based)
  useVideoConfig,    // { fps, durationInFrames, width, height }
  spring,            // Physics-based spring animation
  interpolate,       // Linear interpolation with clamping
  AbsoluteFill,      // Full-size container div
  Img,               // Image component with preloading
  Sequence,          // Time-offset sequences
} from 'remotion';
```

## Image Loading Strategy

1. **File Upload** → FileReader API → data URI → passed as `src` prop to `<Img>`
2. **URL Input** → Direct URL string → passed as `src` prop
3. **Generated code** → URL stored as const above component

## Preview vs. Real Render

| Feature | Browser Preview | Remotion Render |
|---------|----------------|----------------|
| Rendering | Canvas 2D API | React + Puppeteer |
| Accuracy | ~70% visual match | Pixel-perfect |
| Performance | 30fps in browser | Up to 4x concurrent |
| Output | Screen only | MP4/WebM file |
