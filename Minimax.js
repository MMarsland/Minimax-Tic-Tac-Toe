// MINIMAX FUNCTIONS
async function getActionByMinimax(player, state) {
  callCount = 0;
  let results = [];
  let result;
  for (let square=0; square<9; square++) {
    if (squareFull(gameBoard, square)) { results.push(-100); continue; };
    result = await minimax(player, placeInSquare(gameBoard, square, player), 8, -Infinity, Infinity, false);
    results.push(result);
  }
  //console.log(results);
  let action = getRandomMax(results);
  return action;
}

function getScoreForPosition(board, winner, player, depthRemaining) {
  if (!winner) {
    winner = checkForWin(board);
  }

  if ((winner == 1 && player == 1) || (winner == 2 && player == 2)) {
    //console.log("win!")
    return 10 * depthRemaining/10;
  } else if ((winner == 1 && player == 2) || (winner == 2 && player == 1)) {
    //console.log("Loss")
    return -10 * 1/(depthRemaining+1);
  } else if (winner == 3) {
    //console.log("tie");
    return 1 * depthRemaining/10 ;
  } else {
    //console.log("other");
    return -1;
  }
}

async function minimax(player, position, depth, alpha, beta, maximizingPlayer) {
  callCount++;
  //console.log(`${callCount}: Minimax on Position: ${position}, with depth: ${depth}, alpha: ${alpha}, beta: ${beta}, maximizingPlayer: ${maximizingPlayer}, and player: ${player}`);
  let minEval, eval, maxEval;
  let winner = checkForWin(position);
  if (depth == 0 || winner != null) {
    //console.log("Depth clock out for player "+ player +" with winner == "+ winner);
    return getScoreForPosition(position, winner, player, depth);
  }

  if (maximizingPlayer) {
    maxEval = -Infinity;
    for (let square=0; square<9; square++) {
      if (squareFull(position, square)) {
        continue;
      } else {
        temp = await minimax(player, placeInSquare(position, square, player), depth - 1, alpha, beta, false);
        eval = temp;
      }
      maxEval = Math.max(maxEval, eval);
      alpha = Math.max(alpha, eval);
      if (beta <= alpha) {
        //break;
      }
    }
    return maxEval;
  } else {
    minEval = Infinity;
    for (let square=0; square<9; square++) {
      if (squareFull(position, square)) {
        continue;
      } else {
        temp = await minimax(player, placeInSquare(position, square, player%2+1), depth - 1, alpha, beta, true);
        eval = temp;
      }
      minEval = Math.min(minEval, eval);
      beta = Math.min(beta, eval);
      if (beta <= alpha) {
        //break;
      }
    }
    return minEval;
  }
}

function getRandomMax(results) {
  let max = Math.max(...results);
  let maximaMoves = [];
  for (let i=0; i<results.length;i++) {
    if (results[i] == max) {
      maximaMoves.push(i);
    }
  }
  return maximaMoves[getRandInt(0, maximaMoves.length-1)];
}

let callCount = 0;
    // initial call
async function testMinimax() {
  callCount = 0;
  console.log("Starting");
  let results = [];
  let result;
  for (let square=0; square<9; square++) {
    if (squareFull(gameBoard, square)) { results.push(-100); continue; };
    result = await minimax(currentPlayer, placeInSquare(gameBoard, square, currentPlayer), 100, -Infinity, Infinity, false);
    results.push(result);
  }
  console.log(results);
  let action = getRandomMax(results);
  console.log("The best move is square: "+ action);
}
// END
