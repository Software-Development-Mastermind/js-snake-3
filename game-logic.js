const GameLogic = (function() {
    return {
        isSnakeCollidingWithWall: (snake, canvas) => {
            const isCollidingLeft = snake.body[0].x < 0;
            const isCollidingRight = snake.body[0].x > canvas.width;
            const isCollidingTop = snake.body[0].y < 0;
            const isCollidingBottom = snake.body[0].x > canvas.height;
          
            return (
              isCollidingLeft || isCollidingRight || isCollidingBottom || isCollidingTop
            );
        },
        isSnakeEatingApple: (snake, apple) => {
            return apple.x === snake.body[0].x && apple.y === snake.body[0].y;
        }
    }
})();