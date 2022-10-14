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

  useEffect(() => {
    const { canvas } = init(canvasRef.current as HTMLCanvasElement);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    initKeys();

    const background = Sprite({
      x: 0,
      y: 0,
      color: 'transparent',
      width: canvas.width,
      height: canvas.height,
    });

    const heroPosition: Position = {
      x: lerp(0, canvas.width - heroWidth, 0.5),
      y: lerp(0, canvas.height - heroHeight, 0.5),
    };
    const hero = Sprite({
      ...heroPosition,
      color: 'rebeccapurple',
      width: heroWidth,
      height: heroHeight,
    });

    const goalPosition = getRandomGoalPosition({
      x: canvas.width,
      y: canvas.height,
    });
    const goalVector = Vector(goalPosition.x, goalPosition.y);
    const goal = Sprite({
      ...goalPosition,
      color: 'white',
      width: heroWidth,
      height: heroHeight,
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
        goal.render();
        hero.render();
      },
    });

    loop.start();
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

    if (keyPressed('arrowup') && isHeroInsideBound['top']) {
      hero.y -= 1;
    }

    if (keyPressed('arrowdown') && isHeroInsideBound['bottom']) {
      hero.y += 1;
    }

    if (keyPressed('arrowleft') && isHeroInsideBound['left']) {
      hero.x -= 1;
    }

    if (keyPressed('arrowright') && isHeroInsideBound['right']) {
      hero.x += 1;
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
const heroWidth = 20;
const heroHeight = 20;

type Position = {
  x: number;
  y: number;
};
