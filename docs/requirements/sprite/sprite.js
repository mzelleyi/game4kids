function Sprite(options) {
  var that = this;
  options.image    = (options.image)? options.image: false;
  options.viewport = (options.viewport)? options.viewport: {};
  options.width    = (options.width )? options.width: false;
  options.height   = (options.height)? options.height: false;
  options.xFrames   = (options.xFrames)? options.xFrames: false;
  options.yFrames   = (options.yFrames)? options.yFrames: false;
  options.refreshTime = (options.refreshTime)? options.refreshTime: 100;
  options.render   = (options.render)? options.render: false;

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
  if (!(options.image || options.xFrames || options.yFrames)) {
    console.log("Error: you Must set almost image and frames x and y");
    return;
  }
  that.options = options;

  that.define= function ( name, frames, orientation, axis ) {
    that.moves[name] = { frames: frames, orientation: orientation, axis: axis };
  };
  that.event = function(nameEvent, f) {
    that.render.addEventListener(nameEvent, f);
  };

  that.animate = function(name) {
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
    console.log(frameAnimation);
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
        that.options.render.style.backgroundPositionY = 
          "-"+ String(frames[i]*offsety) + "px";
        i = (i + 1) % frames.length;
      }
    }
    frameAnimation();
  }
 
  return that;
}
