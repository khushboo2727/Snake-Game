let foodX ,foodY;
let snakeX = 4, snakeY = 12;
let startloctionX = 0 ,startlocationY = 0;
let snakeBody  = []; 
let gameOver = false;
let setIntervalId;
let score  = 0;
let highScore = localStorage.getItem("high-score") || 0 ;
let playBoard = document.querySelector(".play-board");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".high-score");


const handleGameOver = ( ) => {
    clearInterval(setIntervalId);
    alert("game over! please ok to replay .... ");
    location.reload();
}
const changeDirection = (e) => {
    // change direction when you click key
    if(e.key === "ArrowUp" && startlocationY != 1 ){
    startlocationY = -1;
    startloctionX = 0;
    }else if(e.key === "ArrowDown" && startlocationY != -1){
        startlocationY = 1;
        startloctionX = 0
    }else if(e.key === "ArrowRight" && startloctionX != 1){
        startlocationY = 0;
        startloctionX = 1
    }else if(e.key === "ArrowLeft" && startloctionX != -1){
        startlocationY = 0;
        startloctionX = -1
    }
    initGame();
}
let position = function(){
    foodX = Math.floor(Math.random() * 20 + 1);
    foodY = Math.floor(Math.random() * 20 + 1);
    
}
const initGame = function(){
    if(gameOver)return handleGameOver();
   let html =  `<div class = "food" style = "grid-area : ${foodY}/${foodX}" ></div>`;
//    checking if the snake hit the food 
   if(snakeX === foodX && snakeY === foodY){
    position();
    snakeBody.push([foodX , foodY]);
//    console.log(snakeBody);
    score++;
    highScore = score >= highScore? score : highScore;
    localStorage.setItem("high-score" , highScore);
    scoreElement.innerHTML = `Score Is : ${score}`;
    highScoreElement.innerHTML = `Highscore Is : ${highScore}`;
   }
   for(let i = snakeBody.length-1 ; i > 0 ; i--){
    snakeBody[i] = snakeBody[i-1];
   }



   snakeBody[0] = [snakeX ,snakeY];
   
//    updating tha snake head position based on the value 
   snakeX += startloctionX;
   snakeY += startlocationY;

   if(snakeX <= 0 || snakeX >20 || snakeY <= 0 || snakeY > 20){
    gameOver = true;
   }

   for(let i = 0; i < snakeBody.length; i++){
    // adding  a div foer each part of the snake 
    html += `<div class = "head" style = "grid-area : ${snakeBody[i][1]}/${snakeBody[i][0]}" ></div>`
   }

//    if( i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
//     gameOver = true;
//    }
  
   playBoard.innerHTML = html;
}


position();
setIntervalId = setInterval(initGame , 185);
document.addEventListener("keydown",changeDirection);