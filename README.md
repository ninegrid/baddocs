baddocs
=======

The worst, most feature-less most horrible documentation system ever, except
that it's not.  Write your docs in multiple markdown files `*.mdpp`.  Weave 
them all into a single `*.md` by making use of !INCLUDE preprocessor directives.
Supports synthetically embedding youtube videos, `LaTeX`, interactive process 
diagramming with `joint.js`... github flavored markdown, and a bunch of other
stuff.

Includes are *evaluated recursively* and *rendered in place*.  Awesome. Only one
external dependency: [Markdown-PP](http://github.com/jreese/markdown-pp).

```shell
npm install --save baddocs
```

```javascript
var baddocs = require('baddocs');

var config = {
//  port: 9000,
//  env: 'dev',
};

baddocs(config);
```

Setup a `header.html` and a `footer.html`.  And author your *.mdpp.  Here's what
you can do:

Check the example folder in the repo for more information. The example outputs
the following markdown and serves it over express at a specified port:


baddocs example
=============

_Proudly, the worlds worst document engine. Ever._

Table of Contents
-----------------
- - - -

1\.  [Our story unfolds](#ourstoryunfolds)  
1.1\.  [Links with references](#linkswithreferences)  
1.2\.  [Math](#math)  
1.3\.  [Code](#code)  
1.3.1\.  [baddocs/index.js](#baddocs/index.js)  
1.4\.  [Joint](#joint)  
1.5\.  [Tables](#tables)  
1.6\.  [Images](#images)  
1.7\.  [Video](#video)  
1.8\.  [Recursive in place markdown includes](#recursiveinplacemarkdownincludes)  
1.9\.  [Stuff in between](#stuffinbetween)  
1.9.1\.  [Epic unordered list of ordered numbers](#epicunorderedlistoforderednumbers)  
2\.  [The End](#theend)  
2.1\.  [Twist](#twist)  
2.2\.  [The Real End](#therealend)  
3\.  [References](#references)  

- - - -

<a name="ourstoryunfolds"></a>

# 1\. Our story unfolds

You need docs fast. Should be like [github] flavored markdown, but more files.
You'll need images, video, any javascript you haven't thought of yet, 
interactive diagrams, links with a reference section for citations, and tables
and lists.  Uh... automatic table of contents and recursively 

So you head off in that exact order and what do you get?:
:
<a name="linkswithreferences"></a>

## 1.1\. Links with references

[github]: http://www.github.com/ninegrid/baddocs "baddocs homepage at Github"


<a name="math"></a>

## 1.2\. Math

> ![r_{xy} = {n \sum_i x_i y_i - \sum_i x_i \sum_i y_i \over \sqrt{n \sum_i x_i^2 - (\sum x_i)^2} \sqrt{n \sum_i y_i^2 - (\sum_i y_i)^2}}.](http://quicklatex.com/cache3/ql_615737858134b280b9a8b4c29553ad15_l3.png "r_{xy} = {n \sum_i x_i y_i - \sum_i x_i \sum_i y_i \over \sqrt{n \sum_i x_i^2 - (\sum x_i)^2} \sqrt{n \sum_i y_i^2 - (\sum_i y_i)^2}}.")


<a name="code"></a>

## 1.3\. Code

<a name="baddocs/index.js"></a>

### 1.3.1\. baddocs/index.js
```javascript
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
```

<a name="joint"></a>

## 1.4\. Joint

Interactive process charting (click a box to start the animation). Drag the
boxes around if want.  Try and put them back again exactly right if you're OCD.

<style>
  #basic{
    display: inline-block;
    border: 1px solid gray;
  }
</style>

<div id="basic-joint">
</div>

<script src="/joints/basic.js">
</script>

<a name="tables"></a>

## 1.5\. Tables

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

<a name="images"></a>

## 1.6\. Images

![ninegrid](https://avatars.githubusercontent.com/u/512206?s=460) "ninegrid"

<a name="video"></a>

## 1.7\. Video

!VIDEO "http://www.youtube.com/watch?v=uk-CF7klLdA"

<a name="recursiveinplacemarkdownincludes"></a>

## 1.8\. Recursive in place markdown includes




- - - -

<a name="stuffinbetween"></a>

## 1.9\. Stuff in between

Everything thats been included gets picked up by the TOC. [github].

- - - -


<a name="epicunorderedlistoforderednumbers"></a>

### 1.9.1\. Epic unordered list of ordered numbers
  * 1 (one)
  * 2 (two)
  * 3 (three)

- - - -

<a name="theend"></a>

# 2\. The End

The end.

<a name="twist"></a>

## 2.1\. Twist

Fight the boss twice.

<a name="therealend"></a>

## 2.2\. The Real End

The end.

- - - -

<a name="references"></a>

# 3\. References

*	[baddocs homepage at Github][github]
