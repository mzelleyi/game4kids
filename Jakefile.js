var util = require('util')
  , exec = require('child_process').exec
  , fs   = require('fs')
  , ugly = require('uglify-js')
  , jsp  = ugly.parser
  , pro  = ugly.uglify
  ;

var applications = [ 'alphabet', 'maze'] //, 'memotest', 'qanda' ];

task('maze', [], function(params) {
  var path = applications[1] + '/src/'
    , res  = applications[1] + '/js/'
  ;
  fs.readdir(path, function(err, files) { 
    var filesjs = [], out, i;

    console.log('Unifying all js');
    for (i=0; i< files.length; i++) {
      if (/\.js$/.test(files[i])) {
        filesjs.push(files[i]);
      }
    }
    out = filesjs.map(function(f) { return fs.readFileSync(path+f, 'utf8'); });
    out = out.join('\n');  
    console.log('Done.');

    console.log('Minifying and Fuzzing the out');
    out = jsp.parse(out);
    out = pro.ast_mangle(out);
    out = pro.ast_squeeze(out);
    out = pro.gen_code(out)
    console.log('Done.');

    console.log('Making the result file in ' + path+applications[1] + '.js');
    fs.writeFileSync(res + applications[1] + '.js', out, 'utf8')
    console.log('Done');

  });
});

task('alphabet', [], function(params) {
  var path = applications[0] + '/src/'
    , res  = applications[0] + '/js/'
  ;
  fs.readdir(path, function(err, files) { 
    var filesjs = [], out, i;

    console.log('Unifying all js');
    for (i=0; i< files.length; i++) {
      if (/\.js$/.test(files[i])) {
        filesjs.push(files[i]);
      }
    }
    out = filesjs.map(function(f) { return fs.readFileSync(path+f, 'utf8'); });
    out = out.join('\n');  
    console.log('Done.');

    console.log('Minifying and Fuzzing the out');
    out = jsp.parse(out);
    out = pro.ast_mangle(out);
    out = pro.ast_squeeze(out);
    out = pro.gen_code(out)
    console.log('Done.');

    console.log('Making the result file in ' + path+applications[0] + '.js');
    fs.writeFileSync(res + applications[0] + '.js', out, 'utf8')
    console.log('Done');

  });
});
desc('Make maze game encription');

task('default', applications, function(params) {
  console.log ("All work Done");
});
