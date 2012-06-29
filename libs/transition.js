( function () {
var options = {
  width: 30, height: 100
};

function doit (images) {
  var i
    , img
    ;
  for (i=0; i<images.length; i++) {
    img = images[i];
    img.style.width  = options.width  + "px";
    img.style.height = options.height + "px";


  }

}




})();
