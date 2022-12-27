// Important variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// Start the game
$(document).keydown(function(event) {

  if (gameStarted == false && (event.key == "A" || event.key == "a")) {
    gameStarted = true;
    nextSequence();
  }
});

// Level incrementer
function nextSequence() {
  level++;
  userClickedPattern = [];

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

// Click listener
$(".btn").click(function(event) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswers(userClickedPattern.length-1);
});

// Sound player
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// Pressing animation
function animatePress(currentColour) {
  var param = "#" + currentColour;

  $(param).addClass("pressed");
  const classTimer = setTimeout(function() {
    $(param).removeClass("pressed");
  }, 100);
};

// Check to see if player pattern is correct
function checkAnswers(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("SUCCESS");

    if(userClickedPattern.length == gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("FAILURE");
    setTimeout(function(){
      $("#level-title").text("Game Over, Press A To Try Again");
      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      playSound("wrong");
    }, 1000);
    startOver();
  }
};

function startOver(){
  level = 0
  gamePattern = [];
  gameStarted = false;
}
