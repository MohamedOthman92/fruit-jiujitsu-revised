var playing = false;
var score;
var trials;
var step;
var fruits = ['banana', 'grapes', 'cherry', 'mango', 'pear', 'peach', 'apple', 'watermelon', 'orange']

$(function(){
    //click on start/reset button
   $("#startReset").click(function(){
      // we are playing
       if(playing == true){
          location.reload();
          }else{
              //we are not playing
              playing = true; //game initiated
              
              score = 0; //set score to 0 
              $("#scoreValue").html(score);
              
              //show trials left
              $("#trials").show();
              trials = 3;
              addHearts();
              
              //hide game over box
              $("#gameOver").hide();
              
              //change button to reset game
              $("#startReset").html("Reset Game");
              
              //start sending fruits
              startAction();
          }
   }); 
    
//slice a fruit

$("#fruit1").mouseover(function(){
    score++;
    $("#scoreValue").html(score); //update score
//    document.getElementById("slash").play();
    $("#slash")[0].play();
    //stop fruit and hiding it
   clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode", 500)
    
    //send new fruit
    setTimeout(startAction, 500);
})


function startAction(){
    
    //generate fruit
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left': Math.round(Math.random()*550), 'top':-100}); //random position
   
    //generate random step
   step = 1 + Math.round(5*Math.random()) //change step
    //Move fruit down a step every 10ms
    action = setInterval(function(){
        
        $("#fruit1").css("top",$("#fruit1").position().top+step) //move fruit down one step
        // check if too low
        if($("#fruit1").position().top > $("#playArea").height()){
            //check if any trials left
            if(trials > 1){
                //generate fruit
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({'left': Math.round(Math.random()*550), 'top':-100}); //random position
   
    //generate random step
   step = 1 + Math.round(5*Math.random()) //change step
                
                //reduce trials by one
                trials --;
                
                //populate trials left box
                addHearts();
            }else{ //game over
                playing = false; //not playing anymore
                $("#startReset").html("Start Game"); // change button to start game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over</p><p>Your score is: '+score+'</p>');
                $("#trials").hide();
                stopAction();
            }
        }
    },7)
}

function addHearts(){
        $("#trials").empty();
       for(i=0;i<trials;i++){
                  $("#trials").append("<img class='life' src='images/heart.png'>");
              }
}


//generate random fruit 

function chooseFruit(){
    $("#fruit1").attr('src','images/'+fruits[Math.round(8*Math.random())]+'.png')
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
    
});
