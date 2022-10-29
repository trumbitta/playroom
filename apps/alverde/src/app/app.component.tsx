import { useEffect, useRef } from 'react';

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

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      await load('ada_0.png', 'FX_CloudAlpha08.png');

      const intro = getIntroScreen({
        height: canvas.height,
        width: canvas.width,
      });

      const background = Sprite({
        x: 0,
        y: 0,
        color: 'transparent',
        width: canvas.width,
        height: canvas.height,
      });

      const cloud = Sprite({
        x: 0,
        y: 0,
        image: imageAssets['FX_CloudAlpha08'],
        dx: 1,
      });

      const hero = createHero({
        canvasHeight: canvas.height,
        canvasWidth: canvas.width,
      });

      // 🚫 No instant wins!
      let goal: Sprite;
      do {
        goal = createGoal({
          canvasHeight: canvas.height,
          canvasWidth: canvas.width,
        });
      } while (collides(hero, goal));

      if (isDebug) {
        goal.color = 'white';
      }

      const coloredDistances = getColoredDistances({
        goalVector: goal.position,
        canvasHeight: canvas.height,
        canvasWidth: canvas.width,
      });

      const loop = GameLoop({
        update: function () {
          if ((!intro.hidden && keyPressed('enter')) || keyPressed('space')) {
            intro.hide();
          }

          hero.playAnimation('idle');

          moveHero({
            hero,
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
          });

          checkWinCondition({ hero, goal });

          background.update();
          cloud.update();
          if (cloud.x === canvas.width) {
            cloud.x = -cloud.width;
          }

          hero.update();

          const distance = Math.floor(hero.position.distance(goal.position));
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

          cloud.render();
        },
      });

      loop.start();
    };

    startGameLoop();
  }, []);

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
};

const canvasBorderInPx = 10;
const canvasWidth = window.innerWidth - canvasBorderInPx * 2;
const canvasHeight = window.innerHeight - canvasBorderInPx * 2;
const heroWidth = 48;
const heroHeight = 48;

type Position = {
  x: number;
  y: number;
};

type CanvasDimensions = {
  canvasWidth: number;
  canvasHeight: number;
};

const moveHero = ({
  hero,
  canvasWidth,
  canvasHeight,
}: {
  hero: Sprite;
} & CanvasDimensions) => {
  const isHeroInsideBound = {
    top: hero.y - 1 >= 0,
    right: hero.x + 1 + heroWidth <= canvasWidth,
    bottom: hero.y + 1 + heroHeight <= canvasHeight,
    left: hero.x - 1 >= 0,
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

const getColoredDistances = ({
  goalVector,
  canvasWidth,
  canvasHeight,
}: { goalVector: Vector } & CanvasDimensions): string[] => {
  const distanceFromVertexNW = goalVector.distance(Vector(0, 0));
  const distanceFromVertexNE = goalVector.distance(
    Vector(canvasWidth - heroWidth, 0)
  );
  const distanceFromVertexSW = goalVector.distance(
    Vector(0, canvasHeight - heroHeight)
  );
  const distanceFromVertexSE = goalVector.distance(
    Vector(canvasWidth - heroWidth, canvasHeight - heroHeight)
  );
  const longestDistanceFromGoalToBounds = Math.ceil(
    Math.max(
      distanceFromVertexNW,
      distanceFromVertexNE,
      distanceFromVertexSW,
      distanceFromVertexSE
    )
  );

  return quantize(interpolateWarm, longestDistanceFromGoalToBounds).reverse();
};

const checkWinCondition = ({ hero, goal }: { hero: Sprite; goal: Sprite }) => {
  // Snap over the goal
  if (collides(hero, goal)) {
    hero.x = goal.x;
    hero.y = goal.y;

    hero.playAnimation('victory');
  }
};

const getIntroScreen = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): Scene => {
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

const createHero = ({
  canvasWidth,
  canvasHeight,
}: CanvasDimensions): Sprite => {
  const { animations } = SpriteSheet({
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
    x: lerp(0, canvasWidth - heroWidth, 0.5),
    y: lerp(0, canvasHeight - heroHeight, 0.5),
  };

  const hero = Sprite({
    ...heroPosition,
    width: heroWidth,
    height: heroHeight,
    animations,
  });

  return hero;
};

const createGoal = ({
  canvasWidth,
  canvasHeight,
}: CanvasDimensions): Sprite => {
  const sprite = Sprite({
    ...getRandomGoalPosition({
      x: canvasWidth,
      y: canvasHeight,
    }),
    color: 'transparent',
    width: heroWidth / 2,
    height: heroHeight / 2,
  });

  return sprite;
};

const getRandomGoalPosition = ({
  x: maxCellX,
  y: maxCellY,
}: Position): Position => ({
  x: randInt(0, maxCellX - heroWidth),
  y: randInt(0, maxCellY - heroHeight),
});
