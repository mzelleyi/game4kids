Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

(function() { /* making fullscreenapi */
    var
        fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function() { return false; },
            requestFullScreen: function() {},
            cancelFullScreen: function() {},
            fullScreenEventName: '',
            prefix: ''
        },
        browserPrefixes = 'webkit moz o ms khtml'.split(' ');
 
    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
            fullScreenApi.prefix = browserPrefixes[i];
 
            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined' ) {
                fullScreenApi.supportsFullScreen = true;
 
                break;
            }
        }
    }
 
    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
 
        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }
 
    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {
 
            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }
 
    // export api
    window.fullScreenApi = fullScreenApi;
})();  /* end fullscreenapi */



function $(id) {
  return document.getElementById(id);
}
function $$(id) {
  return document.getElementsByClassName(id);
}


function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
  if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

function MESSAGE(msg) {
  var o = document.getElementById('light');
  o.style.display='block';
  o.getElementsByTagName('p')[0].innerHTML=msg;
  document.getElementById('fade').style.display='block';
}

function MESSAGEandReload(msg) {

  var o = document.getElementById('light');
  o.style.display='block';
  o.getElementsByTagName('p')[0].innerHTML=msg;
  o.getElementsByTagName('a')[0].onclick = function() {
    location.reload(true);
    return false;
  }
  document.getElementById('fade').style.display='block';
}




/* BEGIN timer */
var time = 0;
var timer;
domtimer = null;

function t() {
  domtimer.innerHTML = "Tiempo : " + String(time);  
  time++;
}

function TIMER(o) {
  if (typeof(o) === 'string') { o = $(o); }
  domtimer = o;
  t();
  timer = setInterval("t()", 1000)
  return timer;
}

function TIMER_PAUSE   () { clearInterval(timer);             }
function TIMER_CONTINUE() { timer = setInterval("t()", 1000); }

/* END timer */

/* BEGIN butterfly effect ;) */
var timer_butterfly=0;
var dombutterfly = null;
var current = 0;
function butterfly() {
  dombutterfly = document.getElementsByClassName('black')[0];
  dombutterfly.style.backgroundPosition ="-"+ String(current)+"px 0px";
  current= (current + 50) % 200;
}

function ghost() {
  clearInterval(timer_butterfly);
  timer_butterfly = setInterval("butterfly()", 200)
}

/* END butterfly effect ;) */

/* BEGIN sound manager */
var control = [] ;

function sound_manager(o) {
  var w = 50 
    , h = 30 
    , frames = 6
    , view = document.createElement('div')
    , tv
    , i
  ;
  if (typeof(o) === 'string') { o = $(o); }

  control[0] = 1; //sound
  control[1] = 1; //paused
  control[2] = 1; //music

  view.style.width  = String(w) + "px";
  view.style.height = String(h) + "px";
  view.style.backgroundImage = 'url(images/sound.png)';

  /* BEGIN sound controller */
  tv = view.cloneNode();
  i = 0;
  tv.style.backgroundPosition = "-" + String(w*i) + "px 0px";
  tv.onclick = function (e) {
    this.style.backgroundPositionY = (control[i] === 1)?"-"+String(h)+"px": "0px";
    if (control[i] === 0) { $('music').play(); }
    else                  { $('music').pause(); }
    control[i] = (control[i] === 0)? 1: 0;
    return false;
  };
  o.appendChild(tv);
  /* END sound controller */

  /* BEGIN pause game controller */
  tv = view.cloneNode();
  i = 1;
  tv.style.backgroundPosition = "-" + String(w*i) + "px 0px";
  tv.onclick = function (e) {
    this.style.backgroundPositionY = (control[i] === 1)?"-"+String(h)+"px": "0px";

    if (control[i] === 0) { TIMER_CONTINUE(); }
    else                  { TIMER_PAUSE(); }


    control[i] = (control[i] === 0)? 1: 0;
    return false;
  };
  o.appendChild(tv);
  /* END pause game controller */

  /* BEGIN music controller */
  tv = view.cloneNode();
  i = 2;
  tv.style.backgroundPosition = "-" + String(w*i) + "px 0px";
  tv.onclick = function (e) {
    var audios = $$('audio')
      , j = 0
      , v = true
    ;
    this.style.backgroundPositionY = (control[i] === 1)?"-"+String(h)+"px": "0px";

    v = (control[i] === 0)? false: true;
    for (j=0; j<audios.length; j++) { audios[j].muted = v; }
    

    control[i] = (control[i] === 0)? 1: 0;
    return false;
  };
  o.appendChild(tv);
  /* BEGIN end controller */

  /* BEGIN screen controller */
  if (fullScreenApi.supportsFullScreen) {
    tv = view.cloneNode();
    i = 3;
    tv.style.backgroundPosition = "-" + String(w*i) + "px 0px";
    tv.onclick = function (e) {
      this.style.backgroundPositionY = (control[i] === 1)?"-"+String(h)+"px": "0px";

      v = (control[i] === 0)? false: true;
      if (v) {
        fullScreenApi.requestFullScreen($('body'));
      } else { 
        fullScreenApi.cancelFullScreen($('body'));
      }

      control[i] = (control[i] === 0)? 1: 0;
      return false;
    };
    o.appendChild(tv);
  }
  /* BEGIN end controller */




}

/* END sound manager */


