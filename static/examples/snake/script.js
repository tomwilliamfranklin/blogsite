const w = 700;
const h = 700;
const square = 25;
const map = new Array(w/square);
const foodmap = new Array(w/square);
const background = [38,38,38];
const endBackground = [18, 18, 18];
const player = [201, 111, 66];
const playerStroke = [81, 92, 83];
const head = [250, 138, 82];
const dead = [166, 45, 45];
let currentHead = [0,0];
let snakeLength = 0;
let gamePlaying = true;
let snake = [];
let frameRate = 20;
let direction = "up";
let canvas = null;
let sketch = function(p) {
    canvas = p;
    for(var i = 0; i<map.length; i++) {
        map[i] = new Array(h/square);
        foodmap[i] = new Array(h/square);
    }

    p.setup = function() {
        snake = [];
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

        p.frameRate(frameRate);
        createFood();
    }

    const coor = {up:[0, -1],  //im actually a genius
    left:[ -1, 0],          right:[ +1, 0],
                down:[0, +1]};

    let previousDirection = "down";
    p.draw = function() { 
        p.frameRate(frameRate);
        const toHead = [];
        var temp1 = currentHead[0];
        var temp2 = currentHead[1];
                if(map[temp1 + coor[direction][0]] != null) {
                    if(map[temp1 + coor[direction][0]][temp2+coor[direction][1]] != null) {
                        if(map[temp1 + coor[direction][0]][temp2+coor[direction][1]] == true) {
                            endGame();
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
                        endGame();
                }    
                }  else {
                    endGame();
                }        
                setScore();        
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
                    else {
                        p.fill(endBackground);
                        p.square(i,ii,square);
                    }
            }
        }

        p.updatePixels();
        gamePlaying = false;
        p.frameRate(0);
        
    }
    previousDirection = "up";
     p.keyPressed = function() {
            if(!gamePlaying) {
                p.setup();  
                gamePlaying = true; 
            } else {
            previousDirection = direction;

            if(p.keyCode === p.UP_ARROW) {
                if(previousDirection != "down") {
                    direction = "up";
                    console.log(direction);
                }
            }
            if(p.keyCode === p.LEFT_ARROW) {
                if(previousDirection != "right") {
                    direction = "left";
                    console.log(direction);
                }
            }
            if(p.keyCode === p.RIGHT_ARROW) {
                if(previousDirection != "left") {
                    direction = "right";
                    console.log(direction);
                }
            }
            if(p.keyCode === p.DOWN_ARROW) {
                if(previousDirection != "up") {
                    direction = "down";
                    console.log(direction);
                }
            }
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

function changeFrameRate() {
    frameRate = parseInt(document.getElementById('frames').value);
    canvas.frameRate(frameRate);
}

function resetFunc() {
    frameRate = parseInt(document.getElementById('frames').value);
    canvas.frameRate(frameRate);
}

function setScore() {
    document.getElementById('score').innerHTML = snakeLength;
}

$(document).ready(function() {
    new p5(sketch, 'container');
});