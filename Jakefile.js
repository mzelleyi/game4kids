var util = require('util')
  , exec = require('child_process').exec
  , fs   = require('fs')
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

function log(message, color) {
  message = (typeof(color) === 'string')? colors[color] + message + colors.reset: message;
  process.stdout.write(message + '\n');
}

task('deploy', [], function(params) {
  var cmd = "rsync -e ssh --stats --progress  -avz --exclude '.git' ~/dev/game4 dsl.puntania.com.ar:dsl.puntania.com.ar";
  
});



task('qanda', [], function(params) {
  var path = applications[3] + '/src/'
    , res  = applications[3] + '/js/'
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

        log('\tMaking the result file in ' + res+f);
        fs.writeFileSync(res + f, out, 'utf8')
      }
    }

  log('Done', 'red');
  });

});



task('memotest', [], function(params) {
  var path = applications[2] + '/src/'
    , res  = applications[2] + '/js/'
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

    log('\tMaking the result file in ' + path+applications[2] + '.js');
    fs.writeFileSync(res + applications[2] + '.js', out, 'utf8')

  });
});


task('maze', [], function(params) {
  var path = applications[1] + '/src/'
    , res  = applications[1] + '/js/'
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
    fs.writeFileSync(res + applications[1] + '.js', out, 'utf8')

  });
});

task('alphabet', [], function(params) {
  var path = applications[0] + '/src/'
    , res  = applications[0] + '/js/'
  ;
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

    log('\tMaking the result file in ' + path+applications[0] + '.js');
    fs.writeFileSync(res + applications[0] + '.js', out, 'utf8')

  });
});

desc('Make maze game encription');
task('default', applications, function(params) {
});
