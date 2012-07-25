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

var menu2a = [
  {id:'m1', label:'Fácil'     , next: 'memotest-otro/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'memotest-otro/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'memotest-otro/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];

var menu2b = [
  {id:'m1', label:'Fácil'     , next: 'memotest-otro2/index.html?level=easy' } ,
  {id:'m2', label:'Intermedio', next: 'memotest-otro2/index.html?level=middle' } ,
  {id:'m3', label:'Dificil'   , next: 'memotest-otro2/index.html?level=hard' } ,
  {id:'m4', label:labelback()    , next: back} 
];


var menu0 = [
  {id:'m1', label:'Un Jugador'   , next: menu2a } ,
  {id:'m2', label:'Dos Jugadores', next: menu2b } ,
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
