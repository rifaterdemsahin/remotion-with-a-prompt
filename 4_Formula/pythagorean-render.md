# 🧮 Pythagorean Theorem Render — a²+b²=c² Formula Visualization

## Overview
This document describes the process of creating and rendering an animated visualization of the Pythagorean theorem (a²+b²=c²) using Remotion.

## What is the Pythagorean Theorem?
The Pythagorean theorem states that in a right-angled triangle, **the square of the hypotenuse (c) equals the sum of the squares of the other two sides (a and b)**:

```
a² + b² = c²
```

**Example**: For a 3-4-5 right triangle:
- a = 3 → a² = 9
- b = 4 → b² = 16
- c = 5 → c² = 25
- 9 + 16 = 25 ✓

---

## Installation & Setup

### Prerequisites
- **Node.js** v18+ (macOS: use nvm or Homebrew)
- **npm** v8+
- **macOS** (tested on Darwin 25.3.0)

### Step 1: Install Node.js (if not installed)
```bash
# Using Homebrew
brew install node

# Or using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22
```

### Step 2: Install Dependencies
```bash
npm install
```

**Installed packages:**
- `remotion@^4.0.0` — Core video rendering engine
- `react@^18.2.0` — UI framework
- `@remotion/cli@^4.0.0` — Command-line tools
- `typescript@^5.0.0` — Type safety

---

## Project Structure

```
remotion-with-a-prompt/
├── src/
│   ├── PythagoreanTheorem.tsx    # Main composition (animated visualization)
│   ├── Root.tsx                   # Composition registry
│   └── index.ts                   # Entry point
├── package.json                   # Dependencies & scripts
├── tsconfig.json                  # TypeScript config
├── remotion.config.ts             # Remotion settings
├── render-pythagorean.sh          # Render script
└── out/                           # Output directory for videos
```

---

## Composition Details

### File: `src/PythagoreanTheorem.tsx`

#### Animation Timeline (360 frames @ 30fps = 12 seconds)
| Frames | Time | Event |
|--------|------|-------|
| 0-60   | 0-2s | Title + Right triangle fade in |
| 60-120 | 2-4s | Square A (red, on vertical side) appears |
| 120-180 | 4-6s | Square B (cyan, on horizontal side) appears |
| 180-240 | 6-8s | Square C (purple, on hypotenuse) appears |
| 240-360 | 8-12s | Formula appears + pulse effect |

#### Visual Elements
1. **Title**: "Pythagorean Theorem" (top, white, bold)
2. **Right Triangle**: 3-4-5 triangle (white stroke, semi-transparent fill)
3. **Square A**: Red (rgba(255, 107, 107, 0.6)) on vertical side (a=120px)
4. **Square B**: Cyan (rgba(78, 205, 196, 0.6)) on horizontal side (b=160px)
5. **Square C**: Purple (rgba(186, 131, 239, 0.6)) on hypotenuse (c=200px, rotated)
6. **Formula**: "a² + b² = c²" (gradient text, bottom center, pulsing)
7. **Example**: "3² + 4² = 5² → 9 + 16 = 25 ✓" (bottom)

#### Background
```
linear-gradient(135deg, #0f0c29, #302b63, #24243e)
```
Deep purple/blue gradient for mathematical elegance.

---

## Rendering

### Method 1: Interactive Studio Preview
```bash
npm start
```
Opens Remotion Studio in browser at `http://localhost:3000`. Use for:
- Real-time preview
- Timeline scrubbing
- Parameter tweaking
- Visual debugging

### Method 2: Command-Line Render
```bash
./render-pythagorean.sh
```
Or manually:
```bash
npx remotion render \
  src/index.ts \
  PythagoreanTheorem \
  out/pythagorean.mp4 \
  --codec=h264 \
  --overwrite
```

**Output:**
- **File**: `out/pythagorean.mp4`
- **Resolution**: 1920×1080 (Full HD)
- **FPS**: 30
- **Duration**: 12 seconds
- **Codec**: H.264 (MP4)

### Method 3: Web UI Test Button
1. Open `index.html` in browser
2. Click **"🧮 Test: Pythagorean Theorem (a²+b²=c²)"** button
3. Loads pre-configured prompt into the studio
4. Click **"Generate Composition"** to see CSS preview

---

## Technical Implementation

### Animation Techniques
1. **Spring Animations** (`spring()` function)
   - Natural, physics-based easing
   - Used for fade-ins and element appearances
   - Config: `{ damping: 100 }` for smooth motion

2. **Interpolation** (`interpolate()` function)
   - Used for pulse effect on formula
   - Maps frame ranges to scale values
   - Example: `[240, 270, 300, 330] → [1, 1.1, 1, 1.1]`

3. **SVG Graphics**
   - Precise geometric shapes (rectangles, polygons)
   - Rotation transformation for hypotenuse square
   - Text labels for variables and formula

4. **Gradient Styling**
   - Background: Linear gradient (purple/blue)
   - Text: RGB gradient (red → cyan → purple)
   - WebKit clip for text gradient effect

### Code Patterns
```tsx
// Spring-based fade-in
const opacity = spring({
  fps,
  frame: Math.max(0, frame - delay),
  config: { damping: 100 },
  durationInFrames: 60,
});

// Pulse effect
const pulse = interpolate(
  frame,
  [240, 270, 300, 330],
  [1, 1.1, 1, 1.1],
  { extrapolateRight: "clamp" }
);
```

---

## Rendering Performance (macOS)

### Test System
- **OS**: macOS (Darwin 25.3.0)
- **Node**: v22.22.0
- **CPU**: (system-dependent)
- **RAM**: (system-dependent)

### Expected Render Time
- **Resolution**: 1920×1080
- **Duration**: 12s (360 frames @ 30fps)
- **Estimated**: ~1-3 minutes (varies by hardware)

### Optimization Tips
1. **Lower resolution for testing**:
   ```tsx
   // In Root.tsx
   width={1280}  // instead of 1920
   height={720}  // instead of 1080
   ```

2. **Reduce FPS**:
   ```tsx
   fps={24}  // instead of 30
   ```

3. **Shorter duration**:
   ```tsx
   durationInFrames={180}  // 6s instead of 12s
   ```

---

## Troubleshooting

### Issue: `npm install` fails
**Solution**: Ensure Node.js v18+ is installed:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v8.0.0 or higher
```

### Issue: Render hangs or crashes
**Solution**: Clear cache and retry:
```bash
rm -rf node_modules/.remotion
npx remotion render src/index.ts PythagoreanTheorem out/pythagorean.mp4
```

### Issue: Video quality is poor
**Solution**: Increase bitrate:
```bash
npx remotion render src/index.ts PythagoreanTheorem out/pythagorean.mp4 \
  --video-bitrate=8M
```

### Issue: Can't open Remotion Studio
**Solution**: Check port availability:
```bash
lsof -i :3000  # Check if port 3000 is in use
npm start -- --port=3001  # Use different port
```

---

## Files Created

| File | Purpose |
|------|---------|
| `src/PythagoreanTheorem.tsx` | Main animation composition |
| `src/Root.tsx` | Composition registry |
| `src/index.ts` | Entry point for Remotion |
| `package.json` | Dependencies & npm scripts |
| `tsconfig.json` | TypeScript configuration |
| `remotion.config.ts` | Remotion settings (codec, output) |
| `render-pythagorean.sh` | Convenient render script |
| `4_Formula/pythagorean-render.md` | This documentation |

---

## Next Steps

### Customization Ideas
1. **Change colors**: Edit `fill` and `stroke` in SVG elements
2. **Different triangle**: Modify `a`, `b`, `c` values (must satisfy a²+b²=c²)
3. **Add narration**: Use `<Audio>` component with voiceover
4. **More examples**: Show 5-12-13, 8-15-17 triangles
5. **Interactive proof**: Animate squares moving to show visual proof

### Export Variations
```bash
# GIF (for web)
npx remotion render src/index.ts PythagoreanTheorem out/pythagorean.gif

# WebM (smaller file size)
npx remotion render src/index.ts PythagoreanTheorem out/pythagorean.webm

# PNG sequence (for editing)
npx remotion render src/index.ts PythagoreanTheorem out/frames/frame-%04d.png
```

---

## Formula Reference

### Pythagorean Theorem
```
a² + b² = c²
```

Where:
- **a** = length of one leg (perpendicular side)
- **b** = length of other leg (base)
- **c** = length of hypotenuse (longest side)

### Common Pythagorean Triples
| a | b | c |
|---|---|---|
| 3 | 4 | 5 |
| 5 | 12 | 13 |
| 8 | 15 | 17 |
| 7 | 24 | 25 |
| 20 | 21 | 29 |

---

## Resources

- **Remotion Docs**: https://www.remotion.dev/docs
- **Remotion API**: https://www.remotion.dev/docs/api
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org

---

## Summary

✅ **Created**: Animated Pythagorean theorem visualization
✅ **Installed**: Remotion + dependencies on macOS
✅ **Setup**: Project structure with TypeScript
✅ **Tested**: Render pipeline (studio + CLI)
✅ **Documented**: Full process + troubleshooting

**Test it now:**
```bash
./render-pythagorean.sh
open out/pythagorean.mp4
```

---

*Generated with Claude Code — [Remotion with a Prompt](https://github.com/rifaterdemsahin/remotion-with-a-prompt)*
