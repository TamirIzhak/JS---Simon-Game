//Variables decalartions
var colorArray = ["red", "blue", "yellow", "green"];
var blueAudio = new Audio("sounds/blue.mp3");
var yellowAudio = new Audio("sounds/yellow.mp3");
var redAudio = new Audio("sounds/red.mp3");
var greenAudio = new Audio("sounds/green.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");
var currentLevel = 0;
var randomPattern = [];
var index = 0;
var speed = 900;
var gameStarted = false;

// Game initialize on keypress
$(document).on("keypress", function() {
  if (!gameStarted) {
    init();
    levelUp();
    levelDeclare();
    animateSequence();
    gameStarted = true;
  }
});

//click listener
$(".btn").on("click", function(event) {
  if (gameStarted) {
    buttonAnimation("#" + event.target.id);
    playSound(event.target.id);
    compareColors((event.target.id), randomPattern[index]);
  }
});

//***************** functions*******************\\

//check if color clicked is correct vs randomPattern[i]
function compareColors(color, color2) {

  if (color === color2) {
    index++;
    if (index == randomPattern.length) {
      levelUp();
      levelDeclare();
      setTimeout(function() {
        animateSequence();
      }, speed);
      index = 0;
    }
    if (currentLevel == 4) {
      increaseDifficulty();
    }
    if (currentLevel == 9) {
      increaseDifficulty();
    }
  } else {
    $("h1").text("OOPS!, Press Any Key To Restart");
    wrongAudio.play();
    gameOverAnimation();
    init();
    gameStarted = false;
  }
}
//initializer
function init() {
  index = 0;
  currentLevel = 0;
  randomPattern = [];
}
//game Over animation
function gameOverAnimation() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
}
// Add additional color to randomPattern
function levelUp() {
  randomPattern.push(colorArray[random0to3()]);
  currentLevel++;
}
//Level Declaration
function levelDeclare() {
  $("h1").text("Level " + currentLevel);
}
//animate sequence
function animateSequence() {
  for (i = 0; i < randomPattern.length; i++) {
    (function(i) {
      setTimeout(function() {
        animateClick(randomPattern[i]);
      }, speed * i);
    })(i);
  }
}
//animate button click
function animateClick(button) {
  buttonAnimation("#" + button);
  playSound(button);
}
//button animation
function buttonAnimation(button) {
  $(button).addClass("pressed");
  setTimeout(function() {
    $(button).removeClass("pressed");
  }, 100);
}
//playSound on click
function playSound(color) {
  switch (color) {
    case "red":
      redAudio.play();
      break;

    case "blue":
      blueAudio.play();
      break;

    case "yellow":
      yellowAudio.play();
      break;

    case "green":
      greenAudio.play();
      break;

    default:
  }
}
//0-3 random number generator
function random0to3() {
  return Math.floor(Math.random() * 4);
}

// increase difficulty
function increaseDifficulty() {
  speed -= 25;
}
