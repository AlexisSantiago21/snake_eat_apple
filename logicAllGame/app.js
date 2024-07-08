// Creando el canvas
const canvas = document.querySelector('canvas');
canvas.width = 340;
canvas.height = 340;
const ctx = canvas.getContext('2d');
const cellSize = 20;
const cellCount = canvas.width / cellSize;
const divScore = document.querySelector('.score');
let scoreCurrentGame = 0;

const snake = {
    position: { x: 10, y: 10},
    shape: [1],
}

const dirtection = {
    Up: false,
    Down: false,
    Left: false,
    Right: false,
    Stop: false
}

const apple = {
    position: { x: 6, y: 6},
    shape: [
        [1]
    ]
}

const board = [ 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//Game logic
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameOver()) {
        alert("Game Over!");
        window.location.reload();
        return; 
    }
    score();
    draw();
    snakeEatApple();
    snakeMove();
    setTimeout(update, 120);
}

function draw() {
    // Cell
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'violet';
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
   
    //snake
    ctx.fillStyle = 'green';
    ctx.fillRect(snake.shape[0].x * cellSize, snake.shape[0].y * cellSize, cellSize, cellSize);
    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'; 
    for (let i = 1; i < snake.shape.length; i++) {
        ctx.fillRect(snake.shape[i].x * cellSize, snake.shape[i].y * cellSize, cellSize, cellSize);
    }

    //apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.position.x * cellSize, apple.position.y * cellSize, cellSize, cellSize);

    //When snake eat
    if (snakeEatApple()) {
        apple.position.x = Math.floor(Math.random() * cellCount);
        apple.position.y = Math.floor(Math.random() * cellCount);
        snake.shape.push({ ...snake.shape[snake.shape.length - 1] });
        scoreCurrentGame++;
        return true;
    }
}

function snakeEatApple() {
    return snake.position.x === apple.position.x && snake.position.y === apple.position.y;
}

function snakeMove() {
    for (let i = snake.shape.length - 1; i > 0; i--) {
        snake.shape[i] = { ...snake.shape[i - 1] };
    }
    if (dirtection.Up) {
        snake.position.y--;
    } else if (dirtection.Down) {
        snake.position.y++;
    } else if (dirtection.Left) {
        snake.position.x--;
    } else if (dirtection.Right) {
        snake.position.x++;
    }
    snake.shape[0] = { x: snake.position.x, y: snake.position.y };
}


function gameOver() {
    if (snake.position.x < 0 || snake.position.x >= cellCount ||
        snake.position.y < 0 || snake.position.y >= cellCount) {
        return true;
    }

    for (let i = 1; i < snake.shape.length; i++) {
        if (snake.position.x === snake.shape[i].x && snake.position.y === snake.shape[i].y) {
            return true;
        }
    }
    return false;
}

function score() {
    divScore.innerHTML = `Score: ${scoreCurrentGame}`;
}

document.addEventListener('keydown', event => { 
    switch(event.key) {
      case 'w':
        if(!dirtection.Down) {
            dirtection.Up = true;
            dirtection.Down = false;
            dirtection.Left = false;
            dirtection.Right = false;
        }
        break;
      case 's':
        if(!dirtection.Up) {
            dirtection.Up = false;
            dirtection.Down = true;
            dirtection.Left = false;
            dirtection.Right = false;
        }
        break;
      case 'a':
        if(!dirtection.Right) {
            dirtection.Up = false;
            dirtection.Down = false;
            dirtection.Left = true;
            dirtection.Right = false;
        }
        break;
      case 'd':
        if(!dirtection.Left) {
            dirtection.Up = false;
            dirtection.Down = false;
            dirtection.Left = false;
            dirtection.Right = true;
        }
        break;
    }
});

update();