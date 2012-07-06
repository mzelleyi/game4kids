function __main__() {
  var level = ('level' in qs)? qs.level: 'easy';
  var points = 0;
  var riddles = [];
    
  position = 0;
  if (level === 'easy') {
    riddles = [
    {
      question: "Blanca es mi cabeza, y los dientes que tengo, no por ser viejito, se me irán cayendo",
      options: [ 'Coliflor', 'Ajo', 'Cebolla' ] ,
      answer: 1
    },
    {
      question: "La comen los pajaritos, con carne o con mucho queso. Amarilla es como el polen, ¿Con que termina el verso?",
      options: [ 'Tallarines', 'Pan', 'Polenta' ] ,
      answer: 2
    },
    {
      question: "Flacos y largos, cual nadadores, caen por el agua sin flotadores",
      options: [ 'Zanahoria', 'Arroz', 'Fideos' ] ,
      answer: 2
    },
    {
      question: "Si fueras a China un día, y estuvieras en Pekin, a estas frutas llamarías, la esposa del mandarin",
      options: [ 'Mandarina', 'Manzana', 'Pomelo' ] ,
      answer: 0
    },
    {
      question: "Dos veces me dicen Ana, y aunque detesto pelear, si a pura piña me llaman, pura piña han de encontrar",
      options: [ 'Pintura', 'Anana', 'Piñata' ] ,
      answer: 1
    },
    {
      question: "A esta en racimo la quieren, por su sabor dulce y fino. Pero algunos la prefieren, porque les recuerda al vino",
      options: [ 'Cereza', 'Uva', 'Frutilla' ] ,
      answer: 1
    },
    {
      question: "Parece que es la mas sana, más sana que fruta alguna. Al verla me vienen ganas de comer cuatro no una",
      options: [ 'Cereza', 'Manzana', 'Frutilla' ] ,
      answer: 1
    },
    {
      question: "Es fruta de suave piel, aunque comience con dura. Al sabor es siempre fiel, y en almibar... de locura!",
      options: [ 'Durazno', 'Manzana', 'Pera' ] ,
      answer: 0
    },
    {
      question: "Llevo en mi nombre a las damas, y de coraje el comienzo, me sacan la piel, me comen, y lejos tiran mis huesos",
      options: [ 'Durazno', 'Aceituna', 'Damasco' ] ,
      answer: 2
    },
    {
      question: "Del Brasil se vino a dedo, con traje amarillo y mozo. Se deja comer sin miedo, porque no tiene carozo",
      options: [ 'Banana', 'Uva', 'Naranja' ] ,
      answer: 0
    },
    {
      question: "¿Que ves, que ves?, ¿Que siempre parece y no es?",
      options: [ 'Nuez', 'Almendra', 'Pez' ] ,
      answer: 0
    },
    {
      question: "Es grandote, muy panzón, y con jamon se utiliza. Al que nace cabezón, su cabeza así bautizan",
      options: [ 'Sandía', 'Melón', 'Pomelo' ] ,
      answer: 1
    },
    {
      question: "Si la cocina mama, con cuanto sabor carga. Hay que ver que gusto da, ¡ver! con la b larga",
      options: [ 'Verdura', 'Banana', 'Berenjena' ] ,
      answer: 2
    },
    {
      question: "Por su dulzor siempre te atrapa, sola o con otro comida, en verdad es una papa, que quiere endulzar su vida",
      options: [ 'Batata', 'Papa', 'Zapallo' ] ,
      answer: 0
    },
    
    ];

  } else if (level === 'middle') {
    riddles = [
    {
      question: "Es re-rica, una monada. Re-comerla es un placer. Por fuera es re-colorada, y por dentro también",
      options: [ 'Frutilla', 'Rabanito', 'Remolacha' ] ,
      answer: 2
    },
    {
      question: "Adivina, adivinador: ¿Que es lo que tiene 3 dientes y tres letras menos que entendedor?",
      options: [ 'Tenedor', 'Ajo', 'Cuchara' ] ,
      answer: 0
    },
    {
      question: "Tiene pe de pino, pero un pino no es. Y al igual que un pino, es bien verde lo que ves",
      options: [ 'Pescado', 'Pepino', 'Palmera' ] ,
      answer: 1
    },
    {
      question: "Soy verde por fuera, y no soy un melón. Porque es rojo y dulce, mi buen corazón",
      options: [ 'Sandia', 'Palta', 'Manzana' ] ,
      answer: 0
    },
    {
      question: "Blanca es mi cabeza, y los dientes que tengo, no por ser viejito, se me irán cayendo",
      options: [ 'Coliflor', 'Ajo', 'Cebolla' ] ,
      answer: 1
    },
    {
      question: "La comen los pajaritos, con carne o con mucho queso. Amarilla es como el polen, ¿Con que termina el verso?",
      options: [ 'Tallarines', 'Pan', 'Polenta' ] ,
      answer: 2
    },
    {
      question: "Flacos y largos, cual nadadores, caen por el agua sin flotadores",
      options: [ 'Zanahoria', 'Arroz', 'Fideos' ] ,
      answer: 2
    },
    {
      question: "A esta en racimo la quieren, por su sabor dulce y fino. Pero algunos la prefieren, porque les recuerda al vino",
      options: [ 'Cereza', 'Uva', 'Frutilla' ] ,
      answer: 1
    },
    {
      question: "Parece que es la mas sana, más sana que fruta alguna. Al verla me vienen ganas de comer cuatro no una",
      options: [ 'Cereza', 'Manzana', 'Frutilla' ] ,
      answer: 1
    },
    {
      question: "Es fruta de suave piel, aunque comience con dura. Al sabor es siempre fiel, y en almibar... de locura!",
      options: [ 'Durazno', 'Manzana', 'Pera' ] ,
      answer: 0
    },
    {
      question: "Llevo en mi nombre a las damas, y de coraje el comienzo, me sacan la piel, me comen, y lejos tiran mis huesos",
      options: [ 'Durazno', 'Aceituna', 'Damasco' ] ,
      answer: 2
    },
    {
      question: "Del Brasil se vino a dedo, con traje amarillo y mozo. Se deja comer sin miedo, porque no tiene carozo",
      options: [ 'Banana', 'Uva', 'Naranja' ] ,
      answer: 0
    },
    {
      question: "¿Que ves, que ves?, ¿Que siempre parece y no es?",
      options: [ 'Nuez', 'Almendra', 'Pez' ] ,
      answer: 0
    },
    {
      question: "Es grandote, muy panzón, y con jamon se utiliza. Al que nace cabezón, su cabeza así bautizan",
      options: [ 'Sandía', 'Melón', 'Pomelo' ] ,
      answer: 1
    },
    {
      question: "Si la cocina mama, con cuanto sabor carga. Hay que ver que gusto da, ¡ver! con la b larga",
      options: [ 'Verdura', 'Banana', 'Berenjena' ] ,
      answer: 2
    },
    {
      question: "¡En guiso que belleza!, saborearlo es un encanto. Pero termina en la mesa, del truco anotando un tanto",
      options: [ 'Lentejas', 'Poroto', 'Arroz' ] ,
      answer: 1
    },
    {
      question: "Por su dulzor siempre te atrapa, sola o con otro comida, en verdad es una papa, que quiere endulzar su vida",
      options: [ 'Batata', 'Papa', 'Zapallo' ] ,
      answer: 0
    },
    {
      question: "Redondo como pelota, y de sabor amarguito. ¿Una naranja grandota, o un melón pequeñito?",
      options: [ 'Naranja', 'Mandaria', 'Pomelo' ] ,
      answer: 2
    },
    {
      question: "Mi sabor dulce alucina, aunque solamente huelo, cuando al fuego me cocinan para hacerme caramelo",
      options: [ 'Batata', 'Azúcar', 'Aceite' ] ,
      answer: 1
    },
    {
      question: "Salada vive en el mar, dulce en el río se cría. En el desierto es normal, morir sin su compañia",
      options: [ 'Leche', 'Jugo', 'Agua' ] ,
      answer: 2
    }
    ];
  } else {
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
    },
    {
      question: "No toma leche, No toma cafe. ¿Mate toma, o tan solo toma te?",
      options: [ 'Yerba', 'Tomate', 'Taza' ] ,
      answer: 1
    },
    {
      question: "Dicen que ayuda a la vista de jóvenes y de viejos. Y es la primera en la lista del menú de los conejos",
      options: [ 'Acelga', 'Lechuga', 'Zanahoria' ] ,
      answer: 2
    },
    {
      question: "Anda bien con el ají, Colorado y picotón. Por su nombre para mi, tendría que ser marrón",
      options: [ 'Morrón', 'Pimiento', 'Tomate' ] ,
      answer: 0
    },
    {
      question: "Es re-rica, una monada. Re-comerla es un placer. Por fuera es re-colorada, y por dentro también",
      options: [ 'Frutilla', 'Rabanito', 'Remolacha' ] ,
      answer: 2
    },
    {
      question: "Adivina, adivinador: ¿Que es lo que tiene 3 dientes y tres letras menos que entendedor?",
      options: [ 'Tenedor', 'Ajo', 'Cuchara' ] ,
      answer: 0
    },
    {
      question: "Tiene pe de pino, pero un pino no es. Y al igual que un pino, es bien verde lo que ves",
      options: [ 'Pescado', 'Pepino', 'Palmera' ] ,
      answer: 1
    },
    {
      question: "Soy verde por fuera, y no soy un melón. Porque es rojo y dulce, mi buen corazón",
      options: [ 'Sandia', 'Palta', 'Manzana' ] ,
      answer: 0
    },
    {
      question: "Blanca es mi cabeza, y los dientes que tengo, no por ser viejito, se me irán cayendo",
      options: [ 'Coliflor', 'Ajo', 'Cebolla' ] ,
      answer: 1
    },
    {
      question: "La comen los pajaritos, con carne o con mucho queso. Amarilla es como el polen, ¿Con que termina el verso?",
      options: [ 'Tallarines', 'Pan', 'Polenta' ] ,
      answer: 2
    },
    {
      question: "Flacos y largos, cual nadadores, caen por el agua sin flotadores",
      options: [ 'Zanahoria', 'Arroz', 'Fideos' ] ,
      answer: 2
    },
    {
      question: "Si fueras a China un día, y estuvieras en Pekin, a estas frutas llamarías, la esposa del mandarin",
      options: [ 'Mandarina', 'Manzana', 'Pomelo' ] ,
      answer: 0
    },
    {
      question: "Dos veces me dicen Ana, y aunque detesto pelear, si a pura piña me llaman, pura piña han de encontrar",
      options: [ 'Pintura', 'Anana', 'Piñata' ] ,
      answer: 1
    },
    {
      question: "A esta en racimo la quieren, por su sabor dulce y fino. Pero algunos la prefieren, porque les recuerda al vino",
      options: [ 'Cereza', 'Uva', 'Frutilla' ] ,
      answer: 1
    },
    {
      question: "Parece que es la mas sana, más sana que fruta alguna. Al verla me vienen ganas de comer cuatro no una",
      options: [ 'Cereza', 'Manzana', 'Frutilla' ] ,
      answer: 1
    },
    {
      question: "Es fruta de suave piel, aunque comience con dura. Al sabor es siempre fiel, y en almibar... de locura!",
      options: [ 'Durazno', 'Manzana', 'Pera' ] ,
      answer: 0
    },
    {
      question: "Llevo en mi nombre a las damas, y de coraje el comienzo, me sacan la piel, me comen, y lejos tiran mis huesos",
      options: [ 'Durazno', 'Aceituna', 'Damasco' ] ,
      answer: 2
    },
    {
      question: "Del Brasil se vino a dedo, con traje amarillo y mozo. Se deja comer sin miedo, porque no tiene carozo",
      options: [ 'Banana', 'Uva', 'Naranja' ] ,
      answer: 0
    },
    {
      question: "¿Que ves, que ves?, ¿Que siempre parece y no es?",
      options: [ 'Nuez', 'Almendra', 'Pez' ] ,
      answer: 0
    },
    {
      question: "Es grandote, muy panzón, y con jamon se utiliza. Al que nace cabezón, su cabeza así bautizan",
      options: [ 'Sandía', 'Melón', 'Pomelo' ] ,
      answer: 1
    },
    {
      question: "Si la cocina mama, con cuanto sabor carga. Hay que ver que gusto da, ¡ver! con la b larga",
      options: [ 'Verdura', 'Banana', 'Berenjena' ] ,
      answer: 2
    },
    {
      question: "¡En guiso que belleza!, saborearlo es un encanto. Pero termina en la mesa, del truco anotando un tanto",
      options: [ 'Lentejas', 'Poroto', 'Arroz' ] ,
      answer: 1
    },
    {
      question: "Por su dulzor siempre te atrapa, sola o con otro comida, en verdad es una papa, que quiere endulzar su vida",
      options: [ 'Batata', 'Papa', 'Zapallo' ] ,
      answer: 0
    },
    {
      question: "Redondo como pelota, y de sabor amarguito. ¿Una naranja grandota, o un melón pequeñito?",
      options: [ 'Naranja', 'Mandaria', 'Pomelo' ] ,
      answer: 2
    },
    {
      question: "Mi sabor dulce alucina, aunque solamente huelo, cuando al fuego me cocinan para hacerme caramelo",
      options: [ 'Batata', 'Azúcar', 'Aceite' ] ,
      answer: 1
    },
    {
      question: "Salada vive en el mar, dulce en el río se cría. En el desierto es normal, morir sin su compañia",
      options: [ 'Leche', 'Jugo', 'Agua' ] ,
      answer: 2
    }
    ];
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



