

// 3. Create an array called buttonColours that will hold the sequence "red", "blue", "green", "yellow"

var buttonColours = ["red", "blue", "green", "yellow"];

// 5. Create a new empty array called gamePattern
var gamePattern = [];

// Create an empty array for userClickedPattern
var userClickedPattern = [];

var start = false;

var level = 0;

$(document).keydown(function() {

    if(!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }

});



// 1. Create a new function called nextSequence 

function nextSequence () {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);


    // 2. Generate a new random number from 0 to 3 and store it in a variable called randomNumber

    var randomNumber = Math.floor(Math.random() * 4);

    // 4. Create a new variable called randomChosenColour and use the randomNumber to select a randomColour from the buttonColours array
    var randomChosenColour = buttonColours[randomNumber];

    // 6. Add the new randomChosenColour to the end of gamePattern array
    gamePattern.push(randomChosenColour);


    // 7. Use Jquery to select the button with the id of randomChosenColour
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Call the playSound 
    playSound(randomChosenColour);

}




// function to check the answer

function chechAnswer (currentLevel) {
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) 
        {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
     }
     else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any Key to Restart");


        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
       
        startOver();

     } 

}



// 8. Function to playSound
function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// Select the clicked Button 
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    chechAnswer(userClickedPattern.length-1);
    

});



// Creata a function called animatePress
function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);


}



function startOver () {
    level = 0;
    gamePattern = [];
    start = false;
}





