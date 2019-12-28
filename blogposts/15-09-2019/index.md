---
path: '/CellAutomata'
title: 'Cellular Automata'
date: "2019-02-20"
image: './ca2.jpg'
tags: [JavaScript, p5.js]
published: true
context: "A Personal Project"
summary: "This is a summary! "
inprogress: true
---
###Cellular automaton is the process of a group of "cells" in a grid which develop through linear time steps.The evolution of these cells are based on rules which are applied in relation to the state of the cells surronding neighbours.

Over the last few weeks I have spent time looking at Cellular Automation, as in all honesty it looked like fun. A popular example of Cellular Automation was [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) also known as just the "Game of Life" due to comparisons on how the cells live and die based on under/over population. I felt this would be a good first step into the realm of the subject so I decided to try and replicate it. The outcome was a successful application built using just Javascript and a library known as [p5.js](https://p5js.org/) which provides functionality for drawing on html canvas'. A convinent iframe displaying my iteration of this can be seen below. 
      <iframe class="exampleContainer" src="/examples/conwaysgameoflife/ConwaysGameOfLife.html" width="800" height="600"></iframe>

After developing a working version of Conway's game of life, I decided to try and develop "Wolfram's Elementary Celllular Automaton" dubbed the simplest one-dimensional cellular automation there is; Due to the fact that each cell only looks at two neigbours, its left and right. Despite this definition many cool looking patterns can be made, and as seen in the example below, I have implemented several "rules" defined on [Wolfram maths website](http://mathworld.wolfram.com/ElementaryCellularAutomaton.html). These rules are simply 8 binary digits indicating whether cell is alive or dead. While I suggest you read up on the rules via the wolfram site link provided, the result is as seen below. 

###You can switch the rule implemented using the dropdown.
<iframe class="exampleContainer" src="/examples/wolframs/Wolframs.html" width="800" height="600"></iframe>