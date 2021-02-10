const SnakeLogic = (function () {
  const updateDirection = (snake, gridSize) => {
    let { direction, newDirection } = snake;
    if (newDirection) {
      if (
        snake.body[0].x % gridSize === 0 &&
        snake.body[0].y % gridSize === 0
      ) {
        direction = newDirection;
        newDirection = null;
      }
    }

    return {
      direction,
      newDirection,
    };
  };

  const getNewHeadPosition = (snake) => {
    const headPart = Object.assign({}, snake.body[0]);
    switch (snake.direction) {
      case DIRECTION_LEFT:
        headPart.x -= 1;
        break;
      case DIRECTION_RIGHT:
        headPart.x += 1;
        break;
      case DIRECTION_UP:
        headPart.y -= 1;
        break;
      case DIRECTION_DOWN:
        headPart.y += 1;
        break;
    }
    return headPart;
  };

  const getNewTailPosition = (snake) => {
    // create a deep copy of snake tail
    const snakeTail = Object.assign({}, snake.body[snake.body.length - 1]);
    const snakeTailParent = snake.body[snake.body.length - 2];
    if (
      snakeTail.x === snakeTailParent.x &&
      snakeTail.y === snakeTailParent.y
    ) {
      return snakeTail;
    }

    if (snakeTail.x === snakeTailParent.x) {
      snakeTail.y += snakeTail.y < snakeTailParent.y ? 1 : -1;
      return snakeTail;
    }
    if (snakeTail.y === snakeTailParent.y) {
      snakeTail.x += snakeTail.x < snakeTailParent.x ? 1 : -1;
      return snakeTail;
    }
  };
  
  const moveBody = (snake, Math, gridSize) => {
    const { direction, newDirection } = updateDirection(
      snake,
      gridSize
    );
    snake.direction = direction;
    snake.newDirection = newDirection;

    const xPositionIsGridLengthApart =
      Math.abs(snake.body[1].x - snake.body[0].x) === gridSize;
    const yPositionIsGridLengthApart =
      Math.abs(snake.body[1].y - snake.body[0].y) === gridSize;
    if (xPositionIsGridLengthApart || yPositionIsGridLengthApart) {
      for (let i = snake.body.length - 2; i > 1; i--) {
        snake.body[i] = Object.assign({}, snake.body[i - 1]);
      }

      snake.body[1] = Object.assign({}, snake.body[0]);
    }

    const newSnakeTail = getNewTailPosition(snake);
    snake.body[snake.body.length - 1].x = newSnakeTail.x;
    snake.body[snake.body.length - 1].y = newSnakeTail.y;

    const newSnakeHead = getNewHeadPosition(snake);
    snake.body[0].x = newSnakeHead.x;
    snake.body[0].y = newSnakeHead.y;
  };

  return {
    updateDirection,
    getNewTailPosition,
    getNewHeadPosition,
    moveBody
  };
})();