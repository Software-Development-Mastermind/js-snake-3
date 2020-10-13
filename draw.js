const CanvasLogic = (function () {
  return {
    drawCanvas: (canvasContext, gridSize) => {
      const { canvas } = canvasContext;

      canvasContext.fillStyle = "black";
      let rowOffset = true;
      for (let i = 0; i < canvas.height; i += gridSize) {
        let columnOffset = true;
        for (let j = 0; j < canvas.width; j += gridSize) {
          canvasContext.fillStyle = rowOffset
            ? columnOffset
              ? "gray"
              : "black"
            : columnOffset
            ? "black"
            : "gray";
          canvasContext.fillRect(j, i, canvas.width, gridSize);
          columnOffset = !columnOffset;
        }
        rowOffset = !rowOffset;
      }
    },
    drawApple: (apple, canvasContext, gridSize) => {
      canvasContext.fillStyle = "red";
      canvasContext.fillRect(apple.x, apple.y, gridSize, gridSize);
    },
    drawSnake: (snake, canvasContext, gridSize) => {
      snake.body.forEach((bodyPart, index) => {
        canvasContext.fillStyle = "#50C878";
        canvasContext.fillRect(bodyPart.x, bodyPart.y, gridSize, gridSize);
      });
    },
  };
})();
