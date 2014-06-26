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

```Markdown
Feature Tests
-------

##### INCLUDE

!INCLUDE "includes/section1.mdpp"
!INCLUDE "includes/section2.mdpp

##### Math

> $r_{xy} = {n \sum_i x_i y_i - \sum_i x_i \sum_i y_i \over \sqrt{n \sum_i x_i^2 - (\sum x_i)^2} \sqrt{n \sum_i y_i^2 - (\sum_i y_i)^2}}.$

##### Code

\`\`\`F#
(*
  <LionMadeOfLions> scientists are baffled, though, it will be decades before we
                    begin to understand the lion made of lions

  <ninegrid> challenge accepted
*)

type LionMadeOfLions = Lions | Lion of LionMadeOfLions * LionMadeOfLions
let lionMadeOfLions = Lion(Lion(Lion(Lions,Lions),Lions),Lions)

(*
           Lion
          /    \
         Lion  Lions
        /    \
      Lion  Lions
      /   \
    Lions Lions
*)

let rec y f x = f (y f) x
let understand x = printfn "%A" x

let lions (lions : LionMadeOfLions -> LionMadeOfLions) = function
  | Lion (x,y) -> lions x
  | Lions      -> Lions

y (lions >> fun f lion -> understand lion; f lion) lionMadeOfLions

(* output:
  Lion (Lion (Lion (Lions,Lions),Lions),Lions)
  Lion (Lion (Lions,Lions),Lions)
  Lion (Lions,Lions)
  Lions

  val it : LionMadeOfLions = Lions
*)
\`\`\`

##### Joint

Interactive process charting (double click a box to start animation).

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

##### Tables

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

##### Images

![Awesome Logo, LLC](images/pti.png) "Awesome Company"

##### Video

!VIDEO "http://www.youtube.com/embed/lQAV3bPOYHo"
```

Now you can make markdown documents from lots of little markdown documents.
This is good for authoring stuff like Operations Manuals for startups.
