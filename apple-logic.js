const AppleLogic = (function() {
    return {
        getRandomXPosition: (canvas, gridSize, math) => {
            return math.ceil((math.random() * canvas.width) / gridSize) * gridSize;
        },
        getRandomYPosition: (canvas, gridSize, math) => {
            return math.ceil((math.random() * canvas.height) / gridSize) * gridSize;
        },
    }
})();