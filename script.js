
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 30;
const FPS = 32;
const boardHeight = 26;
const boardWidth = 16;
var gameRunning = false;
var tempoDeQueda = 28;

//var audio = new Audio('fallPieceAudio.WAV');
//audio.play();

const visor = document.getElementById("visor");
var pontos = 0;

class tetromino {
    constructor(shape) {
        this.shape = shape;
    }
    changePos(x, y) {
        for(var i = 0; i<this.shape.length; i++) {
            var tile = this.shape[i];
            tile[0] = x + tile[0];
            tile[1] = y + tile[1];
        }
    }
    checkReachVert(y, val) {
        for(var i = 0; i<this.shape.length; i++) {
            var tile = this.shape[i];
            if(tile[1] + y == val) {
                return true
            }
        }
        return false
    }
    checkReachHorz(x, val) {
        for(var i = 0; i<this.shape.length; i++) {
            var tile = this.shape[i];
            if(tile[0] + x == val) {
                return true
            }
        }
        return false
    }
    checkTile(x, y) {
        for(var i = 0; i<this.shape.length; i++) {
            var tile = this.shape[i];
            for(var yy = 0; yy<rows.length; yy++) {
                for(var xx = 0; xx<rows[yy].length; xx++) {
                    if(rows[yy][xx]) {
                        if(tile[0] + x == xx && tile[1] + y == yy) {
                            return true;
                        }
                    }
                }
            }
        }
        return false
    }
    minTile(val) {
        for(var i = 0; i<this.shape.length; i++) {
            return Math.min(this.shape[i][val]);
        }
    }
    draw() {
        for(var i = 0; i<this.shape.length; i++) {
            var tile = this.shape[i];
            ctx.fillStyle = tile[2];
            ctx.fillRect(tile[0] * gridSize, tile[1] * gridSize, gridSize, gridSize);
        }
    }
}

const Opiece = [[[0, 0, '#F20707'], [1, 0, '#F20707'], [0, 1, '#F20707'], [1, 1, '#F20707']], [[0, 0, '#F20707'], [1, 0, '#F20707'], [0, 1, '#F20707'], [1, 1, '#F20707']], [[0, 0, '#F20707'], [1, 0, '#F20707'], [0, 1, '#F20707'], [1, 1, '#F20707']], [[0, 0, '#F20707'], [1, 0, '#F20707'], [0, 1, '#F20707'], [1, 1, '#F20707']]];
const Ipiece = [[[0, 0, '#E67A3E'], [1, 0, '#E67A3E'], [2, 0, '#E67A3E'], [3, 0, '#E67A3E']], [[0, 0, '#E67A3E'], [0, 1, '#E67A3E'], [0, 2, '#E67A3E'], [0, 3, '#E67A3E']], [[0, 0, '#E67A3E'], [1, 0, '#E67A3E'], [2, 0, '#E67A3E'], [3, 0, '#E67A3E']], [[0, 0, '#E67A3E'], [0, 1, '#E67A3E'], [0, 2, '#E67A3E'], [0, 3, '#E67A3E']]];
const Tpiece = [[[0, 0, '#5551E6'], [1, 0, '#5551E6'], [2, 0, '#5551E6'], [1, 1, '#5551E6']], [[1, 0, '#5551E6'], [0, 1, '#5551E6'], [1, 1, '#5551E6'], [1, 2, '#5551E6']], [[1, 0, '#5551E6'], [0, 1, '#5551E6'], [1, 1, '#5551E6'], [2, 1, '#5551E6']], [[0, 0, '#5551E6'], [0, 1, '#5551E6'], [1, 1, '#5551E6'], [0, 2, '#5551E6']]];
const Jpiece = [[[0, 0, '#39E610'], [1, 0, '#39E610'], [2, 0, '#39E610'], [2, 1, '#39E610']], [[1, 0, '#39E610'], [1, 1, '#39E610'], [0, 2, '#39E610'], [1, 2, '#39E610']], [[0, 0, '#39E610'], [0, 1, '#39E610'], [1, 1, '#39E610'], [2, 1, '#39E610']], [[0, 0, '#39E610'], [1, 0, '#39E610'], [0, 1, '#39E610'], [0, 2, '#39E610']]];
const Lpiece = [[[0, 0, '#2C9912'], [1, 0, '#2C9912'], [2, 0, '#2C9912'], [0, 1, '#2C9912']], [[0, 0, '#2C9912'], [1, 0, '#2C9912'], [1, 1, '#2C9912'], [1, 2, '#2C9912']], [[2, 0, '#2C9912'], [0, 1, '#2C9912'], [1, 1, '#2C9912'], [2, 1, '#2C9912']], [[0, 0, '#2C9912'], [0, 1, '#2C9912'], [0, 2, '#2C9912'], [1, 2, '#2C9912']]];
const Spiece = [[[1, 0, '#4D3FA6'], [2, 0, '#4D3FA6'], [0, 1, '#4D3FA6'], [1, 1, '#4D3FA6']], [[0, 0, '#4D3FA6'], [0, 1, '#4D3FA6'], [1, 1, '#4D3FA6'], [1, 2, '#4D3FA6']], [[1, 0, '#4D3FA6'], [2, 0, '#4D3FA6'], [0, 1, '#4D3FA6'], [1, 1, '#4D3FA6']], [[0, 0, '#4D3FA6'], [0, 1, '#4D3FA6'], [1, 1, '#4D3FA6'], [1, 2, '#4D3FA6']]];
const Zpiece = [[[0, 0, '#D91136'], [1, 0, '#D91136'], [1, 1, '#D91136'], [2, 1, '#D91136']], [[1, 0, '#D91136'], [0, 1, '#D91136'], [1, 1, '#D91136'], [0, 2, '#D91136']], [[0, 0, '#D91136'], [1, 0, '#D91136'], [1, 1, '#D91136'], [2, 1, '#D91136']], [[1, 0, '#D91136'], [0, 1, '#D91136'], [1, 1, '#D91136'], [0, 2, '#D91136']]];

const allPieces = [Opiece, Ipiece, Tpiece, Jpiece, Lpiece, Spiece, Zpiece];
//eu sei que essa váriavel parece idiota, e é mesmo. Porém tem que ser dessa maneira porque isso não funcionaria da maneira que precisase funcionar
var rows = [Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth),Array(boardWidth)];
var fall = 0;

var canMoveLeft = true;
var canMoveRight = true;
var canRotate = true;

var downPress = false;
var upPress = false;

var tick = 0;
var rotation = 0;
var pieceIndex = Math.floor(Math.random() * allPieces.length)
var currentPiece = new tetromino(structuredClone(allPieces[pieceIndex][rotation]));

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
function drawGame() {
    currentPiece.draw();
    for(var y = 0; y<rows.length; y++) {
        for(var x = 0; x<rows[y].length; x++) {
            if(rows[y][x]) {
                ctx.fillStyle = rows[y][x];
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            }
        }
    }
}

function main() {
    //Init / less important stuff:
    if(document.pointerLockElement === canvas) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    } else {
        document.getElementsByTagName('body')[0].style.overflow = 'visible';
    }
    tick++;
    clearCanvas();

    //Game code:

    //update game speed
    if(downPress) {
        tempoDeQueda = 3;
    } else if(upPress) {
        tempoDeQueda = 32;
    } else {
        tempoDeQueda = 20;
    }

    //stop piece & pull it down
    if(tick % tempoDeQueda == 0) {
        if(!currentPiece.checkTile(0, 1) && !currentPiece.checkReachVert(1, boardHeight)) {
            currentPiece.changePos(0, 1);
        } else {
            for(var i = 0; i<currentPiece.shape.length; i++) {
                var tile = currentPiece.shape[i];
                rows[tile[1]][tile[0]] = tile[2];
            }
            for(var y = 0; y<rows.length; y++) {
                var row = rows[boardHeight - y - 1];
                var arr = [];
                for(var x = 0; x<row.length; x++) {
                    if(row[x]) {
                        arr.push(1);
                    }
                }
                if(arr.length == row.length) {
                    row.fill(undefined);
                    pontos += 100;
                    visor.innerHTML = "Pontos: " + pontos;
                    fall += 1;
                    continue;
                }
                if(fall != 0) {
                    rows[boardHeight - y - 1 + fall] = row;
                }
            }
            fall = 0;
            /*audio.playbackRate = Math.random() + 0.5;
            audio.play();*/
            pieceIndex = Math.floor(Math.random() * allPieces.length);
            currentPiece = new tetromino(structuredClone(allPieces[pieceIndex][rotation]));
        }
    }

    //check if can move/collision
    if(currentPiece.checkReachHorz(1, boardWidth) || currentPiece.checkTile(1, 0)) {
        canMoveRight = false;
        canRotate = false;
    } else {canMoveRight = true;}
    if(currentPiece.checkReachHorz(-1, -1) || currentPiece.checkTile(-1, 0)) {
        canMoveLeft = false;
        canRotate = false;
    } else {canMoveLeft = true;}
    if(!currentPiece.checkReachHorz(1, boardWidth) || currentPiece.checkTile(1, 0) && !currentPiece.checkReachHorz(-1, -1) || currentPiece.checkTile(-1, 0)) {
        canRotate = true;
    }
    //Draw:
    drawGame()
}

addEventListener("keydown", keyPressed);
function keyPressed(evt) {
    switch(evt.keyCode) {
        case 38: //up
            upPress = true;
            break;
        case 40: //down
            downPress = true;
            break;
        case 65: //A
            if(canMoveLeft) {
                currentPiece.changePos(-1, 0);
            }
            break;
        case 68: //D
            if(canMoveRight) {
                currentPiece.changePos(1, 0);
            }
            break
        case 87: //W
            if(canRotate) {
                rotation += 1;
                //rotate
                if(rotation > 3) {rotation = 0} else if(rotation < 0) {rotation = 3}
                var newX = currentPiece.minTile(0);
                var newY = currentPiece.minTile(1);

                currentPiece = new tetromino(structuredClone(allPieces[pieceIndex][rotation]))
                currentPiece.changePos(newX, newY);
            }
            break;
        case 83: //S
            if(canRotate) {
                rotation -= 1;
                //rotate
                if(rotation > 3) {rotation = 0} else if(rotation < 0) {rotation = 3}
                var newX = currentPiece.minTile(0);
                var newY = currentPiece.minTile(1);

                currentPiece = new tetromino(structuredClone(allPieces[pieceIndex][rotation]))
                currentPiece.changePos(newX, newY);
            }
            break;
    }
}
addEventListener("keyup", keyUp);
function keyUp(evt) {
    switch(evt.keyCode) {
        case 38:
            upPress = false;
            break;
        case 40:
            downPress = false;
            break;
    }
}

canvas.onclick = function() {
    canvas.requestPointerLock();
    setInterval(main, 1000/FPS)
}