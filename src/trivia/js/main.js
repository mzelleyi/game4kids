function __main__() {
  var level = ('level' in qs)? qs.level: 'easy';
  var points = 0;
  var riddles = [];
  var positions = [];
    
  position = 0;
  if (level === 'easy') {
    riddles = [
    {
      question: 'El Ministerio de la Vivienda organizó en julio los encuentros "Conociendo a mi vecino". Uno de los objetivos era:',
      options: [ 'Que se conozcan los vecinos que antes de Navidad estarán en su casa propia.', 'Que se conozcan los vecinos que ya están viviendo en su casa propia.', 'Que se presenten los 50.000 vecinos al Gobernador Poggi.' ] ,
      answer: 0
    },
    {
      question: "La política habitacional de San Luis ostenta un récord en la República Argentina,",
      options: [ 'Se construyeron 120.000 casas con el Ministerio de Vivienda', 'Es que una de cada dos familias vive en una casa construida por el Estado Provincial.', 'Las casas construidas son las mas grandes del país.' ] ,
      answer: 1
    },
    {
      question: "El costo de escriturar tu casa y hacerte Dueño es:",
      options: [ 'Como máximo $800 en cuotas de $100.', '$2.500 en tres cuotas de $500', 'De el 3% del valor de la casa, aproximadamente $3.000' ] ,
      answer: 0
    },
    {
      question: "El Gobernador Claudio POGGI entrega viviendas",
      options: [ 'Aun no entrega viviendas, comenzará en Diciembre del 2012', 'Todos los meses.', 'Dos viviendas cada tres meses.' ] ,
      answer: 1
    }
   
    ];

  } else if (level === 'middle') {
    // middle
    riddles = [];
  } else {
    riddles = [];
  }

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

    if( position < positions.length ) {
      make_question(riddles[positions[position++]], loop)
    } else {
      //clock.stop();
      ModalMessage.andRedirect(
          "Terminaste!!! hiciste " + points + " puntos!!! <br>"
      , function() {
        redirectTo('../index.html');
        return;
      });
    }



  }
  loop(); 
}



