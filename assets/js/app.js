$(document).ready(function(){
  //creating divs for game field
  $(".gameover").hide();
  gameField = [[]];
  for (var i = 0; i < 20; i++) {
    gameField[i] = [];
    for (var j = 0; j < 20; j++) {
      gameField[i][j] =  "<div class='field-block' x="+i+" y="+j+"></div>";
    }
  }

  //game variables
  gameOver = false;
  turn = 1;
  score = 0;
  scoreCount = 0;

  //snake Object
  snake = {
    direction: "r",
    position: [9,9],
    coords: [[]],
    length: 1
  };

  //start game conditions
  renderField(gameField);
  startTimer();
  createFood();

  //process key presses
  $(document).on("keydown", function(e){
    if (e.key === "ArrowUp"){
      if (snake.direction != "u" && snake.direction != "d"){
        snake.direction = "u";
      }
    }

    if (e.key === "ArrowDown"){
      if (snake.direction != "d" && snake.direction != "u"){
        snake.direction = "d";
      }
    }

    if (e.key === "ArrowLeft"){
      if (snake.direction != "l" && snake.direction != "r"){
        snake.direction = "l";
      }
    }

    if (e.key === "ArrowRight"){
      if (snake.direction != "r" && snake.direction != "l"){
        snake.direction = "r";
      }
    }

    if (e.key === "Enter"){
      startNewGame();
    }
  });
});



// ********************************
//           FUNCTIONS
// ********************************

function createFood(){
  foodX = random(19);
  foodY = random(19);
  $("div[x="+foodX+"][y="+foodY+"]").addClass("food");
}

function random(num){
  return Math.ceil( Math.random()*num );
}

function startNewGame(){
  $(".gameover").hide();
  clearInterval(time);
  snake.direction = "r";
  snake.position = [9,9];
  snake.coords = [[]];
  snake.length = 1;
  gameOver = false;
  startTimer();
  turn = 1;
  score = 0;
  scoreCount = 0;
  refreshScore();
}

function startTimer(){
  time = window.setInterval(makeTurn, 100);
}

function renderField(gameField){
  container = $(".container");
  container.empty();
  for (var i = 0; i < gameField.length; i++) {
    for (var j = 0; j < gameField[i].length; j++) {
      container.append( gameField[i][j] );
    }
  }
}

function makeTurn(){
  if(!gameOver){
    var currentX = snake.position[0];
    var currentY = snake.position[1];
    var pos = [currentX, currentY];
    if ( !snake.coords.includes(pos) ){
      snake.coords.push( pos );
    }
    renderSnake();
    turn += 1;
    if(snake.direction === "u"){
      snake.position[0] -= 1;
    }
    if(snake.direction === "d"){
      snake.position[0] += 1;
    }
    if(snake.direction === "l"){
      snake.position[1] -= 1;
    }
    if(snake.direction === "r"){
      snake.position[1] += 1;
    }
    if( snake.position[0] < 0 || snake.position[0] > 19 || snake.position[1] < 0 || snake.position[1] > 19 ){
      gameOver = true;
    }
  } else{
    clearInterval(time);
    $(".gameover").show();
  }

}

function renderSnake(){
  //remove snake from field
  $(".container>div").removeClass("toggled");
  $(".container>div").removeClass("snake");

  //snake head
  $("div[x="+snake.position[0]+"][y="+snake.position[1]+"]").addClass("snake");
  //snake body
    for (var i = snake.coords.length-2, j = 0; i > 0, j < snake.length ; i--, j++) {
      $("div[x="+snake.coords[i][0]+"][y="+snake.coords[i][1]+"]").first().addClass("toggled");
    }

  //if head meets body = gameover
  if(turn > 5) {
    for (var i = snake.coords.length-2; i > 0; i--) {
      if( snake.coords[i][0] === snake.position[0] && snake.coords[i][1] === snake.position[1] ){
        clearInterval(time);
        $(".gameover").show();
      }
    }
  }

  //food interaction
  if(snake.position[0] === foodX && snake.position[1] === foodY){
    $(".container>div").removeClass("food");
    snake.length +=1 ;
    scoreCount += 1;
    score += scoreCount*5;
    refreshScore();
    createFood();
  }

  //delete old coords
  snake.coords = snake.coords.slice(-snake.length);
}


function refreshScore(){
  $(".score").text(score);
}
