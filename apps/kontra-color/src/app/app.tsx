import { useCallback, useEffect, useRef } from 'react';

import { init, Sprite, GameLoop, keyPressed, initKeys } from 'kontra';

import { interpolateWarm } from 'd3-scale-chromatic';
import { quantize } from 'd3-interpolate';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasPositionToCellPosition = ({ x, y }: Position): Position => ({
    x: Math.floor(x / heroWidth),
    y: Math.floor(y / heroHeight),
  });

  const cellPositionToCanvasPosition = ({ x, y }: Position): Position => ({
    x: x * heroWidth,
    y: y * heroHeight,
  });

  const getRandomGoalCell = useCallback(
    ({ x: maxCellX, y: maxCellY }: Position): Position =>
      cellPositionToCanvasPosition({
        x: Math.floor(Math.random() * (Math.floor(maxCellX - 1) - 0 + 1) + 0),
        y: Math.floor(Math.random() * (Math.floor(maxCellY - 1) - 0 + 1) + 0),
      }),
    []
  );

  const getArrayIndexFromCellPosition = ({
    x,
    y,
    maxCellY,
  }: Position & {
    maxCellY: number;
  }): number => y * maxCellY + x;

  useEffect(() => {
    const { canvas } = init(canvasRef.current as HTMLCanvasElement);
    initKeys();

    const { x: maxCellX, y: maxCellY } = canvasPositionToCellPosition({
      x: canvas.width,
      y: canvas.height,
    });

    const background = Sprite({
      x: 0,
      y: 0,
      color: 'transparent',
      width: canvas.width,
      height: canvas.height,
    });

    const hero = Sprite({
      x: getXByPercentage(50),
      y: getYByPercentage(50),
      color: 'rebeccapurple',
      width: heroWidth,
      height: heroHeight,
    });

    const goalCell = getRandomGoalCell({ x: maxCellX, y: maxCellY });
    console.log(goalCell, maxCellX, maxCellY);
    const goal = Sprite({
      ...goalCell,
      color: 'white',
      width: heroWidth,
      height: heroHeight,
    });

    const shiftArray = <T,>(array: T[], howFar: number): T[] =>
      array.concat(array.splice(0, howFar));

    const orderCellPositionsByGoalCell = (
      cellPositions: string[],
      goalCellIndex: number
    ): string[] => {
      const distanceFromGoalColor = cellPositions.length - goalCellIndex - 1;

      return shiftArray(cellPositions, distanceFromGoalColor);
    };

    const coloredCellPositions = orderCellPositionsByGoalCell(
      quantize(interpolateWarm, maxCellX * maxCellY),
      getArrayIndexFromCellPosition({
        ...canvasPositionToCellPosition({ ...goalCell }),
        maxCellY,
      })
    );

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

        background.update();
        hero.update();

        const heroCellPosition = canvasPositionToCellPosition({
          x: hero.x,
          y: hero.y,
        });

        const index = getArrayIndexFromCellPosition({
          ...heroCellPosition,
          maxCellY,
        });
        background.color = coloredCellPositions[index];
      },
      render: function () {
        background.render();
        goal.render();
        hero.render();
      },
    });

    loop.start();
  }, [getRandomGoalCell]);

  const getXByPercentage = (xPercent: number) =>
    ((300 - heroWidth) * xPercent) / 100;
  const getYByPercentage = (yPercent: number) =>
    ((150 - heroHeight) * yPercent) / 100;

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
        border: '2px solid #111111',
        borderRadius: '4px',
        backgroundColor: 'silver',
        width: canvasWidth,
        height: canvasHeight,
      }}
    ></canvas>
  );
}

export default App;

const canvasWidth = 600;
const canvasHeight = 600;
const heroWidth = 20;
const heroHeight = 10;

type Position = {
  x: number;
  y: number;
};
