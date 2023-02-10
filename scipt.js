"usr strict";

const win = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

let counter = 0,
    playerX = [],
    playerO = [],
    xScore = 0,
    oScore = 0,
    drowScore = 0;
    

const infoElem = document.querySelector('.info__text'),
      playerElem = document.querySelector('.player'),
      xScoreElem = document.querySelector('.playerX__score'),
      oScoreElem = document.querySelector('.playerO__score'),
      drowScoreElem = document.querySelector('.drow__score'),
      cellElem = document.querySelectorAll('.cell');

infoElem.addEventListener('click', e => {
  e.target.parentElement.style = 'display: none';
  playerElem.innerHTML = 'Ходит игрок X';
  counter = 1;
});

cellElem.forEach(cell => {
  cell.addEventListener('click', e => {
    if (!cellElem[e.target.id].classList.contains('occupied')) {
      if (counter % 2 !== 0) {
        playerX.push(+e.target.id);
        cellElem[e.target.id].innerHTML = `<img style="width: 80%; margin: 10%" src="./img/X.png">`;
        cellElem[e.target.id].classList.add('occupied');
        playerElem.innerHTML = 'Ходит игрок O';
        checkWin(playerX, win);
      } else {
        playerO.push(+e.target.id);
        cellElem[e.target.id].innerHTML = `<img style="width: 80%; margin: 10%" src="./img/O.png">`;
        cellElem[e.target.id].classList.add('occupied');
        playerElem.innerHTML = 'Ходит игрок X';
        checkWin(playerO, win);
      }
      counter++; 
    }
  });
});

function checkWin(arr, win) {
  let victory = false;
    for (let i = 0; i < win.length; i++) {
      if (win[i].every(el => arr.includes(el))) {
        victory =  true;
        }
      }
    if (victory) {
      stopGame();
    } else {
      if (counter === 9) {
        drow();
      }
    }
  
}

function stopGame() {
  
    if (counter%2 !== 0) {
      playerElem.innerHTML = 'Победил игрок X!';
      xScore++;
      xScoreElem.innerHTML = `${xScore}`;
      newGame();
    } else {
      playerElem.innerHTML = 'Победил игрок O!';
      oScore++;
      oScoreElem.innerHTML = `${oScore}`;
      newGame();
    }
}

function drow() {
  if (counter === 9) {
    playerElem.innerHTML = 'Ничья!';
    drowScore++;
    drowScoreElem.innerHTML = `${drowScore}`;
    newGame();
  }
}

function newGame() {setTimeout(() => {
  infoElem.parentElement.style = 'display: flex';
  cellElem.forEach(elem => {
    elem.innerHTML = '';
    elem.classList.remove('occupied');
  });
  playerX = [];
  playerO = [];
  }, 0);
}