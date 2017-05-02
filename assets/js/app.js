$(document).ready(function(){
  container = $(".container");
  renderField(gameField);
  // $("div[x=9][y=9]").text("O") ;

  $(document).on("keydown", function(e){
    if (e.key === "ArrowUp"){
      if (snake.direction != "u"){
        snake.direction = "u";
      }
    }

    if (e.key === "ArrowDown"){
      if (snake.direction != "d"){
        snake.direction = "d";
      }
    }

    if (e.key === "ArrowLeft"){
      if (snake.direction != "l"){
        snake.direction = "l";
      }
    }

    if (e.key === "ArrowRight"){
      if (snake.direction != "r"){
        snake.direction = "r";
      }
    }

  });

  time = window.setInterval(makeTurn, 100);

});

var gameField = [[]];

for (var i = 0; i < 20; i++) {
  gameField[i] = [];
  for (var j = 0; j < 20; j++) {
    gameField[i][j] =  "<div class='field-block' x="+i+" y="+j+"></div>";
  }
}




var snake = {
  direction: "r",
  position: [9,9],
  coords: [[9,9]],
  length: 4
};


function renderField(gameField){
  $(".container").empty();
  for (var i = 0; i < gameField.length; i++) {
    for (var j = 0; j < gameField[i].length; j++) {
      container.append( gameField[i][j] );
    }
  }
}

function makeTurn(){
  var currentX = snake.position[0];
  var currentY = snake.position[1];
  var pos = [currentX, currentY];
  snake.coords.push( pos );
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
  renderSnake();
}

function renderSnake(){
  $(".container>div").removeClass("toggled");
  for (var i = snake.coords.length-1, j = 0; i > 0, j < snake.length ; i--, j++) {
    $("div[x="+snake.coords[i][0]+"][y="+snake.coords[i][1]+"]").first().addClass("toggled");
  }
}
