import { Composition } from 'remotion';
import { BahBahBlackSheep } from './compositions/BahBahBlackSheep';

const FPS = 30;
const DURATION_SECONDS = 75;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="BahBahBlackSheep"
        component={BahBahBlackSheep}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="BahBahBlackSheepInstagram"
        component={BahBahBlackSheep}
        defaultProps={{ fovBoost: 20 }}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
