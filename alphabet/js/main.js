function __main__() {

  var xx = [[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,1,0,0,2,2,2,2,2,0,0,0,0 ], 
            [ 0,0,1,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,1,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,1,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,3,3,3,3,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ], 
            [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0 ]]

    , words = [ 'GATO', 'PERRO', 'MATE' ]
    , alphabet = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M',
      'N','O','P', 'Q','R','S','T','U','V','W','X','Y','Z']
    , selectedword = "notselected"
    , htmlwords = $('listwords').getElementsByTagName('li')
    , count = 0
  ;
  
    /* BEGIN events */
 

    function event_win() {
      MESSAGEandReload("GANASTE!!!!");
    }

    function event_right_word(i) {
      $('audio_12').play();

      htmlwords[i].style.display = "none";
      htmlwords[i].onclick = function() {};
    }

    function event_wrong() {
      $('audio_01').play();
    }
    /* END events */


  function select(e) {
    var x, y
      , letter 
      , i
      , htmlwords
    ;


    x = this.id.split('-');
    y = x[1]; x = x[2];
    
    $('audio_00').play();
    if (selectedword !== "notselected" ) {
      if (xx[y][x] !== 0 ) {
        if (selectedword[count] === this.innerHTML) {
          //rotate(this);
          count++;
          this.className = this.className + " selected";
          if (selectedword.length === count) {
            // remove from list
            words = words.filter(function(x) { return x !== selectedword; });
            htmlwords = $('listwords').getElementsByTagName('li');
            for (i=0; i<htmlwords.length; i++) {
              if (htmlwords[i].childNodes[1].innerHTML === selectedword) { 
                event_right_word(i);
              }
            }
            count = 0;
            if (words.length === 0 ){
              event_win();
            }
          }
          return;
        } else {
          event_wrong();
        }
      } else {
        event_wrong();
        return false;
      }
    } else {
      event_wrong();
      MESSAGE("select a word");
    }
    count = 0;
    selectedword = "notselected";
    return false;
  }

  (function() { /* block generate alphabet */
  
  var i, j, row, e
    , divcel  
    , divrow  
    , render = document.getElementById('render')
    , head, tail, pos
    , tmpwords = words.clone()
  ;
    
  for (i=0; i<xx.length; i++) {
    row = xx[i];
    divrow = document.createElement('div');
    divrow.className = "row";
    for (j=0; j<row.length; j++) {
      e = row[j];
      divcel = document.createElement('div');
      divcel.id = "cell-" + String(i) + "-" + String(j);
      divcel.className = "cell";
      
      if (e !== 0) {
        console.log("TMP:" + tmpwords);
        console.log("WDS:" + words);
        head = tmpwords[e-1][0];
        tail = tmpwords[e-1].substring(1);
        tmpwords[e-1] = tail;
      } else {
        pos = Math.floor(Math.random()*alphabet.length);
        head = alphabet[pos];
      }
      divcel.onclick = select;
      divcel.appendChild(document.createTextNode(head));
      divrow.appendChild(divcel);
    }
    render.appendChild(divrow);
  }
  })();        /* end block generation */


  (function() {/* block generate listwords */
    var list = document.getElementById('listwords')
      , i = 0
      , w = ""
      , e, s, div
    ;

    var timerwrapper = document.createElement('div');
    timerwrapper.id = "timer";
    list.appendChild(timerwrapper);
    TIMER(timerwrapper); 
    for (i=0; i<words.length; i++) {
      w = words[i];
      e = document.createElement('li');
      s = document.createElement('div');
      div = document.createElement('div');

      s.className = 'butterfly';
      div.appendChild(document.createTextNode(w));
      e.appendChild(s);
      e.appendChild(div);

      /* BEGIN select a word of the menu */
      e.onclick = function(e) {
        var lis = $('listwords').getElementsByTagName('li')
          , i, text, butterfly
        ;
        butterfly = this.childNodes[0];
        text = this.childNodes[1];

        $('audio_11').play();
        butterfly_effect(butterfly);
        for (i=0; i<lis.length; i++) {
          lis[i].className ="";
        }
        selectedword = text.innerHTML;
        this.className ="menuselected";
        return false;
      };
      /* END onclick in words of the menu */

      list.appendChild(e);
    }
  })();        /* end block generate listwords */


}


