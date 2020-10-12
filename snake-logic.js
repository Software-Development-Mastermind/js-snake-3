const SnakeLogic = (function () {
  return {
    updateDirection: (snake, gridSize) => {
      let { direction, newDirection } = snake;
      if (newDirection) {
        if (snake.body[0].x % gridSize === 0 && snake.body[0].y % gridSize === 0) {
          direction = newDirection;
          newDirection = null;
        }
      }

      return {
        direction,
        newDirection,
      };
    },
    moveBody: (snake, Math, gridSize) => {
      const snakeBody = snake.map((bodyPart) => Object.assign({}, bodyPart));
      const xPositionIsGridLengthApart =
        Math.abs(snakeBody[1].x - snakeBody[0].x) === gridSize;
      const yPositionIsGridLengthApart =
        Math.abs(snakeBody[1].y - snakeBody[0].y) === gridSize;
      if (xPositionIsGridLengthApart || yPositionIsGridLengthApart) {
        for (let i = snakeBody.length - 2; i > 1; i--) {
          snakeBody[i] = Object.assign({}, snakeBody[i - 1]);
        }

        snakeBody[1] = Object.assign({}, snakeBody[0]);
      }
    },
    getNewTailPosition: (snake) => {
      const snakeTail = Object.assign({}, snake.body[snake.body.length - 1]);
      const snakeTailParent = snake.body[snake.body.length - 2];
      if (snakeTail.x === snakeTailParent.x && snakeTail.y === snakeTailParent.y) {
        return snakeTail;
      }

      if (snakeTail.x === snakeTailParent.x) {
        snakeTail.y += (snakeTail.y < snakeTailParent.y ? 1 : -1);
        return snakeTail;
      }
      if (snakeTail.y === snakeTailParent.y) {
        snakeTail.x += (snakeTail.x < snakeTailParent.x ? 1 : -1);
        return snakeTail;
      }
    },
    getNewHeadPosition: (snake) => {
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
    },
  };
})();
