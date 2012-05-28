function __main__() {

      var y = Math.random();
      if (y < 0.3) {
        var xx = [
          [[1,0,1,0],  [1,1,0,0], [0,1,1,1], [1,1,1,0], [1,1,1,0], [1,1,0,1], [0,1,1,0], [1,1,0,1], [0,1,1,0], [1,1,1,0], [1,1,0,1],[0,1,1,0]  ], 
          [[1,0,1,0],  [1,0,1,0], [1,1,0,1], [0,0,0,1], [0,0,0,0], [0,1,1,1], [1,0,0,1], [0,1,1,0], [1,0,1,0], [1,0,0,0], [0,1,0,0],  [0,0,1,1] ], 
          [[1,0,0,1],  [0,0,0,1], [0,1,0,0], [0,1,1,0], [1,0,0,1], [0,1,1,0], [1,1,1,0], [1,0,1,0], [1,0,0,1], [0,0,1,1],[1,0,1,0],   [1,1,1,0] ], 
          [[1,1,0,1],  [0,1,0,1], [0,0,1,0], [1,0,0,0], [0,1,0,1], [0,0,0,1], [0,0,0,1], [0,0,1,1], [1,1,1,0], [1,1,1,0],  [1,0,0,1], [0,0,1,0] ], 
          [[1,1,1,0],  [1,1,1,0], [1,0,1,0], [1,0,0,1], [0,1,0,0], [0,1,0,1], [0,1,0,0], [0,1,0,1], [0,0,1,0], [1,0,0,1],  [0,1,0,1], [0,0,1,0] ], 
          [[1,0,1,0],  [1,0,1,0], [1,0,0,1], [0,1,1,1], [1,0,0,1], [0,1,1,1], [1,0,0,1], [0,1,1,1], [1,0,1,0], [1,1,1,0], [1,1,0,0], [0,0,1,1] ], 
          [[1,0,1,0],  [1,0,0,1], [0,1,0,1], [0,1,0,1], [0,1,0,1], [0,1,0,0], [0,1,0,0], [0,1,1,1], [1,0,1,0], [1,0,1,0], [1,0,1,0],  [1,1,1,0] ], 
          [[1,0,1,0],  [1,1,1,0], [1,1,1,0], [1,1,0,1], [0,1,0,1], [0,0,1,0], [1,0,1,0], [1,1,1,0], [1,0,0,0], [0,0,1,1], [1,0,0,0],  [0,0,1,0] ], 
          [[1,0,0,0],  [0,0,1,0], [1,0,0,0], [0,1,1,1], [1,1,0,0], [0,0,1,0], [1,0,0,0], [0,0,0,1], [0,0,0,1], [0,1,1,1], [1,0,1,0], [1,0,1,1] ], 
          [[1,0,1,1],  [0,0,0,1], [0,0,0,1], [0,1,0,1], [0,0,1,1], [1,0,1,1], [1,0,0,1], [0,1,0,1], [0,1,0,1], [0,1,0,1], [0,0,0,1], [0,1,1,0] ]
          ]
          , goods = [[3,2],[7,4],[7,8],[8,9]]
          , bads  = [[2,3],[4,5],[6,7],[9,7]]

          , wellcome = "Hola! Usa Las flechas de la Luna y cruza el laberinto. Puedes guiarte siguiendo las Frutas para llegar a la salida"
          , cartel_goods = "Genial!!! Sigue buscando Frutas!"
          , cartel_bads = "Mmmm!!! Recuerda buscar Frutas!"
          , posx = 0
          , posy = 0
          , winx = 11
          , winy = 9
        ;
      } else if (y < 0.7) { 
        var xx = [
          [[1,0,0,0],[0,1,0,1],[0,1,0,1],[0,1,1,0],[1,1,1,0],[1,1,1,0],[1,1,0,1],[0,1,1,0],[1,1,0,0],[0,1,1,0],[1,1,1,0],[1,1,1,0]] ,
          [[1,0,1,1],[1,1,0,1],[1,1,0,1],[1,0,0,1],[0,0,1,0],[1,0,0,0],[0,1,1,0],[1,0,1,0],[1,0,1,0],[1,0,0,0],[0,0,1,1],[1,0,1,0]] ,
          [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,1,0],[1,0,1,0],[1,0,1,1],[1,0,0,1],[0,0,0,1],[0,0,1,0],[1,0,0,0],[0,1,0,0],[0,0,1,1]] ,
          [[1,0,1,0],[1,0,1,1],[1,0,1,0],[1,0,0,0],[0,0,1,0],[1,1,0,1],[0,1,0,1],[0,1,1,0],[1,0,1,1],[1,0,1,1],[1,0,1,0],[1,1,1,0]] ,
          [[1,0,0,1],[0,1,1,1],[1,0,1,0],[1,0,1,1],[1,0,0,0],[0,1,0,0],[0,1,1,1],[1,0,0,1],[0,1,0,1],[0,1,1,0],[1,0,1,0],[1,0,1,0]] ,
          [[1,1,1,0],[1,1,1,0],[1,0,1,0],[1,1,0,0],[0,0,1,0],[1,0,0,1],[0,1,1,0],[1,1,1,0],[1,1,1,0],[1,0,1,0],[1,0,0,0],[0,0,1,1]] ,
          [[1,0,0,1],[0,0,1,0],[1,0,1,1],[1,0,1,1],[1,0,1,0],[1,1,1,0],[1,0,0,0],[0,0,0,1],[0,0,1,1],[1,0,1,0],[1,0,0,1],[0,1,1,0]] ,
          [[1,1,1,0],[1,0,1,0],[1,1,0,0],[0,1,1,1],[1,0,0,1],[0,0,1,0],[1,0,0,1],[0,1,1,0],[1,1,0,1],[0,0,0,1],[0,1,0,1],[0,0,1,0]] ,
          [[1,0,0,1],[0,0,0,1],[0,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,0,1],[0,1,1,1],[1,0,0,1],[0,1,0,0],[0,1,1,0],[1,1,0,0],[0,0,1,0]],
          [[1,1,0,1],[0,1,0,1],[0,1,0,1],[0,0,0,1],[0,0,0,1],[0,1,0,1],[0,1,0,1],[0,1,1,1],[1,0,1,1],[1,0,0,1],[0,0,1,1],[1,0,1,0]]
          ]
          , goods = [[2,0],[5,4],[6,6],[7,8],[10,9]]
          , bads  = [[3,3],[4,7],[3,9]]

          , wellcome = "Hola! Usa Las flechas de la Luna y cruza el laberinto. Puedes guiarte siguiendo los Alimentos del desayuno para llegar a la salida"
          , cartel_goods = "Genial!!! Sigue buscando Alimentos del desayuno!"
          , cartel_bads = "Mmmm!!! Recuerda buscar Alimentos del desayuno!"
          , posx = 0
          , posy = 0
          , winx = 11
          , winy = 9
        ;
        document.getElementById('container').style.backgroundImage = "url(images/bgmaze2.png)";
      
      } else {
        var xx = [
          [[1,0,1,0],[1,1,0,0],[0,1,0,1],[0,1,1,1],[1,1,0,1],[0,1,1,0],[1,1,1,0],[1,1,1,0],[1,1,1,0],[1,1,1,0],[1,1,1,0],[1,1,1,0]] ,
          [[1,0,0,0],[0,0,1,1],[1,1,0,0],[0,1,0,0],[0,1,1,1],[1,0,0,1],[0,0,1,0],[1,0,1,0],[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,1,1]] ,
          [[1,0,1,0],[1,1,0,1],[0,0,1,1],[1,0,0,0],[0,1,0,0],[0,1,1,1],[1,0,0,1],[0,0,0,1],[0,0,1,1],[1,0,1,1],[1,0,0,1],[0,1,1,0]] ,
          [[1,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,0,0,1],[0,1,0,0],[0,1,0,1],[0,1,0,0],[0,1,0,1],[0,1,1,0],[1,1,1,0],[1,0,1,0]] ,
          [[1,0,1,1],[1,0,0,0],[0,0,1,1],[1,1,1,0],[1,0,1,1],[1,0,1,0],[1,1,0,0],[0,0,0,0],[0,1,1,0],[1,0,0,1],[0,0,0,1],[0,0,1,0]] ,
          [[1,1,1,0],[1,0,1,0],[1,0,1,1],[1,0,1,0],[1,1,0,0],[0,0,1,0],[1,0,1,0],[1,0,1,1],[1,0,1,0],[1,1,1,0],[1,1,1,0],[1,0,1,1]],
          [[1,0,0,1],[0,0,1,1],[1,1,1,0],[1,0,1,0],[1,0,1,1],[1,0,1,0],[1,0,1,0],[1,1,0,0],[0,0,1,1],[1,0,0,1],[0,0,1,0],[1,1,1,0]],
          [[1,1,0,1],[0,1,1,0],[1,0,1,0],[1,0,1,0],[1,1,1,0],[1,0,1,0],[1,0,1,0],[1,0,1,0],[1,1,0,1],[0,1,1,0],[1,0,0,1],[0,0,1,0]],
          [[1,1,1,0],[1,0,1,0],[1,0,0,1],[0,0,1,0],[1,0,1,0],[1,0,1,1],[1,0,1,1],[1,0,1,0],[1,1,0,0],[0,0,0,1],[0,1,1,1],[1,0,1,0]],
          [[1,0,0,1],[0,0,0,1],[0,1,0,1],[0,0,0,1],[0,0,0,1],[0,1,0,1],[0,1,0,1],[0,0,0,1],[0,0,0,1],[0,1,0,1],[0,1,0,1],[0,0,1,0]] 

          ]
          , goods = [[0,3],[2,3],[6,3],[8,6],[10,9]]
          , bads  = [[1,1],[1,5],[6,9],[6,4],[6,8]]
          , wellcome = "Hola! Usa Las flechas de la Luna y cruza el laberinto. Puedes guiarte siguiendo las Verdudas para llegar a la salida"
          , cartel_goods = "Genial!!! Sigue buscando Verduras!"
          , cartel_bads = "Mmmm!!! Recuerda buscar Verduras!"
          , posx = 0
          , posy = 0
          , winx = 11
          , winy = 9
        ;
        document.getElementById('container').style.backgroundImage = "url(images/bgmaze3.png)";
 
      }


        (function() { /* block generate maze */
        
        var i, j, row, e
          , divcel = document.createElement('div')
          , divrow  
          , render = document.getElementById('render')
        ;
          
        for (i=0; i<xx.length; i++) {
          row = xx[i];
          divrow = document.createElement('div');
          divrow.className = "row";
          for (j=0; j<row.length; j++) {
            e = row[j];
            divcel = divcel.cloneNode(true);
            divcel.id = "cell-" + String(i) + "-" + String(j);
            divcel.className = "cell";
            divcel.className += (e[0] === 1)? " left":"";
            divcel.className += (e[1] === 1)? " top":"";
            divcel.className += (e[2] === 1)? " right":"";
            divcel.className += (e[3] === 1)? " bottom":"";
            /*debug*/
            //divcel.innerHTML = "<center><p>" + j  +"," + i + "<p></center>";

            divrow.appendChild(divcel);
          }
          render.appendChild(divrow);
        }
        })();        /* end block maze */

        function playsound(){    
          var audio_file1 = document.getElementById('audio_01');
          audio_file1.play();
        }

        function is_winner() {
          var c = 0;
          for (c=0; c<goods.length; c++) {
            if (posx === goods[c][0] && posy === goods[c][1]){
              goods.splice(c, 1);
              addClass($('cell-'+String(posy)+"-"+String(posx)), 'passed');
              $('audio_03').play();
              MESSAGE(cartel_goods);
            }
          }
          for (c=0; c<bads.length; c++) {
            if (posx === bads[c][0] && posy === bads[c][1]){
              $('audio_04').play();
              MESSAGE(cartel_bads);
            }
          }
 
          if( (posx === winx ) && (posy === winy)) {
            MESSAGEandReload("Ganaste!!!");
            $('audio_02').play();
          }
        }
        
        function moveleft(e) {
          var position = xx[posy][posx];
          playsound();
          clean();
          if ((position[0] !== 1) && (posx>0) && (xx[posy][posx -1][2] !==1)){
            posx -= 1; 
          }
          dibujar();
          is_winner();
        }

        function movetop(e) {
          var position = xx[posy][posx];
          playsound();
          clean();
          if ((position[1] !== 1) && (posy>0) && (xx[posy -1][posx][3] !==1)){
            posy -= 1; 
          }
          dibujar();
          is_winner();
        }

        function moveright(e) {
          var position = xx[posy][posx]
            , limit = xx[0].length;
          playsound();
          clean();
          if ((position[2] !== 1) && (posx<limit) && (xx[posy][posx +1][0] !==1)){
            posx += 1; 
          }
          dibujar();
          is_winner();
        }

        function movebottom(e) {
          var position = xx[posy][posx]
            , limit = xx.length;
          playsound();
          clean();
          if ((position[3] !== 1) && (posy<limit) && (xx[posy +1][posx][1] !==1)){
            posy += 1; 
          }
          dibujar();
          is_winner();
        }
        
        function clean() {
          var x = document.getElementById("cell-" + String(posy) + "-" + String(posx));
          removeClass(x, 'black');
          
        }


        function dibujar() {
          var x = document.getElementById("cell-" + String(posy) + "-" + String(posx));
          removeClass(x, 'black');
          addClass(x, 'black');

        }
        dibujar();
        document.getElementById("btnleft").onclick = moveleft;
        document.getElementById("btntop").onclick = movetop;
        document.getElementById("btnright").onclick = moveright;
        document.getElementById("btnbottom").onclick = movebottom;

        (function() { /* setting control for touchscreens */
          
        var arrows = [], i, elem;

        arrows[0] = document.getElementById("btnleft");
        arrows[1] = document.getElementById("btntop");
        arrows[2] = document.getElementById("btnright");
        arrows[3] = document.getElementById("btnbottom");

        for(i = 0; i< 4; i++) {
          elem = arrows[i];

          elem.onmouseover = function(e) {
            this.style.backgroundPositionY = '-35px';
          };
          elem.onmouseout = function(e) {
            //console.log(elem.className);
            this.style.backgroundPositionY = '';
          };
   
        }
 
        })();/* end setting control for touchscreens */

      function callhelp() {
        MESSAGE(wellcome); 
        return false;
      }


      callhelp();
      ghost();
      TIMER('thetimer');
      sound_manager('soundmanager');
}

 
