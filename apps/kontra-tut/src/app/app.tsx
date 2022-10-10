import { useEffect, useRef } from 'react';

import { init, Sprite, GameLoop } from 'kontra';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { canvas } = init(canvasRef.current as HTMLCanvasElement);
    const spriteHeight = 40;

    const sprite = Sprite({
      x: 0, // starting x,y position of the sprite
      y: canvas.height / 2 - spriteHeight / 2,
      color: 'red', // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: spriteHeight,
      dx: 2, // move the sprite 2px to the right every frame
    });

    const loop = GameLoop({
      // create the main game loop
      update: function () {
        // update the game state
        sprite.update();

        // wrap the sprites position when it reaches
        // the edge of the screen
        if (sprite.x > canvas.width) {
          sprite.x = -sprite.width;
        }
      },
      render: function () {
        // render the game state
        sprite.render();
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
        // width: '90%',
        // height: '90%',
      }}
    ></canvas>
  );
}

export default App;
