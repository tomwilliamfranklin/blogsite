---
path: '/SnakeAI'
title: 'Attempting to make a snake AI'
date: "2020-02-15"
image: './ca2.jpg'
tags: [JavaScript, p5.js]
published: true
context: "A Personal Project"
summary: ""
inprogress: true
---

####This post is in ongoing development! Some parts may seem incomplete.

To begin creating implementing the pathing system, I first created the Snake game, which I could then build on. This is fully playable and can be found here 

[[button]]
| [Play it here](/examples/snake/index.html)

I then looked into different pathing algorithms I could use, and then thought back to [Dijkstra's shortest path algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm); Which as the name implies is ued to find the shortest path through nodes in a graph. 

[[imageout]]
| ![something](./da.gif "image-inline maxwidth")Gif of Dijkstra's Algorithm

I then pivoted to using the A* Algorithm, which is a pathing algorthm based on Dijkstras algorithm. It is commonly used for solving mazes due to its efficiency. It involves calculating 3 values for each block in a grid, its g cost is the distance from the starting node, and the h cost is the distance from the end node. The final value, the f cost, is the sum of the h and g. This f cost gives us the weighting on whether to take this block in the path. This allows us to create the lowest valued path to the end node. 

I used this on the snake, it would calculate cheapest f cost to the end node (the snakes food) and then use this to generate it into a set of readable moves for the snake. This worked well enough, but would occasional miss the last move, causing it to become 1 behind and from then on be consistantly be behind, sometimes causing it infinitely follow itself around the food, as seen below. 

[[imageout]]
| ![something](./s1.gif "image-inline maxwidth")AI realised the only way to win, was not to score...

Fixing this, I then came to another issue, where the snake would trap itself with its body. To try and prevent this, I made the Algorithm go for the longest path instead of the shorted (highest cost), this would cause it to take longer getting to the food, by zigzagging its body. 

[[imageout]]
| ![something](./s2.gif "image-inline maxwidth")Snake entrapping itself.

Finally after adding this, I added a survival mode for when it is unable to find the food, making it go for the furthest possible point. This works to an extent, but still errors when entrapping itself. This is something I still need to work on, and will probably start fresh if I were to try this project again.

For now though, you can check the project out here, in its latest - buggy form: 
(Iv also added the snakes thoughts to the bottom of the page, for added comedic affect)
[[button]]
| [Run the pathing AI here](/examples/snake-ai/index.html)
