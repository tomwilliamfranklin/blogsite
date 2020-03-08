const w = 500;
const h = 500;
const square = 25;
const map = new Array(w/square);
const background = [38,38,38];
const endBackground = [18, 18, 18];
const player = [201, 111, 66];
const playerStroke = [81, 92, 83];
const food = [50, 168, 82];
const head = [250, 138, 82];
const dead = [166, 45, 45];
let currentHead = [0,0];
let snakeLength = 1;
let gamePlaying = true;
let snake = [];
let frameRate = 144;
let direction = "";
let canvas = null;

//Algorithm
const openSetColour = [252, 186, 3];
const closedSetColour = [235, 64, 52];
const PathColour = [66, 135, 245];
let openSet = [];
let closedSet = [];
let start;
let end;
let foodend;
let path = [];
let AImoves = [];
let initialMove = false;

function Cell() {
    this.x = 0;
    this.y = 0;
    this.g = 0; //How far from start
    this.h = 0; //How far from end
    this.f = 0; //g + h, final cost
    this.w = false; //Wall weighting
    this.body = false;
    this.food = false;
    this.previous = null;
    this.step = null;
}

let sketch = function(p) {
    canvas = p;
    for(var i = 0; i<map.length; i++) {
        map[i] = new Array(h/square);
    }

    p.setup = function() {
        wallCheck = 0;
        wallDetected = false;
        snake = [];
        const wrandom = Math.floor(Math.random() * (w/square));
        const hrandom = Math.floor(Math.random() * (h/square));
        p.createCanvas(w,h);
        p.background(255,204,0);
        p.fill(background);           	
        p.stroke(playerStroke);
        for(var i = 0; i!=w; i = i+square) {
            for(var ii = 0; ii!=h; ii = ii+square) {
                map[i/square][ii/square] = new Cell();
                map[i/square][ii/square].x = i;
                map[i/square][ii/square].y = ii;
                p.square(i, ii, square);
            }
        }
        snakeLength = 1;
        begin();
        p.frameRate(frameRate);
        createFood();
        repathAI();
    }

    function begin() {
        p.fill(player);
        map[w/square/2][h/square/2].body = true;
        p.square(w/2,h/2, square);
        currentHead[0] = w/2/square;
        currentHead[1] = h/2/square;
        initialMove = true;
    //    repathAI();
    }

    function repathAI() {
        openSet = [];
        closedSet = [];
        openSet.push(map[currentHead[0]][currentHead[1]]);
        start = map[currentHead[0]][currentHead[1]];
        path = [];
        AImoves = [];
        endLoop = false;
        for(var i = 0; i!=w; i = i+square) {
            for(var ii = 0; ii!=h; ii = ii+square) {
                map[i/square][ii/square].g = 0;
                map[i/square][ii/square].h = 0;
                map[i/square][ii/square].f = 0;
                map[i/square][ii/square].previous = null;
            }
        }
        AIevaluate();   
    }

    const coor = {up:[0, -1],  //im actually a genius
    left:[ -1, 0],          right:[ +1, 0],
                down:[0, +1]};

    let previousDirection = "";

    //Snake Game
    p.draw = function() { 
        if(AImoves) {
            previousDirection = direction;

            dontmovepunk = false;
            switch(AImoves[0]) {
                case 'up': if(previousDirection === 'down') {
                    dontmovepunk = true;
                } break;
                case 'down': if(previousDirection === 'up') {
                    dontmovepunk = true;
                } break;
                case 'left': if(previousDirection === 'right') {
                    dontmovepunk = true;
                } break;
                case 'right': if(previousDirection === 'left') {
                    dontmovepunk = true;
                } break;
            }

            if(!dontmovepunk) {
                direction = AImoves[0];
                AImoves.shift();    
            } else {
                repathAI();
            }
            if(AImoves.length <= 0) {
            }
        } 

        p.frameRate(frameRate);
        const toHead = [];
        var temp1 = currentHead[0];
        var temp2 = currentHead[1];
        if(direction) {
                if(map[temp1 + coor[direction][0]] != null) {
                    if(map[temp1 + coor[direction][0]][temp2+coor[direction][1]] != null) {
                        if(map[temp1 + coor[direction][0]][temp2+coor[direction][1]].body == true) {
                            endGame();
                           // repathAI();
                        } else {
                            if(map[temp1 + coor[direction][0]][temp2+coor[direction][1]].food === true) {
                                generateThought("found");
                                snakeLength++;
                                map[temp1 + coor[direction][0]][temp2+coor[direction][1]].food = false;
                                createFood();

                            }
                            makeHead(temp1 + coor[direction][0], temp2 + coor[direction][1]);
                            addToSnake(temp1,temp2);

                            if(snake.length > snakeLength) {
                            removeTail();
                            }                
                        }
                    } else {
                     //  endGame();
                }    
                }  else {
                 //  endGame();
                }        
                setScore();   
        }else {
            end = foodend;
            AIevaluate();
        }

        if(AImoves.length === 0) {
            //   if(map[currentHead[0]][currentHead[1]] != end) {
                    repathAI();
                //  }
        } 
        p.updatePixels();
    }
    let initialPath = false;
    let endLoop = false;
    const neigbours =    [[0, -1, 'down'],
        [ -1, 0, 'right'],              [ +1, 0, 'left'],
                        [0, +1, 'up']];
    //A* algorithm
    let notfound = 0;
    let definitelyNotFound = 0;
    let goLong = true;
    function AIevaluate() {
        lowest = 0;
        let current = openSet[0];
        if(openSet.length > 0 && endLoop === false) {
           //  console.log(path)
           end = foodend;
            if(current.x === end.x && current.y === end.y) {
                // So the message for "found it!" has a chance to stay on screen
                window.setTimeout(() => {generateThought('see'); }, 1000);

                definitelyNotFound = 0;
                goLong = true;
                notfound = 0;
                stuck = 0;
                path = [];
                let temp = current;
                temp.step = 0;
                path.push(temp);
                i = 0;
                while(temp.previous) {
                    i++;
                    temp.previous.step = i;
                    path.push(temp.previous);
                    temp = temp.previous;
                }
                for(let step  = path.length-1; step != -1; step--) { 
                    for(let i = 0; i<neigbours.length; i++) {
                        if(path[step+1]) {
                          if(path[step+1].x/square == path[step].x/square + neigbours[i][0] && 
                            path[step+1].y/square == path[step].y/square + neigbours[i][1]) {
                                if(path[step+1].step == path[step].step+1) {
                                
                                    AImoves.push(neigbours[i][2]);
                                }
                              continue;
                          }
                        } else {
                        }
                    }
                }

                 path = [];
            } 

           removeFromArray(openSet, current);
            AIpathingLoop(current, false);
            if(openSet.length === openSetBeforeLength && wallDetected === true) {
                AIpathingLoop(current,true);
            }
            if(openSet.length === 0) {
                  //   SurvivalMode();
            } 
            AIevaluate();
        } else {
            notfound++;
            if(notfound > 1) { // ToDo currently just checking if it errors more than once, kinda a hack tbh
                generateThought("broke")
                goLong = false;
                SurvivalMode();
                // p.fill(background);
                // p.fill(randomColour())
                // p.square(end.x,end.y, square);

                current = openSet[0];
                openSet = [current];
                closedset = [];
                notfound = 0;
                definitelyNotFound++;
                if(definitelyNotFound > 5) {
                    generateThought("error");  
                } else {
                    AIevaluate(current, true);
                }
            }
        }
    }
    function SurvivalMode() {
        openSet.push(map[currentHead[0]][currentHead[1]]);
        furthestPoint = null;
        for(var i =0; i<closedSet.length; i++) {
            if(furthestPoint) {
                for(var ii = 0; ii<neigbours.length; ii++) {
                    if(map[furthestPoint.x/square + (neigbours[ii][0]*4)]) {
                        if(map[furthestPoint.x/square + (neigbours[ii][0]*4)][furthestPoint.y/square + (neigbours[ii][1]*4)]) {
                            if(!map[furthestPoint.x/square + (neigbours[ii][0]*4)][furthestPoint.y/square + (neigbours[ii][1]*4)].body) {
                                if(furthestPoint.h < closedSet[i].h) {
                                    furthestPoint = closedSet[i];
                                }
                            }
                        }
                    }
                }
            } else {
            //If furthest point is null, make it the closedSet
             furthestPoint = closedSet[i];
            }
        }
        if(furthestPoint === null) {
            furthestPoint = closedSet[i];
        }
        end = furthestPoint;
    //    testColour(furthestPoint.x/square, furthestPoint.y/square) 
    }

    function AIpathingLoop(current, isSecondTime) {
        closedSet.push(current);
        wallCheck = 0;
        wallDetected = false;
        openSetBeforeLength = openSet.length;
        // ? Basically, if its searched for a path which contains a wall, complete the loop, and if there 
        // ? isn't a better option, do the loop again with the wall cell. 
        let secondTime;
        if(isSecondTime) {
            secondTime = isSecondTime;
        }

        for(let i  = 0; i < neigbours.length; i++) {
            wallCheck++;
            if(map[current.x/square + neigbours[i][0]]) {
                if(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]]) {
                        if(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].x === 475 || map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].x === 0 || map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].y === 475 || map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].y === 0) {
                            map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].w = true;
                        }
                        if(!closedSet.includes(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]])) {
                        if(!map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].body) {
                        if(closedSet.includes(current)) {
                            let tempG = current.g + 1;

                            current.h = heuristic(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]], start);

                                if(openSet.includes(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]])) {   
    
                                    if(tempG < map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].g) {
                                    map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].g = tempG;
                                    }
                                } else {
                                    map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].g = tempG;
                                    if(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].w && !secondTime) {
                                        wallDetected = true;
                                        continue;
                                    }
                                    if(current.previous !== null) {
                                            if(snakeLength > w/square && goLong) {
                                                if(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].f >= current.f) {
                                                    openSet.push(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]]);
                                                }
                                            } else {
                                                if(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].f <= current.f) {
                                                    openSet.push(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]]);
                                            
                                                }
                                            }
                                    } else {
                                            openSet.push(map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]]);
                                        
                                        
                                    }
                                }                
                            }

                            current.f = current.g + current.h;
                            map[current.x/square + neigbours[i][0]][current.y/square + neigbours[i][1]].previous = current;   
                        } 
                    }
                }
            }
        }
     //   end = foodend;
    }

    function heuristic(a,b) {
            let d = p.dist(a.x,a.y,b.x,b.y);
            return d;
    }

    function removeFromArray(array, item) {
        if(array.length <= 0) {
            console.log('%c Error, there is nothing to remove from the array! ', 'background: #222; color: #bada55')
        }
            for(let i = array.length-1; i>=0; i--) {
                if(array[i].x == item.x && array[i].y == item.y) {
                    array.splice(i,1);
                }
            }
        
    }
    function endGame() {
        for(var i = 0; i!=w; i = i+square) {
            for(var ii = 0; ii!=h; ii = ii+square) {
                    var temp1 = i/square;
                    var temp2 = ii/square;

                    if(map[temp1][temp2].body  == true) {
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
    previousDirection = "";
     p.keyPressed = function() {
        // ? For manual movement via keys
        //     if(!gamePlaying) {
        //         p.setup();  
        //         gamePlaying = true; 
        //     } else {
        //     previousDirection = direction;

        //     if(p.keyCode === p.UP_ARROW) {
        //         if(previousDirection != "down") {
        //             direction = "up";
        //         }
        //     }
        //     if(p.keyCode === p.LEFT_ARROW) {
        //         if(previousDirection != "right") {
        //             direction = "left";
        //         }
        //     }
        //     if(p.keyCode === p.RIGHT_ARROW) {
        //         if(previousDirection != "left") {
        //             direction = "right";
        //         }
        //     }
        //     if(p.keyCode === p.DOWN_ARROW) {
        //         if(previousDirection != "up") {
        //             direction = "down";
        //         }
        //     }
        // }
    }

    function addToSnake(width,height) {
        p.fill(player);
        p.square(width*square,height*square, square);
        snake.push([width, height]);
       openSet.push(map[width][height]);
    }

    function makeHead(width,height) {
        p.fill(head);
        p.square(width*square,height*square, square);
        map[width][height].body = true;
        currentHead[0] = width;
        currentHead[1] = height;
    }

    function testColour(width,height) {    
        p.fill(randomColour());
        p.square(width*square,height*square, square);
    }

    function randomColour() {
        return [Math.floor(Math.random(255) * 100), Math.floor(Math.random(255) * 100), Math.floor(Math.random(255) * 100)];
    }


    function removeTail() {
        p.fill(background);
        var tail = snake.shift();
        map[tail[0]][tail[1]].body = false;
        p.square(tail[0]*square,tail[1]*square, square);
    }

    function createFood() {
        p.fill(food);
        const wRandom = Math.floor(Math.random() * w/square) * square;
        const hRandom = Math.floor(Math.random() * h/square) * square;
        if(map[wRandom/square][hRandom/square].body) {
            createFood();
        } else {
            map[wRandom/square][hRandom/square].food = true;
            // ? variable which can be not food if the snake can't get to the food
            end = map[wRandom/square][hRandom/square];
            // ? Variable which is always a pointer to food
            foodend = map[wRandom/square][hRandom/square]; 
            openSet = [];
            p.square(wRandom, hRandom, square);
        }
    }
}

//UI functions 

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

function generateThought(key) {
    let thought = 'Hello! :)'

    switch(key) {
        case 'found': thought = 'Found it! :D';
        break;
        case 'broke': thought = "I can't see it :(";
        break;
        case 'error': thought = " (error) I did say I was buggy :'(";
        break;
        case 'see': thought = "I see it! :o";
        break;
    }

    document.getElementById('snakeThoughts').innerHTML = thought;
}

$(document).ready(function() {
    new p5(sketch, 'container');
});