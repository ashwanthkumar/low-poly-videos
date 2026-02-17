import { Composition } from 'remotion';
import { BahBahBlackSheep } from './compositions/BahBahBlackSheep';
import { TwinkleTwinkleLittleStar } from './compositions/TwinkleTwinkleLittleStar';

const FPS = 30;
const DURATION_SECONDS = 75;

export const Root: React.FC = () => {
  return (
    <>
      {/* Baa Baa Black Sheep */}
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

      {/* Twinkle Twinkle Little Star */}
      <Composition
        id="TwinkleTwinkleLittleStar"
        component={TwinkleTwinkleLittleStar}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="TwinkleTwinkleLittleStarInstagram"
        component={TwinkleTwinkleLittleStar}
        defaultProps={{ fovBoost: 20 }}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
