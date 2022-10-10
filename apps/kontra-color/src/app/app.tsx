import { useCallback, useEffect, useRef } from 'react';

import { init, Sprite, GameLoop, keyPressed, initKeys } from 'kontra';

import { interpolateWarm } from 'd3-scale-chromatic';
import { interpolate, quantize } from 'd3-interpolate';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const heroPositionToCellPosition = ({ x, y }: Position): Position => ({
    x: Math.floor(x / heroWidth),
    y: Math.floor(y / heroHeight),
  });

  const getColorByCellPosition = useCallback(
    ({
      x,
      y,
      maxCellX,
      maxCellY,
    }: Position & { maxCellX: number; maxCellY: number }): string => {
      const coloredCellPositions = quantize(
        interpolateWarm,
        maxCellX * maxCellY
      );

      const heroCellIndex = y * maxCellY + x;

      return coloredCellPositions[heroCellIndex];
    },
    []
  );

  useEffect(() => {
    const { canvas } = init(canvasRef.current as HTMLCanvasElement);
    initKeys();

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

        const { x: maxCellX, y: maxCellY } = heroPositionToCellPosition({
          x: canvas.width,
          y: canvas.height,
        });

        const heroCellPosition = heroPositionToCellPosition({
          x: hero.x,
          y: hero.y,
        });

        background.color = getColorByCellPosition({
          x: heroCellPosition.x,
          y: heroCellPosition.y,
          maxCellX,
          maxCellY,
        });
      },
      render: function () {
        background.render();
        hero.render();
      },
    });

    loop.start();
  }, [getColorByCellPosition]);

  const getXByPercentage = (xPercent: number) =>
    ((300 - heroWidth) * xPercent) / 100;
  const getYByPercentage = (yPercent: number) =>
    ((150 - heroHeight) * yPercent) / 100;

  // TODO: explore making this immutable
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
