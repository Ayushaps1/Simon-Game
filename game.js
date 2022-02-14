var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var Level = 0;

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(event){
    if(!started){
        if((Level === 0 && event.key.toLowerCase() === "a") || Level != 0){
            Level = 0;
            $("#level-title").text("Level: " + Level)
            nextSequence();
            started = true;
        }
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Adding flash animation in button using jquery or javascript
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);   

    playSound(randomChosenColor);

}

function playSound(name){

    // Play song according to pressed buttons
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.2
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success.");

        if(userClickedPattern.length === gamePattern.length){
            console.log("leveup")

            userClickedPattern = []
            Level++;
            $("h1").text("Level: " + Level);

            // Make a call for nextSequence after every level
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }

    }
    else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart.");
        
        startOver()
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    }

}

function startOver(){
    started = false;
    userClickedPattern = [];
    gamePattern = [];
}
