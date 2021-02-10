const DIRECTION_RIGHT = "RIGHT";
const DIRECTION_LEFT = "LEFT";
const DIRECTION_UP = "UP";
const DIRECTION_DOWN = "DOWN";

document.addEventListener("DOMContentLoaded", (e) => {
  const GRID_SIZE = 40;

  const canvas = document.querySelector("#game-display");
  const canvasContext = canvas.getContext("2d");

  const snake = {
    direction: DIRECTION_RIGHT,
    newDirection: null,
    body: [
      { x: GRID_SIZE * 4, y: GRID_SIZE },
      { x: GRID_SIZE * 3, y: GRID_SIZE },
      { x: GRID_SIZE * 2, y: GRID_SIZE },
      { x: GRID_SIZE * 2, y: GRID_SIZE },
    ],
  };

  const apple = {
    x: GRID_SIZE * 6,
    y: GRID_SIZE,
  };

  CanvasLogic.drawCanvas(canvasContext, GRID_SIZE);

  const gameLoopId = setInterval(() => {
    CanvasLogic.drawCanvas(canvasContext, GRID_SIZE);
    SnakeLogic.moveBody(snake, Math, GRID_SIZE);

    if (GameLogic.isSnakeCollidingWithWall(snake, canvas)) {
      clearInterval(gameLoopId);
    }

    if (GameLogic.isSnakeEatingApple(snake, apple)) {
      snake.body.unshift(Object.assign({}, snake.body[0]));
      apple.x = AppleLogic.getRandomXPosition(canvas, GRID_SIZE, Math);
      apple.y = AppleLogic.getRandomYPosition(canvas, GRID_SIZE, Math);
    }

    CanvasLogic.drawApple(apple, canvasContext, GRID_SIZE);
    CanvasLogic.drawSnake(snake, canvasContext, GRID_SIZE);
  }, 10);

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        if (snake.direction === DIRECTION_LEFT) return;
        snake.newDirection = DIRECTION_RIGHT;
        break;
      case "ArrowLeft":
        if (snake.direction === DIRECTION_RIGHT) return;
        snake.newDirection = DIRECTION_LEFT;
        break;
      case "ArrowDown":
        if (snake.direction === DIRECTION_UP) return;
        snake.newDirection = DIRECTION_DOWN;
        break;
      case "ArrowUp":
        if (snake.direction === DIRECTION_DOWN) return;
        snake.newDirection = DIRECTION_UP;
        break;
    }
  });
});