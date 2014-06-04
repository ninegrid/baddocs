module.exports = function(config) {
  var express = require('express'),
      http = require('http'),
      path = require('path');

  var app = express();

  app.engine('md', require('marked-engine').renderFile);

  app.set('port', config.port);
  app.set('env', config.env);
  app.set('path', config.path);

  app.use(express.favicon());

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(config.path, 'chapters')))

  // development only
  if ('development' == app.get('env')){
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
  }

  app.get('/', function() {
  });

  http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
};

