module.exports = function(config) {
  var express = require('express'),
      http = require('http'),
      path = require('path'),
      marked = require('marked'),
      fs = require('fs'),
      exec = require('child_process').exec;

  var app = express();

  config = config || {};
  config.port = config.port || Number(process.env.PORT);
  config.env = config.env || String(process.env.ENV);
  config.path = config.path || process.cwd();
  config.markedOptions = config.markedOptions || {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  };

  app.set('port', config.port);
  app.set('env', config.env);
  app.set('path', config.path);

  app.use(express.static(config.path, 'includes'));

  // development only
  if ('development' == app.get('env')){
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
  }

  app.get('/', function(req,res) {
    // write the head
    fs.readFile('header.html',function(err,html){
      res.write(html,'utf8');
      // then write the markdown body
      fs.readFile('views/index.md',function(err,md){
        if(err){console.log(err);}
        marked(md.toString(),function(err,html){
          res.write(html,'utf8');
          // then write the closing tags for the head
          fs.readFile('footer.html',function(err,html){
            res.write(html,'utf8');
            res.end();
          });
        });
      });
    });
  });

  exec('markdown-pp index.mdpp views/index.md',function(err,stdout,stderr){
    if (err) {
      console.log(err.stack);
      console.log('Error code: ' + err.code);
      console.log('Signal received: ' + err.signal);
    }
    if (stderr) {
      console.log('markdown-pp: ' + stderr);
    }
    console.log('markdown-pp: ' + stdout);
    http.createServer(app).listen(app.get('port'),function(){
      console.log('Server on port ' + app.get('port'));
    });
  });
};
