// GLOBALS
let gameBoard = "000000000"; //The Board is Col-Row
let currentPlayer = 1;
let winner = null;

// UI FUNCTIONS
function playO() {
  gameBoard = "000000000";
  currentPlayer = 1;
  winner = null;
  updateViewToGameBoard();
  makeAIMove();
}

function playX() {
  gameBoard = "000000000";
  currentPlayer = 1;
  winner = null;
  updateViewToGameBoard();
  document.getElementById("thinking").innerHTML = "Your Move";
}

function updateView(board, player) {
  for (let i=0;i<board.length;i++) {
    document.getElementById("id"+i).innerHTML = (board[i]==0?"":(board[i]==1?"X":"O"));
  }
  document.getElementById("nextTurn").innerHTML = "Next Player: "+ (player==1?"X":"O");
}

function updateViewToGameBoard() {
  updateView(gameBoard, currentPlayer);

  winner = checkForWin(gameBoard);
  if (winner) {
    document.getElementById("nextTurn").innerHTML = winner==1?"Winner: X":(winner == 2? "Winner: O": "Tie Game!");
    document.getElementById("thinking").innerHTML = "Game Over";
    return true;
  }
}

async function makeAIMove() {
  document.getElementById("thinking").innerHTML = "The AI is thinking...";
  setTimeout(async function() {
    let action = await getActionByMinimax(currentPlayer, gameBoard);
    document.getElementById("thinking").innerHTML = "Your Move";
    gameBoard = placeInSquare(gameBoard, action, currentPlayer);
    currentPlayer = currentPlayer % 2 + 1;
    updateViewToGameBoard();
  }, 200);
}

async function squareClicked(square) {
  if (squareFull(gameBoard, square) || winner) {return;}
  gameBoard = placeInSquare(gameBoard, square, currentPlayer);
  currentPlayer = currentPlayer % 2 + 1;
  updateViewToGameBoard();
  
  // AI's Turn if game not over
  if (winner == null) {
    makeAIMove();
  }
}

// GAME FUNCTIONS
function placeInSquare(board, square, player) {
  return board.substr(0, square) + (player==0?"0":(player==1?"1":"2")) + board.substr(square+1);
}

function boardFull(board) {
  for (let i=0;i<board.length;i++) {
    if (board[i] == "0") {
      return false;
    }
  }
  return true;
}

function squareFull(board, square) {
  if (board[square] == "0") {
    return false;
  }
  return true;
}

function checkForWin(board) {
  // 8 lines
  if (board[0] != "0" && board[0] == board[1] && board[0] == board[2]) { return board[0] };
  if (board[3] != "0" && board[3] == board[4] && board[3] == board[5]) { return board[3] };
  if (board[6] != "0" && board[6] == board[7] && board[6] == board[8]) { return board[6] };
  if (board[0] != "0" && board[0] == board[3] && board[0] == board[6]) { return board[0] };
  if (board[1] != "0" && board[1] == board[4] && board[1] == board[7]) { return board[1] };
  if (board[2] != "0" && board[2] == board[5] && board[2] == board[8]) { return board[2] };
  if (board[0] != "0" && board[0] == board[4] && board[0] == board[8]) { return board[0] };
  if (board[6] != "0" && board[6] == board[4] && board[6] == board[2]) { return board[6] };

  if (boardFull(board)) {
    return 3;
  }

  return null;
}

//SYSTEM FUNCTIONS
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandInt(min, max) {
    let realMax = max+1;
    let random = (Math.floor(Math.random() * (realMax-min)) + min);
    return random;
}