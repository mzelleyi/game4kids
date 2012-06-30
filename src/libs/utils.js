var qs = (function(a) {
  if (a == "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i)
  {
    var p=a[i].split('=');
    if (p.length != 2) continue;
    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split('&'));


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


Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

function redirectTo(link) {
    window.location = link;
}

function $(id) {
  return document.getElementById(id);
}
function $$(id) {
  return document.getElementsByClassName(id);
}

function $$$(id) {
  return document.getElementsByTagName(id);
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


var ModalMessage  = {
  show: function(msg) {
    var o = $('light');
    o.style.display = 'block';
    o.getElementsByTagName('p')[0].innerHTML = msg;
    document.getElementById('fade').style.display='block';
  },
  close: function() {
    $('light').style.display = 'none';
    $('fade').style.display = 'none';
  },
  andReload: function(msg) {
    var o = $('light');
    o.style.display = 'block';
    o.getElementsByTagName('p')[0].innerHTML = msg;
    document.getElementById('fade').style.display='block';
    o.getElementsByTagName('a')[0].onclick = function() {
      location.reload(true);
      return false;
    }
    
  }
};



/* BEGIN timer */
function Timer(options) {
  var options = (options)? options: {}
    , that = this;
  //console.log(options);
  options.render     = ('render'     in options)? options.render: 'timer';
  options.label      = ('label'      in options)? options.label : 'Tiempo';
  options.time       = ('time'       in options)? options.time  : 0;
  options.eventValue = ('eventValue' in options)? options.eventValue: 0;
  options.callback   = ('callback'   in options)? options.callback: null;
  options.next       = ('next'       in options)? options.next: 
                                    function(o) { return ++o;};

  options.render = (typeof(options.render) === 'string')? 
                                $(options.render): options.render;

  if (typeof(options.callback) !== 'function') {
    console.log("Error in callback. Must be a function.");
    return;
  }

  if (typeof(options.next) === 'string') {
    switch(options.next) {
      case 'inc': options.next = function(o) { return ++o; }; break;
      case 'dec': options.next = function(o) { return --o; }; break;
      default: option.next = function(o) { console.log('Error next value') };
    }
  } else return;

  that.options = options;
  that.timer = null;
  that.time = options.time;

  function eachTime() {
      if (that.time === that.options.eventValue) {
        that.time = that.options.time;
        that.callback();
        clearInterval(that.timer);
      }
      that.options.render.innerHTML = that.options.label + " : ";
      that.options.render.innerHTML += String(that.time);
      that.time = that.options.next(that.time);
  }

  that.start = function(div) {
    that.timer = setInterval(eachTime, 1000);
  };

  that.stop = function() {
    clearInterval(that.timer);
  };

  return that;
}

/* END timer */

/* BEGIN Sprite object */
function Sprite(options) {
  var that = this;
  options.image    = (options.image)? options.image: false;
  options.viewport = (options.viewport)? options.viewport: {};
  //options.width    = (options.width )? options.width: false;
  //options.height   = (options.height)? options.height: false;
  options.xFrames   = (options.xFrames)? options.xFrames: false;
  options.yFrames   = (options.yFrames)? options.yFrames: false;
  options.refreshTime = (options.refreshTime)? options.refreshTime: 100;
  options.render   = (options.render)? options.render: false;
  options.initial   = (options.initial)? options.initial: {x:0, y:0};

  that.moves = {};
  that.timer = null;
  that.currentPosition = 0;
  
  if (!(options.render)) {
    console.log("Error: you must set render value");
    return;
  } 
  if (typeof(options.render) === 'string') {
    options.render = document.getElementById(options.render);
  }

  options.render.style.backgroundImage = "url('" + options.image + "')";
  options.render.style.width = String(options.viewport.width) + 'px'
  options.render.style.height = String(options.viewport.height) + 'px'
  options.render.style.backgroundPosition = 
          "-" + options.initial.x * options.viewport.width + 'px ' +
          "-" + options.initial.y * options.viewport.height+ 'px';
  //console.log(options.render.style.backgroundPosition);
  if (!(options.image || options.xFrames || options.yFrames)) {
    console.log("Error: you Must set almost image and frames x and y");
    return;
  }
  that.options = options;

  that.define= function ( name, frames, orientation, axis ) {
    that.moves[name] = { frames: frames, orientation: orientation, axis: axis };
  };
  that.event = function(nameEvent, f) {
    that.options.render.addEventListener(nameEvent, f);
  };

  that.animate = function(name, options) {
    var i = 0 
      , frameAnimation = null
      , frames = that.moves[name].frames
      , offsetx = that.options.viewport.width
      , offsety = that.options.viewport.height
      ;

    if(that.moves[name].orientation === 'x') {

      that.options.render.style.backgroundPositionY = 
          "-"+ String(that.moves[name].axis*offsety) + "px";

      frameAnimation = function () {
        that.options.render.style.backgroundPositionX = 
          "-"+ String(frames[i]*offsetx) + "px";
        i = (i + 1) % frames.length;
      }
        
    } else {

      that.options.render.style.backgroundPositionX = 
          "-"+ String(that.moves[name].axis*offsetx) + "px";

      frameAnimation = function () {
        that.options.render.style.backgroundPositionY = 
          "-"+ String(frames[i]*offsety) + "px";
        i = (i + 1) % frames.length;
      }
    }
    if (that.timer) {
      clearInterval(that.timer);
    }
    //console.log(frameAnimation);
    that.timer = setInterval(frameAnimation, that.options.refreshTime);
  }

  that.move = function(name, position) {
    var i = (position)? position: that.currentPosition
      , frameAnimation = null
      , frames = that.moves[name].frames
      , offsetx = that.options.viewport.width
      , offsety = that.options.viewport.height
      ;

    if(that.moves[name].orientation === 'x') {

      that.options.render.style.backgroundPositionY = 
          "-"+ String(that.moves[name].axis*offsety) + "px";

      frameAnimation = function () {
        that.options.render.style.backgroundPositionX = 
          "-"+ String(frames[i]*offsetx) + "px";
        i = (i + 1) % frames.length;
        that.currentPosition = i;
      }
        
    } else {

      that.options.render.style.backgroundPositionX = 
          "-"+ String(that.moves[name].axis*offsetx) + "px";

      frameAnimation = function () {
        //console.log(that.moves[name].axis);
        that.options.render.style.backgroundPositionY = 
          "-"+ String(frames[i]*offsety) + "px";
        i = (i + 1) % frames.length;
        that.currentPosition = i;
      }
    }
    frameAnimation();
  }
 
  return that;
}
/* END Sprite object */

/* BEGIN sound manager */
function controlManager (options) {
  var that = this;
  options = (options)? options: {};
  options.render = (options.render)? options.render: 'controlers';

  options.render = (typeof(options.render) === 'string')? 
                            $(options.render): options.render;
  var div1 = document.createElement('div')
    , div2 = document.createElement('div')
    , div3 = document.createElement('div')
    , div4 = document.createElement('div')
    , div5 = document.createElement('div')
    ;
      

  options.render.appendChild(div1);
  options.render.appendChild(div2);
  options.render.appendChild(div3);
  options.render.appendChild(div4);
  options.render.appendChild(div5);

  controllerSpriteOptions = {
    image: "images/sound.png",
    xFrames: 6, yFrames: 2, 
    render: div1, 
    viewport: { width: 50, height: 30} 
  };

  var buttonSound = new Sprite( controllerSpriteOptions);
  buttonSound.off = false;
  buttonSound.define('onoff',  [1,0], 'y', 0);
  buttonSound.event('click', function(e) {
    buttonSound.move('onoff');
    if (buttonSound.off) { $('music').play(); }
    else                 { $('music').pause();}
    buttonSound.off = ! (buttonSound.off);
  });

  var buttonPause = new Sprite({
    image: "images/sound.png",
    xFrames: 6, yFrames: 2, 
    render: div2, 
    initial: {x: 1, y:0 },
    viewport: { width: 50, height: 30} 
  });
  buttonPause.off = false;
  buttonPause.define('onoff',  [1,0], 'y', 1);
  buttonPause.event('click', function(e) {
    buttonPause.move('onoff');
    if (buttonPause.off) { clock.start(); }
    else                 { clock.stop();}
    buttonPause.off = ! (buttonPause.off);
  });

  var buttonMusic = new Sprite({
    image: "images/sound.png",
    xFrames: 6, yFrames: 2, 
    render: div3, 
    initial: {x: 2, y:0 },
    viewport: { width: 50, height: 30} 
  });
  buttonMusic.off = false;
  buttonMusic.define('onoff',  [1,0], 'y', 2);
  buttonMusic.event('click', function(e) {
    var audios = $$('audio')
      , i
      ;
    buttonMusic.move('onoff');
    buttonMusic.off = ! (buttonMusic.off);
    for (i=0; i<audios.length; i++) {
      audios[i].muted = buttonMusic.off;
    }
  });

  var buttonScreen = new Sprite({
    image: "images/sound.png",
    xFrames: 6, yFrames: 2, 
    render: div4, 
    initial: {x: 3, y:0 },
    viewport: { width: 50, height: 30} 
  });
  buttonScreen.off = false;
  buttonScreen.define('onoff',  [1,0], 'y', 3);
  buttonScreen.event('click', function(e) {
    buttonScreen.move('onoff');
    buttonScreen.off = ! (buttonScreen.off);
    if (buttonScreen.off) {
      fullScreenApi.requestFullScreen($('body'));
    } else {
      fullScreenApi.cancelFullScreen($('body'));
    }
  });
  var buttonBack = new Sprite({
    image: "images/sound.png",
    xFrames: 7, yFrames: 2, 
    render: div5, 
    initial: {x: 4, y:0 },
    viewport: { width: 50, height: 30} 
  });
 
  buttonBack.off = false;
  buttonBack.define('onoff',  [1,0], 'y', 4);
  buttonBack.event('click', function(e) {
    redirectTo('../index.html');
  });


}

/* END sound manager */


var clock = new Timer({
 render: 'timer', 
 label: 'El Tiempo',
 time: 300,
 eventValue: 0,
 callback: function () {
   ModalMessage.andReload("Perdiste!!!");
 },
 next: 'dec'
});


clock.start();
c = new controlManager({render: 'soundmanager'});
