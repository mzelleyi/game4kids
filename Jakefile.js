var util = require('util')
  , exec = require('child_process').exec
  , fs   = require('fs')
  , fspath = require('path')
  , ugly = require('uglify-js')
  , jsp  = ugly.parser
  , pro  = ugly.uglify
  , colors = {
    red   : '\033[31m',
    blue  : '\033[34m', 
    reset : '\033[0m'
  }
  ;

var applications = [ 'alphabet', 'maze', 'memotest', 'qanda' ];

var files = { 
  alphabet: {
    css: [
      'css/styles.css'
    ],
    js: [
      "js/utils.js",
      "js/main.js", 
      "js/sha256.js"
    ],
    images: [
      "images/mnaranja.png",
      "images/fondo.old.png",
      "images/mazul.png",
      "images/cartel.png",
      "images/mvioleta.png",
      "images/fondo.png",
      "images/mrosa.png",
      "images/bgmetal.jpg",
      "images/logod.png",
      "images/minsalud.png",
      "images/fadestrip2.png",
      "images/bg.gif",
      "images/sound.png",
      "images/close.png",
      "images/win.png",
      "images/background.png"
    ],
    sound: [
      "sound/backsound.mp3",
      "sound/01.wav",
      "sound/suma_mal.wav",
      "sound/12.wav",
      "sound/osito.mp3",
      "sound/11.wav",
      "sound/01 (1).wav",
      "sound/00.wav"
    ]
  }, 
  maze: {
    css: [
      'styles.css'
    ],
    js: [
      'util.js', 'main.js'
    ],
    images: [
    ],
    sound: [
    ]
  }, 
  memotest: [
  ], 
  qanda: [
  ], 
};
var src = 'src/';
var build = 'build/';

function log(message, color) {
  message = (typeof(color) === 'string')? colors[color] + message + colors.reset: message;
  process.stdout.write(message + '\n');
}

function mkdir(path, root) {
  var dirs = path.split('/'), dir = dirs.shift(), root = (root||'')+dir+'/';
  try { fs.mkdirSync(root); }
  catch (e) {
    //dir wasn't made, something went wrong
    if(!fs.statSync(root).isDirectory()) throw new Error(e);
  }
  return !dirs.length||mkdir(dirs.join('/'), root);
}

task('deploy', [], function(params) {
  var cmd = "rsync -e ssh --stats --progress  -avz --exclude '.git' ~/dev/game4 dsl.puntania.com.ar:dsl.puntania.com.ar";
  
});



task('qanda', [], function(params) {
  var path = src + applications[3] + '/src/'
    , res  = build + applications[3] + '/js/'
  ;

  fs.readdir(path, function(err, files) { 
    var filesjs = [], out, i, f;
    log('Building qanda javascript', 'red');

    for (i=0; i< files.length; i++) {
      if (/\.js$/.test(files[i])) {
        //filesjs.push(files[i]);
        f = files[i]
        log('\tMinifying and Fuzzing \t' + path+f);
        out = fs.readFileSync(path + f, 'utf8');
        out = jsp.parse(out);
        out = pro.ast_mangle(out);
        out = pro.ast_squeeze(out);
        out = pro.gen_code(out)
        fspath.exists(res, function(isthere) {
          if (!isthere) { mkdir(res); }
          fs.writeFileSync(res + applications[1] + '.js', out, 'utf8')
          log('\tMaking the result file in ' + res+f);
        });
      }
    }

  log('Done', 'red');
  });

});



task('memotest', [], function(params) {
  var path = src + applications[2] + '/src/'
    , res  = build + applications[2] + '/js/'
  ;

  log('Building memotest javascript', 'red');
  fs.readdir(path, function(err, files) { 
    var filesjs = [], out, i;

    log('\tUnifying all js');
    for (i=0; i< files.length; i++) {
      if (/\.js$/.test(files[i])) {
        filesjs.push(files[i]);
      }
    }
    out = filesjs.map(function(f) { return fs.readFileSync(path+f, 'utf8'); });
    out = out.join('\n');  

    log('\tMinifying and Fuzzing the out');
    out = jsp.parse(out);
    out = pro.ast_mangle(out);
    out = pro.ast_squeeze(out);
    out = pro.gen_code(out)
    fspath.exists(res, function(isthere) {
      if (!isthere) { mkdir(res); }
      fs.writeFileSync(res + applications[1] + '.js', out, 'utf8')
    log('\tMaking the result file in ' + path+applications[2] + '.js');
    });



  });
});


task('maze', [], function(params) {
  var path = src + applications[1] + '/src/'
    , res  = build + applications[1] + '/js/'
  ;
  fs.readdir(path, function(err, files) { 
    var filesjs = [], out, i;

    log('Building maze javascript', 'red');
    log('\tUnifying all js');
    for (i=0; i< files.length; i++) {
      if (/\.js$/.test(files[i])) {
        filesjs.push(files[i]);
      }
    }
    out = filesjs.map(function(f) { return fs.readFileSync(path+f, 'utf8'); });
    out = out.join('\n');  

    log('\tMinifying and Fuzzing the out');
    out = jsp.parse(out);
    out = pro.ast_mangle(out);
    out = pro.ast_squeeze(out);
    out = pro.gen_code(out)

    log('\tMaking the result file in ' + path+applications[1] + '.js');
    fspath.exists(res, function(isthere) {
      if (!isthere) { mkdir(res); }
      fs.writeFileSync(res + applications[1] + '.js', out, 'utf8')
    });

  });
});


function sync(o) {
  var k, e;
  if (typeof(o) === 'string') {
    log(o);
  } else {
    for (k in o) {
      e = o[k];
      sync(e);
    }
  }
}
task('alphabet', [], function(params) {
  var listfiles
    , out
    , directory
    , targetfile
    , targetdirectory
  ;
  
  listfiles = files.alphabet.js;
  directory = listfiles[0].split("/").slice(0, -1).join('/');
  targetdirectory = build + 'alphabet/' + directory; 
  outstream = listfiles.map(function(f){ 
    return fs.readFileSync(src + 'alphabet/' + f, 'utf8');
  });
  outstream = outstream.join('\n');
  outstream = jsp.parse(outstream);
  outstream = pro.ast_mangle(outstream);
  outstream = pro.ast_squeeze(outstream);
  outstream = pro.gen_code(outstream)
  fspath.exists(targetdirectory, function(isthere) {
    targetfile = targetdirectory + '/alphabet.js';
    if (!isthere) { mkdir(targetdirectory); }
    fs.writeFileSync(targetfile, out, 'utf8');
    log('\tMaking the result file in ' + targetfile );

    listfiles = files.alphabet.css;
    directory = listfiles[0].split("/").slice(0, -1).join('/');
    targetdirectory = build + 'alphabet/' + directory; 
    outstream = listfiles.map(function(f){ 
      return fs.readFileSync(src + 'alphabet/' + f, 'utf8');
    });
    outstream = outstream.join('\n');
    fspath.exists(targetdirectory, function(isthere) {
      targetfile = targetdirectory + '/style.css';
      if (!isthere) { mkdir(targetdirectory); }
      fs.writeFileSync(targetfile, out, 'utf8');
      log('\tMaking the result file in ' + targetfile );

      listfiles = files.alphabet.images;
      for (i=0; i<listfiles.length; i++) {
        directory = listfiles[i].split("/").slice(0, -1).join('/');
        targetdirectory = build + 'alphabet/' + directory; 
        fspath.exists(targetdirectory, (function (i) {
          return function(isthere) {
            targetfile = build+ 'alphabet/' + listfiles[i];
            sourcefile = src  + 'alphabet/' + listfiles[i];
            if (!isthere) { mkdir(targetdirectory); }
            console.log(sourcefile);
            console.log(targetfile);

            fs.readFileSync(sourcefile, 'utf8');
            util.pump(sourcefile, targetfile);
            log('\tMaking the result file in ' + targetfile );
          }
        })(i));
      }

    });

  });


  
  

/*
  fs.readdir(path, function(err, files) { 
    var filesjs = [], out, i;

    log('Building alphabet javascript', 'red');
    log('\tUnifying all js');
    for (i=0; i< files.length; i++) {
      if (/\.js$/.test(files[i])) {
        filesjs.push(files[i]);
      }
    }
    out = filesjs.map(function(f) { return fs.readFileSync(path+f, 'utf8'); });
    out = out.join('\n');  

    log('\tMinifying and Fuzzing the out');
    out = jsp.parse(out);
    out = pro.ast_mangle(out);
    out = pro.ast_squeeze(out);
    out = pro.gen_code(out)
    fspath.exists(res, function(isthere) {
      if (!isthere) { mkdir(res); }
      fs.writeFileSync(res + applications[1] + '.js', out, 'utf8')
    log('\tMaking the result file in ' + path+applications[0] + '.js');
    });
  });
*/
});

desc('Make maze game encription');
task('default', applications, function(params) {
});
