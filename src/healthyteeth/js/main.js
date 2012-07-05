function __main__() {
  var level = ('level' in qs)? qs.level: 'easy';
  var points = 0;
  var riddles = [];
    
  position = 0;
  if (level === 'easy') {
    riddles = [ 
      {
        question: "Cuando la pela y pela, mi madre en el dulce hogar parece telenovela: Como la hace llorar!",
        options: [ 'Cebolla', 'Manzana', 'Naranja' ] ,
        answer: 0 
      },
      {
        question: "De la ensalada es la diosa, aunque tenga alguna arruga, quien crea que no es sabrosa, que pregunte a una tortuga.",
        options: [ 'Lechuga', 'Achicoria', 'Tomate' ] ,
        answer: 0 
      },
      {
        question: "¿Es un repollo doctor? ¿O es una flor super star? ¿Es Verdura, acaso Flor o ambas cosas a la par?", 
        options: [ 'Coliflor', 'Achicoria', 'Tomate' ] ,
        answer: 0 
      }
    ];

  } else if (level === 'middle') {
    console.log("level not implemented");
  } else {
    console.log("level not implemented");
  }



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
      $('audio_01').play();
      ModalMessage.show("Tienes otro intento!");
      points = (points === 0)? 0: points - 1;
      return;
    } else {
      if (event.response === event.riddle.answer) {
        points++;
        // update points
      }
    }

    if( position < riddles.length ) {
      make_question(riddles[position++], loop)
    } else {
      clock.stop();
      ModalMessage.andRedirect(
          "Terminaste!!! hiciste " + points + " puntos!!! <br>" +
          "Y te sobraron " + clock.time + " segundos. Total de puntos: " +
          String(clock.time + points)
      , function() {
        redirectTo('../index.html');
        return;
      });
    }



  }
  loop(); 
}


