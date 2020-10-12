const canvas = document.querySelector("#game-display");
const canvasContext = canvas.getContext("2d");

const DIRECTION_RIGHT = "RIGHT";
const DIRECTION_LEFT = "LEFT";
const DIRECTION_UP = "UP";
const DIRECTION_DOWN = "DOWN";
const GRID_SIZE = 40;

CanvasLogic.drawCanvas(canvasContext, GRID_SIZE);

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

function moveSnake() {
  const { direction, newDirection} = SnakeLogic.updateDirection(snake, GRID_SIZE);
  snake.direction = direction;
  snake.newDirection = newDirection;

  const xPositionIsGridLengthApart = Math.abs(snake.body[1].x - snake.body[0].x) === GRID_SIZE;
  const yPositionIsGridLengthApart = Math.abs(snake.body[1].y - snake.body[0].y) === GRID_SIZE;
  if (xPositionIsGridLengthApart || yPositionIsGridLengthApart) {
    for (let i = snake.body.length - 2; i > 1; i--) {
        snake.body[i] = Object.assign({}, snake.body[i - 1]);
    }

    snake.body[1] = Object.assign({}, snake.body[0]);
  }
  //snake.body[0] = SnakeLogic.moveBody(snake, Math, GRID_SIZE);

  const newSnakeTail = SnakeLogic.getNewTailPosition(snake);
  snake.body[snake.body.length - 1].x = newSnakeTail.x;
  snake.body[snake.body.length - 1].y = newSnakeTail.y;

  const newSnakeHead = SnakeLogic.getNewHeadPosition(snake);
  snake.body[0].x = newSnakeHead.x;
  snake.body[0].y = newSnakeHead.y;
}

const gameLoopId = setInterval(() => {
  CanvasLogic.drawCanvas(canvasContext, GRID_SIZE);
  moveSnake();

  if (GameLogic.isSnakeCollidingWithWall(snake, canvas)) {
    clearInterval(gameLoopId);
  }

  if (GameLogic.isSnakeEatingApple(snake, apple)) {
    snake.body.unshift(Object.assign({}, snake.body[0]));
    apple.x = AppleLogic.getRandomXPosition(canvas, GRID_SIZE, Math);
    apple.y = AppleLogic.getRandomYPosition(canvas, GRID_SIZE, Math);
  }

  CanvasLogic.drawApple(apple, canvasContext);
  CanvasLogic.drawSnake(snake, canvasContext);
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
