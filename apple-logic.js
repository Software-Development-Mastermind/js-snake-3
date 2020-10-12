const AppleLogic = (function() {
    return {
        getRandomXPosition: (canvas, gridSize, math) => {
            return math.ceil((math.random() * canvas.width) / GRID_SIZE) * GRID_SIZE;
        },
        getRandomYPosition: (canvas, gridSize, math) => {
            return math.ceil((math.random() * canvas.height) / GRID_SIZE) * GRID_SIZE;
        },
    }
})();