# 💻 Symbols — The "Reality"

> Stage 5 of 7: The code that makes it real.

## Source Files

| File | Purpose |
|------|---------|
| `src/PromptVideo.tsx` | Core component — renders any prompt-based animation |
| `src/MyComposition.tsx` | Example composition to copy from |
| `src/Root.tsx` | Remotion root — registers all compositions |

## PromptVideo Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `prompt` | string | "Fade in logo with text" | Original prompt (for watermark) |
| `imageUrl` | string | undefined | Image source URL or data URI |
| `text` | string | "Hello World" | Text to display |
| `backgroundColor` | string | "#0d1117" | Background color |
| `animation` | fade\|slide\|zoom\|bounce\|rotate\|typewriter | "fade" | Animation type |
| `slideDirection` | left\|right\|up\|down | "left" | Slide direction |
| `hasGradientText` | boolean | false | Rainbow gradient text |

## Using Generated Code

1. Go to the [Prompt Studio](../index.html)
2. Enter your prompt + upload images
3. Click "Generate Composition"
4. Copy the generated TSX
5. Paste into your Remotion project's `src/` folder
6. Register in `Root.tsx`
7. Run `npx remotion render`

## Key Patterns

```typescript
// Always use useCurrentFrame() and useVideoConfig()
const frame = useCurrentFrame();
const { fps, durationInFrames } = useVideoConfig();

// spring() for smooth physics-based animations
const opacity = spring({ fps, frame, config: { damping: 200 } });

// interpolate() for linear progress
const rotation = interpolate(frame, [0, fps], [0, 360], { extrapolateRight: 'clamp' });
```
