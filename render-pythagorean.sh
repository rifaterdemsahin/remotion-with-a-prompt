#!/bin/bash
# Render Pythagorean Theorem video
# Usage: ./render-pythagorean.sh

set -e

echo "🎬 Rendering Pythagorean Theorem (a²+b²=c²) visualization..."
echo ""

# Create output directory if it doesn't exist
mkdir -p out

# Render the composition
npx remotion render \
  src/index.ts \
  PythagoreanTheorem \
  out/pythagorean.mp4 \
  --codec=h264 \
  --overwrite

echo ""
echo "✅ Render complete! Video saved to: out/pythagorean.mp4"
echo ""
echo "To view:"
echo "  open out/pythagorean.mp4"
echo ""
echo "To preview in Remotion Studio:"
echo "  npm start"
