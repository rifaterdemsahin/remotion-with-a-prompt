// 🎬 Root.tsx — Register compositions with Remotion

import React from "react";
import { Composition } from "remotion";
import { MyComposition } from "./MyComposition";
import { PromptVideo } from "./PromptVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Default composition */}
      <Composition
        id="MyComposition"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Prompt-driven composition */}
      <Composition
        id="PromptVideo"
        component={PromptVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          prompt: "Fade in logo with rainbow text saying Hello World",
          text: "Hello World",
          backgroundColor: "#0d1117",
          animation: "fade",
          hasGradientText: true,
        }}
      />
    </>
  );
};
