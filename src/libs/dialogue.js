( function () {



function back() { menu(menu0); walk = []; } ;
function labelback (){ 
  var p = document.createElement('span');
  var img = new Image();
  img.style.float = 'left';
  img.src = 'libs/volver.png';
  img.style.width = '35px';
  p.appendChild(img);
  p.appendChild(document.createTextNode('  Volver'));
  return p;
}

var menu1 = [
  {id:'m1', label:'Fácil'     , next: 'alphabet/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'alphabet/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'alphabet/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];
var menu2a = [
  {id:'m1', label:'Fácil'     , next: 'memotest/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'memotest/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'memotest/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];

var menu2b = [
  {id:'m1', label:'Fácil'     , next: 'memotest2/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'memotest2/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'memotest2/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];


var menu2 = [
  {id:'m1', label:'Un Jugador'   , next: menu2a } ,
  {id:'m2', label:'Dos Jugadores', next: menu2b } ,
  {id:'m4', label:labelback()    , next: back} 
];

var menu3a = [
  {id:'m1', label:'Fácil'     , next: 'qanda/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'qanda/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'qanda/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];
var menu3b = [
  {id:'m1', label:'Fácil'     , next: 'qanda/index2.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'qanda/index2.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'qanda/index2.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];
var menu3c = [
  {id:'m1', label:'Fácil'     , next: 'qanda/index3.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'qanda/index3.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'qanda/index3.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];


var menu3 = [
  {id:'m1', label:'¿Dulce o Salado? '     , next: menu3a } ,
  {id:'m2', label:'¿Desayuno o Almuerzo?' , next: menu3b } ,
  {id:'m3', label:'¿Te gusta?'            , next: menu3c } ,
  {id:'m4', label:labelback()    , next: back} 
];



var menu4 = [
  {id:'m1', label:'Fácil'     , next: 'maze/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'maze/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'maze/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];

var menu5 = [
  {id:'m1', label:'Fácil'     , next: 'healthyteeth/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'healthyteeth/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'healthyteeth/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];

var menu6 = [
  {id:'m1', label:'Fácil'     , next: 'riddle/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'riddle/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'riddle/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];


var menu0 = [
  {id:'m1', label:'Sopa de letras'        , image: 'm1.png', next:menu1} ,
  {id:'m2', label:'Memotest'              , image: 'm2.png', next:menu2} ,
  {id:'m3', label:'Preguntas y Respuestas', image: 'm3.png', next:menu3} ,
  {id:'m4', label:'Laberintos'            , image: 'm4.png', next:menu4} ,
  {id:'m5', label:'Dientes Sanos'         , image: 'm4.png', next:menu5} ,
  {id:'m6', label:'Adivinanzas'           , image: 'm4.png', next:menu6} 
];




walk = [];
function menu(m) {
  var i
    , link
    , label 
    , next
    , functionNext
    , wrapper
  ;
  wrapper = document.getElementById('menu');
  wrapper.innerHTML = "";
  for (i=0; i<m.length; i++) {
    link  = document.createElement('a');
    if (typeof(m[i].label) === 'string') {
      label = document.createTextNode(m[i].label);
    } else {
      label = m[i].label;
    }
    link.appendChild(label);
    link.id = m[i].id;
    link.href = "javascript:void(0)";
    if ('image' in m[i]) {
      //link.style.backgroundImage = "url('"+m[i].image+"')";
    }


    next = m[i].next;
    if (typeof(next) === 'string' ) {
      functionNext = (function(link) {
        return function() {
          window.location = link;
        };
      })(next);
    } else if (typeof(next) === 'function') {
      /* closure for set walk throught */
      functionNext = (function(index) {
        return function () {
          walk[walk.length] =  m[index];
          next();
        }
      })(i);
      /* end closure  -----------------*/

    } else if ((typeof(next) === 'object') && ('length' in next )) {
      functionNext = (function(index, nextMenu) {
        return function () {
          walk[walk.length] =  m[index];
          menu(nextMenu);
        }
      })(i,next);
    } else {
      alert("Error in menu");
    }
    link.addEventListener('click', functionNext);

    wrapper.appendChild(link);
  }
}

menu(menu0);

})();
