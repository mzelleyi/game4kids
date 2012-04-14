function __main__() {
   sound_manager('soundmanager');
   TIMER('timer');
   var oos = {
        manzana:          { img: 'manzana.png'         , label: 'Manzana'            }, 
        pera:             { img: 'pera.png'            , label: 'Pera'               }, 
        gaseosa:          { img: 'gaseosa.png'         , label: 'Gaseosa'            }, 
        chocolate:        { img: 'chocolate.png'       , label: 'Chocolate'          }, 
        caramelos:        { img: 'caramelos.png'       , label: 'Caramelos'          }, 
        mermelada:        { img: 'mermelada.png'       , label: 'Mermelada'          }, 
        banana:           { img: 'banana.png'          , label: 'Banana'             }, 
        sandia:           { img: 'sandia.png'          , label: 'Sandia'             }, 
        uvas:             { img: 'uvas.png'            , label: 'Uvas'               }, 
        naranja:          { img: 'naranja.png'         , label: 'Naranja'            }, 
        galletitasdulces: { img: 'galletitasdulces.png', label: 'Galletitas dulces'  }, 
        yogur:            { img: 'yogur.png'           , label: 'Yogur'              }, 
        flan:             { img: 'flan.png'            , label: 'Flan'               }, 
        huevos:           { img: 'huevos.png'          , label: 'Huevos'             }, 
        arroz:            { img: 'arroz.png'           , label: 'Arroz'              }, 
        manteca:          { img: 'manteca.png'         , label: 'Manteca'            }, 
        mani:             { img: 'mani.png'            , label: 'Mani'               }, 
        agua:             { img: 'agua.png'            , label: 'Agua'               }, 
        leche:            { img: 'leche.png'           , label: 'Leche'              }, 
        carnes:           { img: 'carnes.png'          , label: 'Carnes'             }, 
        pollo:            { img: 'pollo.png'           , label: 'Pollo'              }, 
        pan:              { img: 'pan.png'             , label: 'Pan'                }, 
        fideos:           { img: 'fideos.png'          , label: 'Fideos'             }, 
        berenjenas:       { img: 'berenjenas.png'      , label: 'Berenjenas'         }, 
        cebolla:          { img: 'cebolla.png'         , label: 'Cebolla'            }, 
        tomate:           { img: 'tomate.png'          , label: 'Tomate'             }, 
        lechuga:          { img: 'lechuga.png'         , label: 'Lechuga'            }, 
        palta:            { img: 'palta.png'           , label: 'Palta'              }, 
        queso:            { img: 'queso.png'           , label: 'Queso'              }, 
        pescado:          { img: 'pescado.png'         , label: 'Pescado'            }, 
        papa:             { img: 'papa.png'            , label: 'Papa'               }
  };
 
  
  var xx = {
    c1: {
      question: "¿Es dulce, salado, o depende?",
      options: [ 'Dulce', 'Salado', 'Depende' ] ,
      answer: {
        manzana:               0 , 
        tomate:                1 ,
        pera:                  0 , 
        chocolate:             0 , 
        uvas:                  0 , 
        mani:                  1 , 
        naranja:               0 , 
        flan:                  0 , 
        huevos:                2 , 
        berenjenas:            1 , 
        agua:                  2 , 
        leche:                 2 , 
        carnes:                1 , 
        arroz:                 2 , 
        pollo:                 1 , 
        pan:                   1 , 
        banana:                0 , 
        gaseosa:               0 , 
        fideos:                1 , 
        caramelos:             0 , 
        cebolla:               1 , 
        sandia:                0 , 
        lechuga:               1 , 
        palta:                 1 , 
        yogur:                 0 , 
        queso:                 1 , 
        mermelada:             0 , 
        pescado:               1 , 
        papa:                  1 ,
        galletitasdulces:       0 ,
        manteca:               2   
      }
    } 
  
  };

  function makeQuestions() { /* making all text for question */
    var questions = [];
    ;
    for (var key in xx) {
      if (xx.hasOwnProperty(key)) {
        var motto = xx[key]
          , foods = motto.answer
        ;

        for (var food in foods) {
          if (foods.hasOwnProperty(food)) {
            console.log(food);
            questions[questions.length] =  { 
              html: motto.question,
              answer: foods[food],
              image: oos[food].img,
              label: oos[food].label,
              options: motto.options
            }
          }
        }
      }
    }
    console.log(questions);
    return questions; 
  }
  var questions_object = makeQuestions();
  var questions_pos = 0;


  function make_question(q, callback) {
    var o = $('render')
      , message_question = document.createElement('p')
      , buttons_wrapper = document.createElement('div')
      , message_button 
      , image = new Image(100, 70);
    ;
    
    $('audio_11').play();
    image.src = "images/" + q.image;
    message_question.id = 'question';
    message_question.appendChild(document.createTextNode(q.html));

   /* remove all childnodes and append the new one */
    while (o.hasChildNodes()) { o.removeChild(o.firstChild); }
    o.appendChild(message_question);
    o.appendChild(image);

    buttons_wrapper.id = 'buttonswrapper';
    for (var i= 0; i< q.options.length; i++) {
      message_button = document.createElement('a');
      message_button.href = "javascript:void(0);";
      message_button.appendChild(document.createTextNode(q.options[i]));
      message_button.onclick = (function (index) {
        return function(e) {
          console.log(index);
          callback({ option: index, food: q } );
        };
      })(i);
      buttons_wrapper.appendChild(message_button);
    }
    o.appendChild(buttons_wrapper);
    /* end */
 
  }


  function loop(event) {
    
    if (event && event.option !== event.food.answer ) {
      $('audio_01').play();
      MESSAGE("Tienes otro intento!");
      return;
    }

   
    if( questions_pos < questions_object.length ) {
      make_question(questions_object[questions_pos++], loop)
    } else {
      redirectTo('index2.html');
      return;
    }
    switch (event.option) {
      case 0: 
        var elem = document.createElement('li');
        elem.appendChild(document.createTextNode(event.food.label));
        $('listfood1').appendChild(elem);
        break;
      case 1:
        var elem = document.createElement('li');
        elem.appendChild(document.createTextNode(event.food.label));
        $('listfood2').appendChild(elem);
 
        break;
      case 2:
        var elem1 = document.createElement('li')
          , elem2 = document.createElement('li');
          elem1.appendChild(document.createTextNode(event.food.label));
          elem2.appendChild(document.createTextNode(event.food.label));
          $('listfood1').appendChild(elem1);
          $('listfood2').appendChild(elem2);
 
        break;
    };

  }
  loop(); 
}


