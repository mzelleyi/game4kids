function __main__() {

  var level = ('level' in qs)? qs.level: 'easy'
    , xx = []
    , words = []
    , alphabet = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M',
      'N','O','P', 'Q','R','S','T','U','V','W','X','Y','Z']
    , selectedword = "notselected"
    , htmlwords = $('listwords').getElementsByTagName('li')
    , htmlletters = []
    , count = 0
  ;
  if (level === 'easy') {
    xx = [[ 0,0,0,0,0,0,0,0,0,0, ], 
          [ 0,3,3,3,3,3,3,3,0,0, ], 
          [ 2,0,5,0,0,0,0,0,0,0, ], 
          [ 2,0,5,0,0,0,0,0,0,0, ], 
          [ 2,0,5,0,0,0,0,0,0,0, ], 
          [ 2,0,5,0,0,0,0,0,0,0, ], 
          [ 2,1,5,0,0,0,4,4,4,4, ], 
          [ 0,1,5,6,0,0,0,0,0,0, ], 
          [ 0,1,0,6,0,0,0,0,0,0, ], 
          [ 0,1,0,6,0,0,0,0,0,0, ], 
          [ 0,7,7,7,7,0,0,0,0,0, ], 
          [ 8,8,8,8,0,0,0,0,0,0, ]];

    words = [ 'MIEL', 'CARNE', 'LECHUGA', 'PAPA', 
              'TOMATE', 'UVA', 'KIWI', 'PERA'];

  } else if (level === 'middle' ) {
    xx = [[ 0,4,4,4,4,4,4,4,4,4,0,0 ], 
          [ 0,0,0,0,0,0,7,7,7,7,0,0 ], 
          [ 2,0,0,0,1,0,0,0,0,0,0,0 ], 
          [ 2,0,0,0,1,0,0,0,0,0,0,3 ], 
          [ 2,0,0,0,1,0,0,0,0,0,0,3 ], 
          [ 2,8,0,0,1,0,5,0,0,0,0,3 ], 
          [ 2,8,0,0,0,0,5,0,0,0,0,3 ], 
          [ 2,8,0,0,0,0,5,0,0,0,0,3 ], 
          [ 2,8,6,6,6,0,5,0,0,0,0,3 ], 
          [ 0,8,0,0,0,0,5,0,0,0,0,3 ], 
          [ 0,8,0,0,0,0,5,0,0,0,0,3 ], 
          [ 0,8,0,0,0,0,0,0,9,9,9,9 ]];

 
    words = [ 'APIO', 'REPOLLO', 'ZANAHORIA', 'ACHICORIA', 
              'MORRON', 'UVA', 'KIWI', 'MANZANA', 'PERA'];
 
  } else {
    xx = [[ 0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 8, 5, 0 ],  
          [ 1, 0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 5, 0 ],  
          [ 1, 9, 9, 9, 9, 9, 9, 0, 0,10, 0, 0, 5, 0 ],  
          [ 1, 0, 0, 0, 0, 0, 0, 0, 0,10, 0, 0, 5, 0 ],  
          [ 0, 0, 0, 0,13, 0, 0, 0, 0,10, 0, 0, 5, 0 ],  
          [ 0, 0, 0, 0,13, 0, 0, 0, 0, 0, 0, 0, 5, 0 ],  
          [ 0, 0,11, 0,13, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],  
          [ 0, 6,11, 0,13, 0, 0, 0, 7, 7, 7, 7, 7, 2 ],  
          [ 0, 6,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],  
          [ 0, 6,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],  
          [ 0, 6, 3, 3, 0,12,12,12,12,12,12,12, 0, 0 ],  
          [ 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]];
 
    words = [ 'PAN', 'AGUA', 'TE', 'DULCE', 'ACEITE', 'LECHE', 'QUESO', 'APIO',
              'MORRON', 'UVA', 'KIWI', 'MANZANA', 'PERA'];
  } 

  
  /* BEGIN events */


  function event_win() {
    //ModalMessage.andReload("<img src='images/win.png'>");
    ModalMessage.andRedirect("<img src='images/win.png'>", function() {
      redirectTo('../index.html');
    });
  }

  function event_right_word(i) {
    $('audio_12').play();
    htmlwords[i].style.display = "none";
    htmlwords[i].onclick = function() {};
    ids = [];
  }

  /*
  function event_wrong() {
    var i = 0;
    for(i =0; i<htmlletters.length; i++) {
      removeClass(htmlletters[i], 'selected');
    }
    count = 0;
    $('audio_01').play();
  }
  */
  /* END events */
  function event_wrong() {
    unmark();
    ids = [];
    $('audio_01').play();
  }
 

  /* deprecated 
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
          htmlletters[htmlletters.length] = this; 
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
            selectedword = "notselected";
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
      message.show("Selecciona <br> una palabra!");
    }
    count = 0;
    return false;
  }

  */
  var start = {}
    , end   = {}
    , clicked = false 
    , ids   = [];
  ;
  function mark(o) {
    addClass(o, 'selected');
  }
  function unmark() {
    var i = 0;
    for(i=0; i<ids.length; i++) {
        removeClass($(ids[i]), 'selected');
    }
  }
  function down(evt) {
    clicked = true;
    ids[ids.length] = evt.target.id;
    mark(evt.target);
  }
  function over(evt) {
    if (clicked) {
      mark(evt.target);
      ids[ids.length] = evt.target.id;
    }
  }
  function up(evt) {
    clicked = false;
    proccessWord();
  }
   function proccessWord() {
    var word = "";
    var i = 0;
    
    for (i=0; i<ids.length; i++) {
      word += $(ids[i]).innerHTML;
    }
    if (selectedword === 'notselected') {
        event_wrong();
        ModalMessage.show("Selecciona <br> una palabra!");
 
        return;
    }
    if (word === selectedword) {
      words = words.filter(function(x) { return x !== selectedword; });
      htmlwords = $('listwords').getElementsByTagName('li');
      for (i=0; i<htmlwords.length; i++) {
        if (htmlwords[i].childNodes[1].innerHTML === selectedword) { 
          event_right_word(i);
        }
      }
      count = 0;
 
      selectedword = "notselected";
      if (words.length === 0 ){
        event_win();
      }
    } else {
        event_wrong();
    }
  }


  /*
  function unmark() {
    var ids = [];
    var i = 0;
    var id;
    for(i=start.x; i<=end.x; i++) {
      for (j=start.y; j<= end.y; j++) {
        id = 'cell-'+i+'-'+j;
        removeClass($(id), 'selected');
        
      }
    }
  }
  function down(evt) {
    clicked = true;
    var splits = evt.target.id.substring(5).split("-");
    start.x = parseInt(splits[0]);
    start.y = parseInt(splits[1]);
    mark(evt.target);
  }
  function over(evt) {
    if (clicked) {
      mark(evt.target);
    }
  }
  function up(evt) {
    clicked = false;
    var splits = evt.target.id.substring(5).split("-");
    end.x = parseInt(splits[0]);
    end.y = parseInt(splits[1]);
    proccessWord();
  }
  function proccessWord() {
    var word = "";
    var ids = [];
    var i = 0;
    var from, to, fixed;
    if (start.x === end.x) {
      fixed = start.x;
      from = (start.y > end.y)? end.y  : start.y;
      to   = (start.y > end.y)? start.y: end.y  ;
      for (i=from; i<=to; i++) { ids[ids.length] = 'cell-' + fixed + "-" + i; }

    } else if (start.y === end.y) { 
      fixed = start.y;
      from = (start.x > end.x)? end.x  : start.x;
      to   = (start.x > end.x)? start.x: end.x  ;
      for (i=from; i<=to; i++) { ids[ids.length] = 'cell-' + i +"-" + fixed; }
    } else { 
      console.log("error");
    }
    for (i=0; i<ids.length; i++) {
      word += $(ids[i]).innerHTML;
    }
    if (selectedword === 'notselected') {
        event_wrong();
        unmark();
        ModalMessage.show("Selecciona <br> una palabra!");
        return;
    }
    if (word === selectedword) {
      words = words.filter(function(x) { return x !== selectedword; });
      htmlwords = $('listwords').getElementsByTagName('li');
      for (i=0; i<htmlwords.length; i++) {
        if (htmlwords[i].childNodes[1].innerHTML === selectedword) { 
          event_right_word(i);
        }
      }
      count = 0;
 
      selectedword = "notselected";
      if (words.length === 0 ){
        event_win();
      }
    } else {
        event_wrong();
        unmark();
    }
  }

  */


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
      if      ( level === 'easy'  ) { divcel.style.width = '60px'; }
      else if ( level === 'middle') { divcel.style.width = '50px'; }
      else if ( level === 'hard'  ) { divcel.style.width = '45px'; }
      
      if (e !== 0) {
        //console.log("TMP:" + tmpwords);
        //console.log("WDS:" + words);
        head = tmpwords[e-1][0];
        tail = tmpwords[e-1].substring(1);
        tmpwords[e-1] = tail;
      } else {
        pos = Math.floor(Math.random()*alphabet.length);
        head = alphabet[pos];
      }
      divcel.onmousedown = down;
      divcel.onmouseup = up;
      divcel.onmouseover = over;

      divcel.appendChild(document.createTextNode(head));
      divrow.appendChild(divcel);
    }
    render.appendChild(divrow);
  }
  })();        /* end block generation */


  /* BEGIN butterfly effect ;) */
  var timer_butterfly=0;
  var dombutterfly = null;

  function butterfly() {
    if (!dombutterfly.style.backgroundPosition || 
        dombutterfly.style.backgroundPosition === "-40px 0px"
        ) {
      dombutterfly.style.backgroundPosition = "0px 0px";  
    } else {
      dombutterfly.style.backgroundPosition = "-40px 0px";  
    }
  }

  function butterfly_effect(o) {
    if (typeof(o) === 'string') { o = $(o); }
    clearInterval(timer_butterfly);
    dombutterfly = o;
    butterfly();
    timer_butterfly = setInterval("butterfly()", 100)
  }
  window.butterfly = butterfly;

  /* END butterfly effect ;) */



  (function() {/* block generate listwords */
    var list = document.getElementById('listwords')
      , i = 0
      , w = ""
      , e, s, div
    ;

    var timerwrapper = document.createElement('div');
    timerwrapper.id = "timer";
    list.appendChild(timerwrapper);
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


