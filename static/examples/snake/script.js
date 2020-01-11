const w = 1200;
const h = 1200;
const square = 100;
const map = new Array(w/square);
const foodmap = new Array(w/square);
const background = [38,38,38];
const player = [201, 111, 66];
const playerStroke = [81, 92, 83];
const head = [250, 138, 82];
const dead = [166, 45, 45];
let currentHead = [0,0];
let snakeLength = 0;

let direction = "up";
let sketch = function(p) {
    for(var i = 0; i<map.length; i++) {
        map[i] = new Array(h/square);
        foodmap[i] = new Array(h/square);
    }

    p.setup = function() {
        direction = "up";
        const wrandom = Math.floor(Math.random() * (w/square));
        const hrandom = Math.floor(Math.random() * (h/square));
        p.createCanvas(w,h);
        p.background(255,204,0);
        p.fill(background);           	
        p.stroke(playerStroke);
        for(var i = 0; i!=w; i = i+square) {
            for(var ii = 0; ii!=h; ii = ii+square) {
                map[i/square][ii/square] = false;
                foodmap[i/square][ii/square] = false;
                p.square(i, ii, square);
            }
        }
        p.fill(player);
        p.square(w/2,h/2, square);
        currentHead[0] = w/2/square;
        currentHead[1] = h/2/square;

        map[w/square/2][h/square/2] = true;
        snakeLength = 1;

        p.frameRate(10);
        createFood();
    }

    const coor = {up:[0, -1],  //im actually a genius
    left:[ -1, 0],          right:[ +1, 0],
                down:[0, +1]};


    const snake = [];

    p.draw = function() { 
        const toHead = [];
        var temp1 = currentHead[0];
        var temp2 = currentHead[1];
                if(map[temp1 + coor[direction][0]] != null) {
                    if(map[temp1 + coor[direction][0]][temp2+coor[direction][1]] != null) {
                        if(map[temp1 + coor[direction][0]][temp2+coor[direction][1]] == true) {
                            //endGame();
                        } else {
                            if(foodmap[temp1 + coor[direction][0]][temp2+coor[direction][1]] === true) {
                                snakeLength++;
                                foodmap[temp1 + coor[direction][0]][temp2+coor[direction][1]] = false;
                                createFood();
                            }
                            makeHead(temp1 + coor[direction][0], temp2 + coor[direction][1]);
                            addToSnake(temp1,temp2);

                            if(snake.length > snakeLength) {
                                removeTail();
                            }                
                        }
                    } else {
                       // endGame();
                }    
                }  else {
                    //endGame();
                }                
        p.updatePixels();
    }

    function endGame() {
        for(var i = 0; i!=w; i = i+square) {
            for(var ii = 0; ii!=h; ii = ii+square) {
                    var temp1 = i/square;
                    var temp2 = ii/square;

                    if(map[temp1][temp2]  == true) {
                        p.fill(dead);
                        p.square(i,ii, square);
                    }         
                
            }
        }

        p.updatePixels();
    }

     p.keyPressed = function() {
        if(p.keyCode === p.UP_ARROW) {
            direction = "up";
            console.log(direction);
        }
        if(p.keyCode === p.LEFT_ARROW) {
            direction = "left";
            console.log(direction);
        }
        if(p.keyCode === p.RIGHT_ARROW) {
            direction = "right";
            console.log(direction);
        }
        if(p.keyCode === p.DOWN_ARROW) {
            direction = "down";
            console.log(direction);
        }
    }

    function addToSnake(width,height) {
        p.fill(player);
        p.square(width*square,height*square, square);
        snake.push([width, height]);
    }

    function makeHead(width,height) {
      //  snake.unshift([width, height]);
        p.fill(head);
        p.square(width*square,height*square, square);
        map[width][height] = true;
        currentHead[0] = width;
        currentHead[1] = height;
    }

    function removeTail() {
        p.fill(background);
        var tail = snake.shift();
        map[tail[0]][tail[1]] = false;
        p.square(tail[0]*square,tail[1]*square, square);
    }

    function createFood() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        p.fill(r, g, b);

        const wRandom = Math.floor(Math.random() * w/square) * square;
        const hRandom = Math.floor(Math.random() * h/square) * square;
        if(map[wRandom/square][hRandom/square]) {
            createFood();
        } else {
            foodmap[wRandom/square][hRandom/square] = true;
            p.square(wRandom, hRandom, square);
        }
    }
}

$(document).ready(function() {
    new p5(sketch, 'container');
});