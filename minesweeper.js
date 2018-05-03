document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

var board = {
  cells: []
}
var size = 6;

  function gameBoard() {
    for (var x = 0; x < size; x++){
      for (var y = 0; y < size; y++){
        board.cells.push({
          row: x,
          col: y,
          isMine: Math.floor(Math.random() * 1.4),
          isMarked: false,
          hidden: true
        })
      }
    }
  }

/*{row: 2,
 col: 2,
 isMine: false,
 isMarked: false,
 hidden: true,
 surroundingMines: 1},*/

function startGame () {
  gameBoard();
  for (var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)

  }

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine){
      if (board.cells[i].isMarked == false){
    return; //trying to check if it is a mine and it is marked.
      }
    }
    else if (board.cells[i].hidden){
    return;
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('Your a winner!');

}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0;
  for (i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine == true) {
    count++
    }
  }
  return count
}


function restartGame(){
  board = {cells: []} /* creating board.cells */
  document.getElementsByClassName('board')[0].innerHTML = ''; /* board in HTML */
  startGame() /* filling the board again */
}
