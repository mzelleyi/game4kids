function __main__ () {
  var Tablet = function()
  {
    var body = null
      , that = this
      , moveEvent = null
      , offset = null
        //if (e.clientY >= 50 && e.clientY <= 400 && e.clientX >= 270 && e.clientX <=1100) {
    ;
    /* dom elements */
    that.coins  = document.getElementById('coins');
    that.tablet = document.getElementById('tablet');
    that.teeths = document.createElement('div');
    that.tablet.appendChild(that.teeths);   



    /* dimensions */
    that.size= { width : 900, height : 500 };
    that.offset = getOffset(that.tablet);
    that.limits = [
      { x: that.offset.x                  , y: that.offset.y                     } , 
      { x: that.offset.x + that.size.width, y: that.offset.y + that.size.height  } ];

    that.center = { x: that.offset.x + (that.size.width/2), 
                    y: that.offset.y + (that.size.height/2) };
                      
    
    /* points */
    that.good = 0;
    that.bad = 0;
    that.lifes = 3;

    that.fruitsTimer = null;

    /* styling elements */
    that.coins.innerHTML = String(that.good);
    that.tablet.style.width  = String(that.size.width)  + 'px';
    that.tablet.style.height = String(that.size.height) + 'px';

    that.teeths.className  = 'pointer';
    that.teeths.style.top  = that.center.y + 'px';
    that.teeths.style.left = that.center.x + 'px';
    console.log(that.center);

    that.youLost = function () {
      ModalMessage.show("Perdiste");
      clearInterval(that.fruitsTimer);
    };

    function meals() {
      var div = document.createElement('div');
      var timer = null;
      var xpos  = 0;
      var ypos  = 0;

      xpos = getRandomInt(that.limits[0].x + 40, that.limits[1].x - 40);
      ypos = that.limits[0].y;
      that.tablet.appendChild(div);
      if (xpos % 2 == 0) { 
        div.className = "goodMeal"; 
        div.style.backgroundImage = "url('images/goods/" + String(xpos%5) + ".png')"; 
      } else { 
        div.className = "badMeal" ; 
        div.style.backgroundImage = "url('images/bads/" + String(xpos%5) + ".png')"; 
      }
      div.style.left = xpos + "px";
      div.style.top = ypos + "px";;

      timer = setInterval(function moveMeal() {
        div.style.top = ypos + "px";
        ypos +=10;
        if (ypos === that.limits[1].y - 20) {
          clearInterval(timer);
          div.className = 'removed';
        }
      }, 100);
    }

    that.doit = function() {
      that.tablet = document.getElementById('tablet');
      that.tablet.addEventListener('mousemove', function(e) {


        if ((e.clientY >= (that.limits[0].y + 20) && e.clientY <= (that.limits[1].y -20 )) && 
            (e.clientX >= (that.limits[0].x + 60) && e.clientX <= (that.limits[1].x +40 ) )) {
          that.teeths.style.top = -20 + e.clientY + "px";
          that.teeths.style.left = -20 + e.clientX + "px";
        }
        if (e.target.className === 'badMeal') {
          $('sumamal').play();
          e.target.className += ' eated';
          setTimeout(function() {
            e.target.className = 'removed';
          }, 1000);
 
          that.bad++;
          addClass($('diente1'), 'badtouch');
          if (that.bad === 3) {
            that.bad = 0;
            var lifes = $('lifes')
              , dientes  = lifes.getElementsByTagName('img');
            that.lifes--;
            lifes.removeChild(dientes[that.lifes]); 
          }
          if (that.lifes === 0) {
            that.youLost();
          }
        } else if (e.target.className === 'goodMeal') {
          e.target.className += ' eated';
          $('audio_00').play();
          setTimeout(function() {
            e.target.className = 'removed';
          }, 1000);
          that.good++;
          that.coins.innerHTML = String(that.good);
        }

      });

      that.fruitsTimer = setInterval(meals, 1000);
    };
  }

  t = new Tablet();
  t.doit();
}
