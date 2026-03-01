// 🎬 Pythagorean Theorem Visualization: a² + b² = c²
// Animated proof with right triangle and squares

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

export const PythagoreanTheorem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation phases
  // 0-60: Triangle appears
  // 60-120: Square a appears
  // 120-180: Square b appears
  // 180-240: Square c appears
  // 240-300: Formula appears and pulses

  // Triangle fade in (0-60 frames = 2s at 30fps)
  const triangleOpacity = spring({
    fps,
    frame,
    config: { damping: 100 },
    durationInFrames: 60,
  });

  // Square A (60-120)
  const squareAOpacity = spring({
    fps,
    frame: Math.max(0, frame - 60),
    config: { damping: 100 },
    durationInFrames: 60,
  });

  // Square B (120-180)
  const squareBOpacity = spring({
    fps,
    frame: Math.max(0, frame - 120),
    config: { damping: 100 },
    durationInFrames: 60,
  });

  // Square C (180-240)
  const squareCOpacity = spring({
    fps,
    frame: Math.max(0, frame - 180),
    config: { damping: 100 },
    durationInFrames: 60,
  });

  // Formula appears (240+)
  const formulaOpacity = spring({
    fps,
    frame: Math.max(0, frame - 240),
    config: { damping: 100 },
    durationInFrames: 40,
  });

  // Pulse effect for formula
  const pulse = interpolate(
    frame,
    [240, 270, 300, 330],
    [1, 1.1, 1, 1.1],
    { extrapolateRight: "clamp" }
  );

  // Triangle dimensions (3-4-5 right triangle)
  const a = 120; // vertical side
  const b = 160; // horizontal side
  const c = 200; // hypotenuse

  // Center point for triangle
  const cx = 400;
  const cy = 350;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          fontSize: 48,
          fontWeight: "bold",
          color: "white",
          opacity: triangleOpacity,
          textShadow: "0 4px 12px rgba(0,0,0,0.5)",
        }}
      >
        Pythagorean Theorem
      </div>

      {/* SVG Canvas for geometric shapes */}
      <svg
        width="800"
        height="600"
        style={{
          filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.3))",
        }}
      >
        {/* Square A (on vertical side) */}
        <rect
          x={cx - a - 20}
          y={cy - a}
          width={a}
          height={a}
          fill="rgba(255, 107, 107, 0.6)"
          stroke="#ff6b6b"
          strokeWidth="3"
          opacity={squareAOpacity}
        />
        <text
          x={cx - a / 2 - 20}
          y={cy - a / 2}
          fontSize="32"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          opacity={squareAOpacity}
        >
          a²
        </text>

        {/* Square B (on horizontal side) */}
        <rect
          x={cx}
          y={cy + 20}
          width={b}
          height={b}
          fill="rgba(78, 205, 196, 0.6)"
          stroke="#4ecdc4"
          strokeWidth="3"
          opacity={squareBOpacity}
        />
        <text
          x={cx + b / 2}
          y={cy + b / 2 + 20}
          fontSize="32"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          opacity={squareBOpacity}
        >
          b²
        </text>

        {/* Right Triangle */}
        <polygon
          points={`${cx},${cy} ${cx + b},${cy} ${cx},${cy - a}`}
          fill="rgba(255, 255, 255, 0.15)"
          stroke="#ffffff"
          strokeWidth="4"
          opacity={triangleOpacity}
        />

        {/* Square C (on hypotenuse) - rotated */}
        <g
          opacity={squareCOpacity}
          transform={`translate(${cx + b / 2}, ${cy - a / 2})`}
        >
          <rect
            x={-c / 2}
            y={-c / 2}
            width={c}
            height={c}
            fill="rgba(186, 131, 239, 0.6)"
            stroke="#ba83ef"
            strokeWidth="3"
            transform={`rotate(${-Math.atan2(a, b) * (180 / Math.PI)})`}
          />
          <text
            x="0"
            y="0"
            fontSize="36"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            c²
          </text>
        </g>

        {/* Right angle indicator */}
        <rect
          x={cx}
          y={cy - 15}
          width={15}
          height={15}
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity={triangleOpacity}
        />

        {/* Labels for sides */}
        <text
          x={cx - 30}
          y={cy - a / 2}
          fontSize="24"
          fill="white"
          opacity={triangleOpacity}
        >
          a
        </text>
        <text
          x={cx + b / 2}
          y={cy + 15}
          fontSize="24"
          fill="white"
          textAnchor="middle"
          opacity={triangleOpacity}
        >
          b
        </text>
        <text
          x={cx + b / 2 - 30}
          y={cy - a / 2 - 20}
          fontSize="24"
          fill="white"
          opacity={triangleOpacity}
        >
          c
        </text>
      </svg>

      {/* Formula */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontSize: 64,
          fontWeight: "bold",
          background: "linear-gradient(90deg, #ff6b6b, #4ecdc4, #ba83ef)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: formulaOpacity,
          transform: `scale(${pulse})`,
          textShadow: "0 0 40px rgba(255,255,255,0.3)",
        }}
      >
        a² + b² = c²
      </div>

      {/* Values */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          fontSize: 20,
          color: "rgba(255,255,255,0.7)",
          opacity: formulaOpacity,
        }}
      >
        Example: 3² + 4² = 5² → 9 + 16 = 25 ✓
      </div>
    </AbsoluteFill>
  );
};
