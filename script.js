const canvas = document.querySelector("#game-display");
const canvasContext = canvas.getContext("2d");

drawCanvas();

const DIRECTION_RIGHT = "RIGHT";
const DIRECTION_LEFT = "LEFT";
const DIRECTION_UP = "UP";
const DIRECTION_DOWN = "DOWN";
const GRID_SIZE = 20;

const snake = {
  direction: DIRECTION_RIGHT,
  newDirection: null,
  body: [
    { x: 60, y: 60 },
    { x: 40, y: 60 },
    { x: 20, y: 60 },
  ],
};

const apple = {
  x: 120,
  y: 60,
};

function drawCanvas() {
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
  for (let i = snake.body.length - 1; i > 0; i--) {
    const xPositionIsGridLengthApart = snake.body[i].x - snake.body[i - 1].x === GRID_SIZE;
    const yPositionIsGridLengthApart = snake.body[i].y - snake.body[i - 1].y === GRID_SIZE;
      if (xPositionIsGridLengthApart || yPositionIsGridLengthApart) {
        snake.body[i] = Object.assign({}, snake.body[i - 1]);
      }
    snake.body[i] = Object.assign({}, snake.body[i - 1]);
  }

  switch (snake.direction) {
    case DIRECTION_LEFT:
      snake.body[0].x -= 1;
      break;
    case DIRECTION_RIGHT:
      snake.body[0].x += 1;
      break;
    case DIRECTION_UP:
      snake.body[0].y -= 1;
      break;
    case DIRECTION_DOWN:
      snake.body[0].y += 1;
      break;
  }

  const xPositionIsGridLengthApart = Math.abs(snake.body[1].x - snake.body[0].x) === GRID_SIZE;
  const yPositionIsGridLengthApart = Math.abs(snake.body[1].y - snake.body[0].y) === GRID_SIZE;
  if ()
}

function drawSnake() {
  snake.body.forEach((bodyPart) => {
    canvasContext.fillStyle = "green";
    canvasContext.fillRect(bodyPart.x, bodyPart.y, GRID_SIZE, GRID_SIZE);
  });
}

function drawApple() {
  canvasContext.fillStyle = "red";
  canvasContext.fillRect(apple.x, apple.y, GRID_SIZE, GRID_SIZE);
}

function isSnakeCollidingWithWall() {
  const isCollidingLeft = snake.body[0].x === 0;
  const isCollidingRight = snake.body[0].x === canvas.width - GRID_SIZE;
  const isCollidingTop = snake.body[0].y === 0;
  const isCollidingBottom = snake.body[0].x === canvas.height - GRID_SIZE;

  return (
    isCollidingLeft || isCollidingRight || isCollidingBottom || isCollidingTop
  );
}

const gameLoopId = setInterval(() => {
  drawCanvas();
  moveSnake();

  if (isSnakeCollidingWithWall()) {
    clearInterval(gameLoopId);
  }

  const snakeIsEatingApple =
    apple.x === snake.body[0].x && apple.y === snake.body[0].y;
  if (snakeIsEatingApple) {
    console.log("eaten!");
    snake.body.push(Object.assign({}, snake.body[snake.body.length - 1]));
    const randomCoordinate = () => {
      return Math.ceil((Math.random() * canvas.height) / GRID_SIZE) * GRID_SIZE;
    };
    apple.x = randomCoordinate();
    apple.y = randomCoordinate();
  }
  drawApple();
  drawSnake();
}, 1000);

document.addEventListener("keydown", (e) => {
  console.log(e);
  console.log(e.key);
  switch (e.key) {
    case "ArrowRight":
      if (direction === DIRECTION_LEFT) return;
      snake.direction = DIRECTION_RIGHT;
      break;
    case "ArrowLeft":
      if (direction === DIRECTION_RIGHT) return;
      snake.direction = DIRECTION_LEFT;
      break;
    case "ArrowDown":
      if (direction === DIRECTION_UP) return;
      snake.direction = DIRECTION_DOWN;
      break;
    case "ArrowUp":
      if (direction === DIRECTION_DOWN) return;
      snake.direction = DIRECTION_UP;
      break;
  }
});
