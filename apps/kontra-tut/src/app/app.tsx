import { useEffect, useRef } from 'react';

import { init, Sprite, GameLoop, keyPressed, initKeys } from 'kontra';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { canvas } = init(canvasRef.current as HTMLCanvasElement);
    initKeys();

    const hero = Sprite({
      x: getXByPercentage(90),
      y: getYByPercentage(100),
      color: 'rebeccapurple', // fill color of the sprite rectangle
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

        hero.update();
      },
      render: function () {
        hero.render();
      },
    });

    loop.start();
  }, []);

  return (
    <canvas
      id="tutorial"
      ref={canvasRef}
      style={{
        border: '2px solid red',
        backgroundColor: 'silver',
        width: 600,
        height: 600,
      }}
    ></canvas>
  );
}

export default App;

const heroWidth = 20;
const heroHeight = 10;
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
