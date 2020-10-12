const CanvasLogic = (function() {
    return {
        drawCanvas: (canvasContext, gridSize) => {
            const { canvas } = canvasContext;

            canvasContext.fillStyle = "black";
            let rowOffset = true;
            for (let i = 0; i < canvas.height; i+=gridSize) {
                let columnOffset = true;
                for (let j = 0; j < canvas.width; j+=gridSize) {
                  canvasContext.fillStyle = rowOffset ? (columnOffset ? 'gray' : 'black') : (columnOffset ? 'black' : 'gray');
                  canvasContext.fillRect(j, i, canvas.width, gridSize);       
                  columnOffset = !columnOffset;   
                }        
                rowOffset = !rowOffset;  
            }
        },
        drawApple: (apple, canvasContext) => {
            canvasContext.fillStyle = "red";
            canvasContext.fillRect(apple.x, apple.y, GRID_SIZE, GRID_SIZE);
        },
        drawSnake: (snake, canvasContext) => {
            snake.body.forEach((bodyPart) => {
              canvasContext.fillStyle = "#50C878";
              canvasContext.fillRect(bodyPart.x, bodyPart.y, GRID_SIZE, GRID_SIZE);
            });
        }
    }
})();