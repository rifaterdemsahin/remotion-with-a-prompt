import { Composition } from "remotion";
import { PythagoreanTheorem } from "./PythagoreanTheorem";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PythagoreanTheorem"
        component={PythagoreanTheorem}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
