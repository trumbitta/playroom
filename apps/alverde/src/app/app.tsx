import { useCallback, useEffect, useRef } from 'react';

import {
  init,
  Sprite,
  GameLoop,
  keyPressed,
  initKeys,
  lerp,
  collides,
  randInt,
  Vector,
  setImagePath,
  load,
  SpriteSheet,
  imageAssets,
  Text,
  Scene,
  Grid,
} from 'kontra';

import { interpolateWarm } from 'd3-scale-chromatic';
import { quantize } from 'd3-interpolate';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRandomGoalPosition = useCallback(
    ({ x: maxCellX, y: maxCellY }: Position): Position => ({
      x: randInt(0, maxCellX - heroWidth),
      y: randInt(0, maxCellY - heroHeight),
    }),
    []
  );

  const getIntroScreen = (width: number, height: number): Scene => {
    const textOptions = {
      color: '#fefefe',
      font: '32px Arial, sans-serif',
    };

    const intro = Text({
      ...textOptions,
      text: 'Chase the greenest green!',
    });

    const hint = Text({
      ...textOptions,
      text: '🟩🏃💨',
    });

    const start = Text({
      ...textOptions,
      font: '16px Arial, sans-serif',
      text: `Press 'Enter' or 'Space bar' to start`,
    });

    const background = Sprite({
      x: 0,
      y: 0,
      color: 'transparent',
      width,
      height,
    });

    const grid = Grid({
      x: width / 2,
      y: height / 2,
      width,
      height,
      anchor: { x: 0.5, y: 0.5 },
      rowGap: 16,
      justify: 'center',
      children: [intro, hint, start],
    });

    const scene = Scene({
      id: 'intro',
      objects: [background, grid],
    });

    return scene;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const isDebug = searchParams.has('debug');

    // https://opengameart.org/content/lpc-girl-variant-2
    setImagePath('assets/images');
    const { canvas } = init(canvasRef.current as HTMLCanvasElement);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    initKeys();

    const startGameLoop = async () => {
      await load('ada_0.png');

      const intro = getIntroScreen(canvas.width, canvas.height);

      const background = Sprite({
        x: 0,
        y: 0,
        color: 'transparent',
        width: canvas.width,
        height: canvas.height,
      });

      const heroSpriteSheet = SpriteSheet({
        image: imageAssets['ada_0'],
        frameWidth: heroWidth,
        frameHeight: heroHeight,
        animations: {
          victory: {
            frames: [0, 1, 2, 3],
            frameRate: 2.5,
          },
          idle: {
            frames: 0,
            loop: false,
          },
          walkN: {
            frames: [2, 6, 10, 14],
            frameRate: 10,
          },
          walkE: {
            frames: [3, 7, 11, 15],
            frameRate: 10,
          },
          walkS: {
            frames: [0, 4, 8, 12],
            frameRate: 10,
          },
          walkW: {
            frames: [1, 5, 9, 13],
            frameRate: 10,
          },
        },
      });
      const heroPosition: Position = {
        x: lerp(0, canvas.width - heroWidth, 0.5),
        y: lerp(0, canvas.height - heroHeight, 0.5),
      };
      const hero = Sprite({
        ...heroPosition,
        width: heroWidth,
        height: heroHeight,
        animations: heroSpriteSheet.animations,
      });

      const goalPosition = getRandomGoalPosition({
        x: canvas.width,
        y: canvas.height,
      });
      const goalVector = Vector(goalPosition.x, goalPosition.y);
      const goal = Sprite({
        ...goalPosition,
        color: isDebug ? 'white' : 'transparent',
        width: heroWidth / 2,
        height: heroHeight / 2,
      });

      const distanceFromVertexNW = goalVector.distance(Vector(0, 0));
      const distanceFromVertexNE = goalVector.distance(
        Vector(canvas.width - heroWidth, 0)
      );
      const distanceFromVertexSW = goalVector.distance(
        Vector(0, canvas.height - heroHeight)
      );
      const distanceFromVertexSE = goalVector.distance(
        Vector(canvas.width - heroWidth, canvas.height - heroHeight)
      );
      const longestDistanceFromGoalToBounds = Math.ceil(
        Math.max(
          distanceFromVertexNW,
          distanceFromVertexNE,
          distanceFromVertexSW,
          distanceFromVertexSE
        )
      );

      const coloredDistances = quantize(
        interpolateWarm,
        longestDistanceFromGoalToBounds
      ).reverse();

      const loop = GameLoop({
        update: function () {
          if ((!intro.hidden && keyPressed('enter')) || keyPressed('space')) {
            intro.hide();
          }

          hero.playAnimation('idle');

          moveHero({
            hero,
            bounds: {
              top: 0,
              right: canvas.width,
              bottom: canvas.height,
              left: 0,
            },
          });

          // Snap over the goal
          if (collides(hero, goal)) {
            hero.x = goal.x;
            hero.y = goal.y;

            hero.playAnimation('victory');
          }

          background.update();
          hero.update();

          const heroPosition: Position = {
            x: hero.x,
            y: hero.y,
          };

          const heroVector = Vector(heroPosition.x, heroPosition.y);

          // Monkey patching because it's the MVP of a mini-game for a kid
          const distance = Math.floor(heroVector.distance(goalVector));
          background.color = coloredDistances[distance];
        },
        render: function () {
          background.render();

          if (intro.hidden) {
            goal.render();
            hero.render();
          } else {
            intro.render();
          }
        },
      });

      loop.start();
    };

    startGameLoop();
  }, [getRandomGoalPosition]);

  const moveHero = ({
    hero,
    bounds,
  }: {
    hero: Sprite;
    bounds: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  }) => {
    const isHeroInsideBound = {
      top: hero.y - 1 >= bounds.top,
      right: hero.x + 1 + heroWidth <= bounds.right,
      bottom: hero.y + 1 + heroHeight <= bounds.bottom,
      left: hero.x - 1 >= bounds.left,
    };

    const isMovingN = keyPressed('arrowup');
    const isMovingS = keyPressed('arrowdown');
    const isMovingW = keyPressed('arrowleft');
    const isMovingE = keyPressed('arrowright');

    if (isMovingN && isHeroInsideBound['top']) {
      hero.y -= 1;
      hero.playAnimation('walkN');
    }

    if (isMovingS && isHeroInsideBound['bottom']) {
      hero.y += 1;
      hero.playAnimation('walkS');
    }

    if (isMovingW && isHeroInsideBound['left']) {
      hero.x -= 1;
      hero.playAnimation('walkW');
    }

    if (isMovingE && isHeroInsideBound['right']) {
      hero.x += 1;
      hero.playAnimation('walkE');
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: `${canvasBorderInPx}px solid transparent`,
        borderImage:
          'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
        borderImageSlice: 1,
        backgroundColor: 'transparent',
      }}
    ></canvas>
  );
}

export default App;

const canvasBorderInPx = 10;
const canvasWidth = window.innerWidth - canvasBorderInPx * 2;
const canvasHeight = window.innerHeight - canvasBorderInPx * 2;
const heroWidth = 48;
const heroHeight = 48;

type Position = {
  x: number;
  y: number;
};
