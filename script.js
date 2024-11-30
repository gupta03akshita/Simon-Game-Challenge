// ARRAY CONTAINING THE COLORS FOR THE BUTTONS
var buttonColor = ["red", "blue", "green", "yellow"];

// ARRAY TO STORE THE GAME'S PATTERN
var gamePattern = [];

// ARRAY TO STORE THE USER'S CLICKED PATTERN
var userClickedPattern = [];

// INITIALIZE GAME LEVEL AND STARTED STATE
var level = 0;
var started = false;

// LISTEN FOR A KEY PRESS TO START THE GAME
$(document).keypress(function () {
    if (!started) {
        started = true;
        nextSequence();
    }
});

// LISTEN FOR BUTTON CLICKS FROM THE USER
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length) - 1);
});

// FUNCTION TO CHECK THE USER'S ANSWER
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // IF THE ANSWER IS WRONG
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("GAME OVER! PRESS ANY KEY TO RESTART");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        // RESET THE GAME
        startOver();
    }
}

// FUNCTION TO RESET THE GAME
function startOver() {
    level = 0; // RESET LEVEL
    gamePattern = []; // CLEAR GAME PATTERN
    started = false; // RESET STARTED FLAG
}

// FUNCTION TO GENERATE THE NEXT SEQUENCE IN THE GAME
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("LEVEL " + level);
    var num = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[num];
    gamePattern.push(randomChosenColour);

    // ANIMATE THE BUTTON TO SHOW THE NEXT COLOR
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// FUNCTION TO PLAY THE SOUND ASSOCIATED WITH THE COLOR
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// FUNCTION TO ANIMATE THE BUTTON PRESSED
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
