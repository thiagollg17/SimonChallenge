var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern =[];


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playsound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playsound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){

    userClickedPattern=[];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.round((Math.random()*3));

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);

    //var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    //audio.play();  
    
}

function animatePress(currentColour){
    
    var activo=$("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        activo.removeClass("pressed");
    }, 100);
    
}

var started=false;
var level = 0;

$(document).keydown(function(){
    
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playsound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("level-title").text("Game over");

        starover();

    }
}


function starover(){
    started=false;
    level=0;
    gamePattern= [];
    $("#level-title").text("Press a Key")
}




