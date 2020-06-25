---
path: '/CellAutomata'
title: 'Cellular Automata'
date: "2019-12-20"
image: './ca3.png'
tags: [JavaScript, p5.js]
published: true
context: "A Personal Project"
summary: "Deciding to research Cellular Automata and see what kind of automations I can conjure up. Starting with Conway's Game of Life and ending with Cellular Automata Empires"
inprogress: true
---

Back during my University days, during my lessons of data structures, I was introduced to two dimensional arrays and for whatever reason I was intrigued, I thought why stop at two? Are there three? Four? Ten? It's a subject that really appealed to me. I wanted to explore it further, but my coding abilities back then were limited to Java and maybe a bit of C. So my first attempt at anything using a two dimensional array, a rendition of Game Of Life in Java - ended up having some of the worst memory leakage you’d ever see, to a point where that github repository is going to forever be placed in private. However I have decided to have another crack at it, this time actually researching and delving into the subject of ***Cellular Automata***.

First I picked my language - this time opting for JavaScript due to recently having the luxury of using it to build my portfolio site. Next I had to decide how I was going to draw the cellular automations I was about to conjure up, to which I found the youtube channel [Coding Train](https://www.youtube.com/watch?v=FWSR_7kZuYg), who suggested the library [p5.js](https://p5js.org/); A javascript library used for manipulating HTML Canvas’. Using this, along with a number of video examples, coding train’s which were linked earlier as well as the YouTuber [Hopson](https://www.youtube.com/watch?v=WVCM3Rv4VV8) I was able to create my own rendition of Conway’s Game of Life, this time with no memory leakage!

#####Click "Start" on the examples to run them. 
<iframe class="exampleContainer" src="/examples/conwaysgameoflife/ConwaysGameOfLife.html" width="800" height="600"></iframe>


After this I decided I didn’t want to stop, I mean I was having too much fun and decided to have a crack at “Wolfram’s Elementary Cellular Automaton”. Which was actually a backwards step in terms of skill level, due to the fact that each cell only changes its state based on two of its neighbours, rather than in Game of Life where the cell is looking at all 8 of its neighbours. 

#####You can switch the rule using the dropdown at the top of the example.
<iframe class="exampleContainer" src="/examples/wolframs/Wolframs.html" width="800" height="600"></iframe>

Now these two had been made, I wanted to finish off this little research project with my own thing, something which wasn’t following an already established set of rules. So I decided to take inspiration from the youtuber [Hopson](https://www.youtube.com/watch?v=t73z0fzxMlE&t) once again, and develop a cellular automata of a world map, where team’s would randomly spawn on the map and then attempt to be the last team standing.

[[imageout]]
| ![something](./teams.gif "image-inline maxwidth")Gif of the teams in action

Each team would only spawn on green pixels and would begin with a set amount of health. However as they reproduced to neighbouring cells they would gain a chance to increase or decrease in health. Once they came into contact with an enemy cell, they would fight and whoever had the highest health + the luckiest dice roll would proceed to win the battle, spreading to the enemies cell. 

I made my first initial mistake when implementing the health system. Each team's cells were sharing the same pool of health, rather than inheriting and having their own health pools. This was due to referencing the same variable (whoops). It caused a hilarious animated Piet Modrian art piece though: 

[[imageout]]
|![attempt1](./attempt1.gif "image-outline")The first attempt didn't fair so well...


After fixing this the original take on this worked okay, but no team ended up winning unless they managed to luck out, causing an endless struggle of warfare; this wasn’t necessarily bad but I really wanted to see a team win - so I added a mechanic where the size of the team was taken into account. 

[[imageout]]
|![attempt2](./attempt2.gif "image-outline") You guys are meant to fight.. not this

After adding the landslide victory mechanic, I decided some users may want to experience some alternate scenarios, where the size of the country doesn’t matter or where the countries would change colour every time they evolved. I also implemented multiple different buttons etc for better control of the simulation, polished some styling here and there, and decided to call it a day.

[[imagefull]]
| ![final](./empires.png "image-inline")The end result.

Due to making it all in Javascript, you can run the scenario yourself through the button below.

[[button]]
| [View the final version here](/examples/empires/empires.html)
