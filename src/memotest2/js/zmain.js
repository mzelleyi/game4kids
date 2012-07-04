var cards=[];
var order=0;
var currIndex=0;
var taps=0;
var taps2=0;
var seconds=0;
var score=0;
var score2=0;
var goals=0;
var points=100;
var timer;
var player=1;
var is_flipping = false;

//var valores = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];	
var qs = (function(a) {
  if (a == "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i)
{
  var p=a[i].split('=');
  if (p.length != 2) continue;
  b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
}
return b;
})(window.location.search.substr(1).split('&'));



var level = ('level' in qs)? qs.level: 'easy';
if ( level === 'easy') {
  var valores = [
    0, 1, 2, 3, 4, 5, 6, 7,
    0, 1, 2, 3, 4, 5, 6, 7
      ];	
} else if ( level === 'middle' ){

  var valores = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
    ];	
} else {

  var valores = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12 
      ];	
}



//**********************************
// Init, show and start game
//**********************************
var initGame = function (){
  //show the content
  $("#gameContent").fadeIn('slow');
  $("#board").html("");

  if ( level === 'easy') {
    $('#board').css('width', '600px');
  } else if ( level === 'middle' ) {
    $('#board').css('width', '800px');
  } else {
    $('#board').css('width', '1000px');
  }   
  //set card template
  markup="<div class='holder' id='holder${cardId}' style='display:none'><div class='card' style='background-position:${position}px' id='card${cardId}' num='${cardId}'><img class='question' src='images/xx.png'></div></div>";
  //shuffle valores
  valores = $.shuffle(valores);

  //create cards
  for(i=0;i<valores.length;i++)
  {
    var data = { cardId: i, position: valores[i]*-128, val: valores[i] };

    $.template( "cardTemplate", markup );
    $.tmpl( "cardTemplate", data ).appendTo( "#board" );			
  }

  //show cards
  currIndex=0;
  showCard();
  $('#player'+player).addClass("playerselected");
}

var showCard = function(){
  if(currIndex<valores.length){			
    $("#holder" + currIndex).fadeIn('fast',showCard);
    currIndex++;
  }
  else
  {
    startGame();
  }
}	

var startGame = function(){
  //enable cards click 
  $('.card').addClass("enabled");		 		
  $('.enabled').live('click', function(e) {                      
    showFace($(this));
  });

  //reset  & show counters
  goals=0;
  taps=0;
  taps2=0;
  seconds=300;	  
  score=0;		   
  score2=0;		   
  $("#tapsCount").html(taps);
  $("#tapsCount2").html(taps2);
  $("#timeCount").html(seconds);
  $("#scoreCount").html(score);
  $("#scoreCount2").html(score2);

  //start the timer
  timer=setInterval("updateSeconds()",1000);

  //play start sound
  var audio_file1 = document.getElementById('audio_09');
  audio_file1.play();

  //show  restart button
  $("#restart").fadeIn('fast');
  animRestart();		
}

var updateSeconds = function(){
  //update & show seconds
  var callback = function() {
    seconds = 0;
    //MESSAGEandReload("Perdiste!!! ");
    ModalMessage.andReload("Perdiste!!! ");
    clearInterval(timer);
  };
  if (seconds=== 0 ) { callback(); }

  seconds--;
  $("#timeCount").html(seconds);
}

//**********************************
// Show & Hide faces
//**********************************
var showFace = function (card){
  //if is animating don't do nothing
  if(is_flipping)
    return

      //turn on is_flipping
      is_flipping = true;

  //add flipped style
  card.removeClass("enabled");
  card.addClass("flipped");

  $('#board .enabled').addClass("waiting");		
  $('.enabled').die('click');

  //play click sound
  var audio_file1 = document.getElementById('audio_11');
  audio_file1.play();

  //update & show taps
  if (player === 1) { 
    taps++;
    $("#tapsCount").html(taps);
  } else {
    taps2++;
    $("#tapsCount2").html(taps2);
  }

  //save card selected
  cards[order]=card;
  order++;      

  //rotate card selected
  card.find("img.question").rotate({
    angle:0, 
    animateTo:360,
    callback: checkJugada});
  card.find("img.question").fadeOut('slow');
};

var hideFace = function (card){  
  //turn on is_flipping			
  card.find("img.question").fadeIn('slow');
  card.find("img.question").rotate({
    angle:0, 
    animateTo:-360});            
};
var nextplayer = function() {
  $('#player'+player).removeClass("playerselected");
  player = (player === 1)? 2: 1;
  $('#player'+player).addClass("playerselected");
}

//**********************************
// Check jugada and game
//**********************************
var checkJugada = function (){         
  if(order==2){
    if(valores[cards[0].attr("num")]==valores[cards[1].attr("num")])
    { 
      //play goal's sound
      var audio_file1 = document.getElementById('audio_12');
      audio_file1.play();

      //remove classes				
      cards[0].removeClass("flipped");
      cards[1].removeClass("flipped");

      //mark as player
      $("#holder" + cards[0].attr("num")).addClass("played");
      $("#holder" + cards[1].attr("num")).addClass("played");

      //update & show score
      if(player===1) {
        score+=points;
        $("#scoreCount").html(score);
      } else {
        score2+=points;
        $("#scoreCount2").html(score2);
      }
      //update goals
      goals++;

      //reset order
      order=0;

      //increase current points
      points=150;

      //call checkfinish
      checkFinish();

    }
    else
    {
      //play error's sound
      var audio_file1 = document.getElementById('sumamal');
      audio_file1.play();

      //hide faces
      hideFace(cards[0]);
      hideFace(cards[1]);

      //remove flipped style
      cards[0].removeClass("flipped");
      cards[1].removeClass("flipped");
      cards[0].addClass("enabled");
      cards[1].addClass("enabled");

      //reset order
      order=0;

      //decrease current points
      points=100;
      nextplayer();
    }

  } 

  //turn off is_flipping
  is_flipping = false;

  //remove waiting style	  
  $('#board .enabled').removeClass("waiting");		
  //enable cards click 
  $('.enabled').live('click', function(e) {                      
    showFace($(this));
  });
};

var checkFinish = function (){        
  //if complete all couples
  if(goals==(valores.length / 2))
  {
    //stop timer
    clearTimeout(timer);

    //play finish sound
    var audio_file1 = document.getElementById('audio_01');
    audio_file1.play();

    //hide cards
    $(".holder").fadeOut('fast');		

    //show finish message
    $("#kiwi").fadeIn('fast');
    $("#greetings").animate({top: '290px' }, {queue:false, duration:600, easing:'easeOutBounce'});
    $("#kiwi").animate({left: '550px' }, {queue:false, duration:1200, easing:'easeOutBounce'});
  }	
};

function restart(){
  $("#kiwi").fadeOut('slow');
  $("#greetings").animate({top: '-250px' }, {queue:false, duration:600, easing:'easeInBounce'});
  $("#kiwi").animate({left: '1150px' }, {queue:false, duration:600, easing:'easeInBounce'});	

  $("#tapsCount").html("-");
  $("#tapsCount2").html("-");
  $("#timeCount").html("-");
  $("#scoreCount").html("-");
  $("#scoreCount2").html("-");
  clearTimeout(timer);
  initGame();	
}

function animRestart(){
  $("#restart").animate({top:"-=5px"},1000).animate({top:"+=5px"}, 1000);
  setTimeout("animRestart()",2000);
}

//**********************************
// Document ready: preload images and start all
//**********************************
$(document).ready(function() {
  $.preload([
    "images/xx.png",
    "images/fruits.png",
    "images/back.jpg",
    "images/fruits.png"
    ], {
      loaded_all: function(loaded, total) {
        $("#indicator").fadeOut('slow',initGame);                
      }
    });
}); 

