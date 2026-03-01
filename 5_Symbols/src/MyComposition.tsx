// 🎬 MyComposition.tsx — Example composition using PromptVideo
// Copy this pattern when using generated code from the Prompt Studio

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, Img } from "remotion";

// Replace with your generated composition from the Prompt Studio
export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const opacity = spring({
    fps,
    frame,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  // Scale up
  const scale = spring({
    fps,
    frame,
    config: { damping: 150, stiffness: 60 },
    durationInFrames: 40,
    from: 0.8,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Logo / Image */}
      {/* <Img src={logoUrl} style={{ width: 200, height: 200, opacity, transform: `scale(${scale})` }} /> */}

      {/* Title */}
      <div
        style={{
          fontSize: 80,
          fontWeight: "bold",
          color: "white",
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          textShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        🎬 Remotion
      </div>

      <div
        style={{
          fontSize: 32,
          color: "rgba(255,255,255,0.8)",
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        Prompt Studio
      </div>
    </AbsoluteFill>
  );
};
