var i= 0;

setInterval(function() {
  i = ((i + 1) % 4);
  $('body').style.backgroundImage = "url('images/fondo" + i +".png')";
}, 5000);

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
    },
    {
      question: "El acceso a una vivienda digna es:",
      options: [ 'Un lujo de quien pueda tenerla.', 'Es imposible en San Luis', 'Es un derecho de quien la necesita' ] ,
      answer: 2
    },
    {
      question: "El Gobierno de la Provincia de San Luis construyó y entregó",
      options: [ 'Más de 55.000 viviendas', '1.500 viviendas', 'Un poco más de 10.000 viviendas' ] ,
      answer: 0
    },
    {
      question: "En la actualidad hay en marcha de construcción",
      options: [ 'Aproximadamente 146 viviendas sociales', 'Aproximadamente 1000 viviendas sociales', 'Aproximadamente 2000 viviendas sociales' ] ,
      answer: 2
    },
    {
      question: "A pesar de ser llamadas ‘Viviendas Sociales’, las casas que construye el Estado Provincial son realizadas con material de primera calidad, poseen tres ambientes",
      options: [ 'No, se construyen con materiales reciclados y económicos', 'No, solo poseen un ambiente amplio', 'Si, los materiales son de primera calidad y poseen tres ambientes' ] ,
      answer: 2
    },
    {
      question: "Siguiendo las políticas del Gobierno Provincial se están construyendo viviendas en toda la Provincia",
      options: [ 'No, solo se construyen en la ciudad de San Luis', 'Se construyen en todo el territorio provincial', 'Se construyen en la ciudad de San Luis, Merlo y Villa Mercedes' ] ,
      answer: 1
    },
    {
      question: "Internos del servicio penitenciario realizarán materiales para el Plan Solidaridad",
      options: [ 'Realizarán puertas y ventanas de maderas y metálicas para el Plan de viviendas.', 'Los internos no pueden tener ningún tipo de vínculo con la sociedad', 'Todos los internos trabajarán en las obras de construcción de viviendas.' ] ,
      answer: 0
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
      ModalMessage.andRedirect(
          "Perdiste!!!"
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

    if( position < positions.length ) {
      make_question(riddles[positions[position++]], loop)
    } else {
      clock.stop();
      ModalMessage.andRedirect(
          "Terminaste!!! hiciste " + points + " puntos!!! <br>"
      , function() {
        redirectTo('');
        return;
      });
    }
  }

  ModalMessage.andRedirect("<a id=lplay href='javascript:void(0)'> <img id=play src=images/play.png> </a>", function() {
    clock.time = 300;
    clock.start();
    loop();
    ModalMessage.close();
    return;
  });
 

}



