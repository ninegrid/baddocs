baddocs
=======

The worst, most feature-less most horrible documentation system ever, except
it's not.  Write your docs in multiple mardown files `*.mdpp`.  Weave them all
into a single `*.md` by making use of !INCLUDE preprocessor directives.
Supports synthetically embedding youtube videos, `LaTeX`, interactive process 
diagramming with `joint.js`... github flavored markdown, and a bunch of other
stuff.

Includes are evaluated recursively and rendered in place.  Depends on
`Markdown-PP`.

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

Setup a `header.html` and a `footer.html`.  And author your *.mdpp.

```md
Feature Tests
-------

This shim supports the following features, remove this section entirely from
your fork.

##### INCLUDE

!INCLUDE "includes/section1.mdpp"
!INCLUDE "includes/section2.mdpp

##### Math

> $r_{xy} = {n \sum_i x_i y_i - \sum_i x_i \sum_i y_i \over \sqrt{n \sum_i x_i^2 - (\sum x_i)^2} \sqrt{n \sum_i y_i^2 - (\sum_i y_i)^2}}.$

##### Code

```python
# Multi-armed Bandit Algorithm
def choose():
    if math.random() < 0.1:
        # exploration!
        # choose a random lever 10% of the time.
    else:
        # exploitation!
        # for each lever, 
            # calculate the expectation of reward. 
            # This is the number of trials of the lever divided by the total reward 
            # given by that lever.
        # choose the lever with the greatest expectation of reward.
    # increment the number of times the chosen lever has been played.
    # store test data in redis, choice in session key, etc..

def reward(choice, amount):
    # add the reward to the total for the given lever.
```

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

![Promitheia Technologies, LLC](images/pti.png) "Promitheia Technologies"

##### Video

!VIDEO "http://www.youtube.com/embed/lQAV3bPOYHo"
```


