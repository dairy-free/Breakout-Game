const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const gameOverMsg = document.getElementsByClassName('game-over-message')[0]
const countDownTimer = document.getElementsByClassName('countdown-timer')[0]
const yesBtn = document.getElementsByClassName('btn-secondary')[0]
const noBtn = document.getElementsByClassName('btn-secondary')[1]


// const resetBtn = document.getElementById('resetBtn');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardHeight = 300;
const boardWidth = 560;
let timerId
let xDirection = -2;
let yDirection = 2;
let score = 0;

// console.log(startBtn, resetBtn)

const playerStart = [230, 10]
let currentPosition = playerStart;

const ballStart = [270, 40]
let ballCurrentPosition = ballStart;

startBtn.addEventListener('click', startGame);
yesBtn.addEventListener('click', resetGame)

// Create Block
class Block {// Gives positioning on where the blocks are
  constructor(xAxis, yAxis){
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
  }
}

// All Blocks
const blocks =[
  // Each section of blocks represents a row
  new Block(10,270),
  new Block(120,270),
  new Block(230,270),
  new Block(340,270),
  new Block(450,270),

  new Block(10,240),
  new Block(120,240),
  new Block(230,240),
  new Block(340,240),
  new Block(450,240),
  

  new Block(10,210),
  new Block(120,210),
  new Block(230,210),
  new Block(340,210),
  new Block(450,210),
]

// Start game 
function startGame() {
  startBtn.classList.toggle('hide-btn')
  startBtn.classList.toggle('show-btn')
  timerId = setInterval(moveBall, 20)
  
}

function resetGame() {
  location.reload()
}

function gameOverTimeOut() {

}






// Draw All Blocks
function addBlocks(){
  for (let i = 0; i < blocks.length; i++){
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px';
    block.style.bottom = blocks[i].bottomLeft[1] + 'px';
    grid.appendChild(block);
  }
}

addBlocks()

// Create User
const playerBlock = document.createElement('div');
playerBlock.classList.add('player-block');
playerMovement();
grid.appendChild(playerBlock)

// Player Movement
function playerMovement() {
  playerBlock.style.left = currentPosition[0] + 'px';
  playerBlock.style.bottom = currentPosition[1] + 'px';
}

// Ball Position
function ballPosition(){
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}



// Move Player
function movePlayer(e){
  switch(e.key) {
    case 'ArrowLeft':
      if(currentPosition[0] > 0) {
        currentPosition[0] -= 10
        playerMovement()
      }
      break;
    
    case 'ArrowRight':
      if(currentPosition[0] < boardWidth - blockWidth){
        currentPosition[0] += 10
        playerMovement();
      }
      break;
  }
}

document.addEventListener('keydown', movePlayer)


// Create Ball
const ball = document.createElement('div');
ball.classList.add('ball');
ballPosition();
grid.appendChild(ball);

// Move Ball
function moveBall() {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  ballPosition()
  collisionCheck()
}

// timerId = setInterval(moveBall, 30)

// Collision Check

function collisionCheck() {
  // block collision check
  for (let i = 0; i < blocks.length; i++){
    if (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
    ) {
      
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block');
      blocks.splice(i, 1);
      changeDirection()
      score++;
      scoreDisplay.innerHTML = score;

      // Player win
      if(blocks.length === 0){
        scoreDisplay.innerHTML = 'Win';
        clearInterval(timerId);
        document.removeEventListener('keydown', movePlayer)
      }
    }
  }



  // Check for collisions with wall
  if (
    ballCurrentPosition[0] >= (boardWidth - ballDiameter)|| ballCurrentPosition[1] >= (boardHeight - ballDiameter)||
    ballCurrentPosition[0] <= 0
    ){
    changeDirection();
  }

  // Check for player collision

  if(
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth)&&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
  ) {
    changeDirection()
  }

  // Game over Check
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.classList.toggle('hide-element')
    grid.classList.toggle('hide-element')
    gameOverMsg.classList.toggle('hide-element')
    countDownTimer.classList.toggle('hide-element')
    yesBtn.classList.toggle('hide-element')
    noBtn.classList.toggle('hide-element')
    document.removeEventListener('keydown', movePlayer)
  }
}

function changeDirection(){
  if (xDirection === 2 && yDirection === 2){
    yDirection = -2
    return
  }

  if(xDirection === 2 && yDirection === -2){
    xDirection = -2;
    return
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
