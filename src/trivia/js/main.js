var i= 0;


setInterval(function() {
  i = ((i + 1) % 4);
  $('body').style.backgroundImage = "url('images/fondo" + i +".png')";
}, 5000);

function __main__() {
  var level = ('level' in qs)? qs.level: 'easy';
  var points = 0;
  var positions = [];
    
  position = Math.floor(Math.random() * (riddles.length - 1));

  function shuffle(list) {
    var i, j, t;
    for (i = 1; i < list.length; i++) {
      j = Math.floor(Math.random()*(1+i));  // choose j in [0..i]
      if (j != i) {
        t = list[i];                        // swap list[i] and list[j]
        list[i] = list[j];
        list[j] = t;
      }
    }
    return list;
  }
  for (var i=0; i<riddles.length; i++) {
    positions[positions.length] = i;
  }
  positions = shuffle(positions);


  function make_question(q, callback) {
    var o = $('render')
      , message_question = document.createElement('p')
      , buttons_wrapper = document.createElement('div')
      , message_button 
    ;

    $('audio_11').play();
    message_question.appendChild(document.createTextNode(q.question));

    /* remove all childnodes and append the new one */
    while (o.hasChildNodes()) { o.removeChild(o.firstChild); }
    o.appendChild(message_question);

    buttons_wrapper.id = 'buttonswrapper';
    for (var i= 0; i< q.options.length; i++) {
      message_button = document.createElement('a');
      message_button.href = "javascript:void(0);";
      message_button.appendChild(document.createTextNode(q.options[i]));
      message_button.onclick = (function (index) {
        return function(e) {
          callback({ response: index, riddle: q } );
        };
      })(i);
      buttons_wrapper.appendChild(message_button);
    }
    o.appendChild(buttons_wrapper);
    /* end */

  }


  function loop(event) {
    event = (event) ? event: {};
    event.response = ('response' in event)? event.response: 3;
    event.riddle   = ('riddle'   in event)? event.riddle  : 'invalid';

    if ((event.response !== 3) && (event.response !== event.riddle.answer)) {
      $('music').pause();
      $('looser').play();
      ModalMessage.andRedirect(
          "<a id=lplay href='javascript:void(0)'> <img id=play src=images/perdiste.png> </a>"
      , function() {
        location.reload(true);
        clock.stop();
        return;
      });

      return;
    } else {
      if (event.response === event.riddle.answer) {
        points++;
      }
    }

    if( position < positions.length && points < 3) {
      make_question(riddles[positions[position++]], loop)
    } else {
      $('music').pause();
      $('winner').play();
      clock.stop();
      ModalMessage.andRedirect(
          "<a href='javascript:void(0)'><img style='width:300px' src='images/win.png'></a>" 
      , function() {
        redirectTo('');
        return;
      });
    }
  }

  $('music').pause();
  $('previous').play();
  ModalMessage.andRedirect("<a id=lplay href='javascript:void(0)'> <img id=play src=images/play.png> </a>", function() {
    $('previous').pause();
    $('music').play();
 
    clock.time = 50;
    clock.start();
    loop();
    ModalMessage.close();
    return;
  });
 

}



