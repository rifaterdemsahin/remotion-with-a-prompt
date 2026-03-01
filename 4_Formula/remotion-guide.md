# 🎥 Remotion Development Guide

## Getting Started

```bash
npx create-video@latest my-project
cd my-project
npm run dev  # Opens Remotion Studio at localhost:3000
```

## Composition Registration

```typescript
// src/Root.tsx
import { Composition } from 'remotion';
import { GeneratedComposition } from './GeneratedComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="GeneratedComposition"
      component={GeneratedComposition}
      durationInFrames={150}   // 5 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

## spring() Reference

```typescript
const value = spring({
  fps,              // from useVideoConfig()
  frame,            // from useCurrentFrame()
  config: {
    damping: 150,   // Higher = less oscillation (200 = no bounce)
    stiffness: 60,  // Higher = faster
    mass: 0.8,      // Higher = heavier feel
  },
  durationInFrames: 30,  // How long the spring plays
  from: 0,          // Start value
  to: 1,            // End value
});
```

## interpolate() Reference

```typescript
const opacity = interpolate(
  frame,            // Input value
  [0, 30],          // Input range
  [0, 1],           // Output range
  {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }
);
```

## Image Loading

```typescript
// Always use Remotion's Img for proper preloading
import { Img } from 'remotion';

// In component:
<Img src={imageUrl} style={{ width: 400, height: 400, objectFit: 'contain' }} />
```

## Rendering Commands

```bash
# Render to MP4
npx remotion render src/index.ts GeneratedComposition out/video.mp4

# Render specific frames (for testing)
npx remotion render src/index.ts GeneratedComposition out/video.mp4 --frames=0-30

# Render as PNG sequence
npx remotion render src/index.ts GeneratedComposition out/frames --sequence
```
