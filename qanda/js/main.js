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
        harina:           { img: 'harina.png'          , label: 'Harina'             }, 
        arroz:            { img: 'arroz.png'           , label: 'Arroz'              }, 
        manteca:          { img: 'manteca.png'         , label: 'Manteca'            }, 
        mani:             { img: 'mani.png'            , label: 'Mani'               }, 
        agua:             { img: 'agua.png'            , label: 'Agua'               }, 
        leche:            { img: 'leche.png'           , label: 'Leche'              }, 
        carnes:           { img: 'carnes.png'          , label: 'Carnes'             }, 
        pollo:            { img: 'pollo.png'           , label: 'Pollo'              }, 
        polenta:          { img: 'polenta.png'         , label: 'Polenta'            }, 
        lentejas:         { img: 'lentejas.png'        , label: 'Lentejas'           }, 
        pan:              { img: 'pan.png'             , label: 'Pan'                }, 
        galletitasagua:   { img: 'galletitasagua.png'  , label: 'Galletitas de agua' }, 
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
        pera:                  0 , 
        gaseosa:               2 , 
        chocolate:             2 , 
        caramelos:             2 , 
        mermelada:             0 , 
        banana:                0 , 
        sandia:                0 , 
        uvas:                  2 , 
        naranja:               2 , 
        galletitasdulces:      0 ,
        yogur:                 0 , 
        flan:                  2 , 
        huevos:                1 , 
        harina:                1 , 
        arroz:                 1 , 
        manteca:               2 , 
        mani:                  1 , 
        agua:                  1 , 
        leche:                 0 , 
        carnes:                1 , 
        pollo:                 1 , 
        polenta:               1 , 
        lentejas:              1 , 
        pan:                   2 , 
        galletitasagua:        2 , 
        fideos:                1 , 
        berenjenas:            1 , 
        cebolla:               1 , 
        tomate:                1 ,
        lechuga:               1 , 
        palta:                 1 , 
        queso:                 1 , 
        pescado:               1 , 
        papa:                  1 
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


