Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

function $(id) {
  return document.getElementById(id);
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

/* END butterfly effect ;) */




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

function STOPTIMER() {
  clearInterval(timer);
}


/* END timer */
