const board = document.querySelector('.board');
const minefield = document.querySelector('.minefield');
const timer  = document.querySelector('.timer');
const mineCounter = document.querySelector('.noOfMines');
const option_small = document.querySelector('.small');
const option_medium = document.querySelector('.medium');
const option_large = document.querySelector('.large');
const smiley_box = document.querySelector('.smiley-box');
const smiley = document.querySelector('.smiley-icon');

let option;
let seconds = 0;
let noOfMines = 0;
let minesCleared = 0;
let n = 8;
let array_1D = [];
let array_2D = [];
let timer_paused = false

// SET MINES AND BOARD SIZE DEPENDING ON INPUT
const sizeBoard = (size) => {
    switch(size){
        case 'small':
            n = 8;
            array_1D.length = (n*n);
            setMines(n);
            break;
        case 'medium': 
            n = 16;
            array_1D.length = (n*n);
            setMines(n);
            break;
        case 'large': 
            n = 24;
            setMines(n);
            array_1D.length = (n*n);
            break;
        default:
            n = 8;
            array_1D.length = (n*n);
            setMines(n);
            break;
    }
} 

// DISPLAYING TIME
let setTime = setInterval(() => {
    if(!timer_paused){
        ++seconds;
        timer.innerText = seconds;
    }
}, 1000);

// SET NUMBER OF MINES AND DISPLAY AMOUNT
function setMines(n){
    noOfMines = Math.floor((n**2)*0.16);
    mineCounter.innerText = noOfMines;
    return noOfMines;
}

// CREATE 1D ARRAY WITH MINES AS 1
const populateArray = (n) => {
    let x = setMines(n);
    array_1D.fill(0)
    for(let i = 0; i < x; i++){
        array_1D[i] = 1
    }
}

// SHUFFLE 1D ARRAY WITH FISHER-YATES SHUFFLE
const shuffleArray = (array_1D) => {
    let currentIndex = array_1D.length,  randomIndex;

    while(currentIndex > 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array_1D[currentIndex], array_1D[randomIndex]] = 
        [array_1D[randomIndex], array_1D[currentIndex]];
    }
    return array_1D
}

// TURN 1D ARRAY TO 2D ARRAY FOR ACCURATE COORDINATES
const arrayTo2D = (array_1D, n) => {
    while(array_1D.length) array_2D.push(array_1D.splice(0,n))
}

// CHECK FOR MINES 
const checkMine = (cell) => {
    const data = cell.getAttribute('data-mine');
    if(data == 1){
        smiley.src  = './img/game-over-smiley.png'
        gameOver();
        return false;
    } else {
        minesCleared++;
        return true;
    }
}

const checkWin = () => {
    const totalMines = Math.floor((n**2)*0.16) - 1;
    if(minesCleared === ((n * n) - totalMines)){
        setTimeout(() => {
            alert('You Win!')
        }, 100);
        reset();
        startGame();
    }
}

// HIDE PSEUDO ELEMENT ON CLICK + MINE CHECK
function setMineCell() {
    const cell = document.createElement('div');
    cell.className = 'cell'
    cell.setAttribute('data-mine', 1);
    cell.style.backgroundColor = 'red'
    cell.style.backgroundImage = 'url(../img/Minesweeper_1992.webp)'
    cellClick(cell);
    minefield.appendChild(cell);
    return cell
}

function setCell(){
    const cell = document.createElement('div');
    cell.className = 'cell'
    cell.setAttribute('data-mine', 0)
    cellClick(cell);
    minefield.appendChild(cell);
    return cell
}

function countNearbyMines(cell,x,y) {
    let nearbyMines = 0;
    x = Number(x);
    y = Number(y);
    
    for(dx = -1; dx <= 1; dx++){ //adjacent x-axis cells including own cell
        for(dy = -1; dy <= 1; dy++){ //adjacent y-axis cells including own cell
            if((dx != 0 || dy != 0) //do not count current cell
            && ((x + dx) >= 0 && (y + dy) >= 0 && (x + dx) < n && (y + dy) < n) //adjecent cell must exist on  the grid
            && (array_2D[x + dx][y + dy] == 1)){ //Adjacent cell contains mine
                nearbyMines++
            }
        }
    }

    if(array_2D[x][y] != 1 && nearbyMines != 0){ //Only print numbers on non-bomb cells and cells that has adjacent mines
        cell.innerText = nearbyMines;
        colorNumbers(cell, nearbyMines)
    }
}


function colorNumbers(cell, cellNumber){
    switch(cellNumber){
        case 1:
            cell.style.color = 'blue';
            break;
        case 2:
            cell.style.color = 'green'
            break;
        case 3: 
            cell.style.color = 'red'
            break;
        case 4:
            cell.style.color = 'darkblue'
            break;
        case 5: 
            cell.style.color = 'darkred'
            break;
        case 6:
            cell.style.color = 'teal'
            break;
        case 7:
            cell.style.color = 'purple'
            break;
        case 8: 
            cell.style.color = 'black'
            break
    }
}
                    
// CREATE THE HTML GRID BY CHANGING '--GRID-LEN' CSS-VARIABLE
const createHTMLGrid = (array_2D) => {
    minefield.style.setProperty('--grid-len', n);
    for(x in array_2D){
        for(y in array_2D[x]){
            const cell = array_2D[x][y] ? setMineCell() : setCell();
            countNearbyMines(cell,x,y)
        }
    }
}

function reset() {
    smiley.src = './img/smiley.png'
    seconds = 0;
    timer.innerText = '0'
    clearInterval(timer);
    array_1D = [];
    array_2D = [];
    minesCleared = 1;
    minefield.innerHTML = ''
    timer_paused = false;
    document.addEventListener('mouseup', originalSmiley);
}

function startGame(){
    reset();
    sizeBoard(option);
    populateArray(n);
    shuffleArray(array_1D);
    arrayTo2D(array_1D, n);
    createHTMLGrid(array_2D);
}
startGame();

function gameOver() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.add('inactive');
        if(cell.getAttribute('data-mine') == 1){
            cell.style.setProperty('--display-after', 'none')
        }
    })
    timer_paused = true;
    document.removeEventListener('mouseup', originalSmiley);
}

function toggleFlag(cell) {
    if(cell.getAttribute('flag') == 1){
        cell.style.setProperty('--flag', "url('')");
        cell.setAttribute('flag', 0);
        cell.addEventListener('click', openCell);
        noOfMines++
        mineCounter.innerText = noOfMines;

    }else if(cell.getAttribute('flag') == 1 || noOfMines != 0){ //Only allowed to place flags if any left and doesn't already have flag
        cell.style.setProperty('--flag', "url('/img/flag.png')");
        cell.setAttribute('flag', 1);
        cell.removeEventListener('click', openCell);
        noOfMines--
        mineCounter.innerText = noOfMines;
    }
}

function openCell(e) {
    cell = e.target;
    cell.style.setProperty('--display-after', 'none');
    cell.removeEventListener('click', openCell)
    cell.removeEventListener('mousedown', checkRightClick)
    console.log(minesCleared)
    if(checkMine(cell)){
        checkWin();
    };
}

function checkRightClick(e) {
    const cell = e.target;
    if(e.button === 0){
        smiley.src = './img/oops-smiley.png'
    } else if (e.button === 2){
        toggleFlag(cell);
    }
}

function cellClick(cell) {
    cell.addEventListener('click', openCell)
    cell.addEventListener('mousedown', checkRightClick)
}

document.addEventListener('contextmenu', event => event.preventDefault()); //prevent rightclick from opening menu
document.addEventListener('mouseup', originalSmiley)
function originalSmiley() {
    smiley.src = './img/smiley.png'
}

option_small.addEventListener('click', () => {
    option = 'small';
    startGame();
})
option_medium.addEventListener('click', () => {
    option = 'medium';
    startGame();
})
option_large.addEventListener('click', () => {
    option = 'large';
    startGame();
})
smiley_box.addEventListener('click', () => {
    startGame();
})