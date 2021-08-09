 const X_CLASS = "x"
 const O_CLASS = 'o'
const winnerCombinations = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [2,5,8],
    [1,4,7],
    [6,7,8],
    [2,4,6]
]

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const winningMessage = document.getElementById("winningMessage");
const winningText = document.querySelector('[data-winningText]')
let oTurn;
startGame();

function startGame() {
    oTurn= false;
    cells.forEach(cell => {
        cell.addEventListener('click',handleClick, {once: true})        
    })
setBoardHoverClass();
}

cells.forEach(cell => {
    cell.addEventListener('click',handleClick, {once: true})
})

function handleClick(e) {
    const cell = e.target
     const currentClass = oTurn ? O_CLASS : X_CLASS  
     placeMark(cell,currentClass);
    console.log('clicked');
    if (checkForWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    }
    else {
    swapTurns();
     setBoardHoverClass();
    }
}
   
function isDraw () {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(O_CLASS)
    })

}

    function endGame(draw) {
        if(draw){
            winningText.innerText = "D R A W"
        }
        else { 
   winningText.innerText = (oTurn ? "O wins" : "X Wins")
    }
    winningMessage.classList.add('show');
    
        }
    
    
function placeMark(cell,currentClass) {
  cell.classList.add(currentClass);
}

 
 function swapTurns () {
     oTurn  = !oTurn
 } 

 function setBoardHoverClass () {
     board.classList.remove(X_CLASS)
     board.classList.remove(O_CLASS)
     if (oTurn) {
         board.classList.add(O_CLASS)
     }
 else {
     board.classList.add(X_CLASS)
 }
 } 

 function checkForWin(currentClass) {
  return winnerCombinations.some(combination => {
      return combination.every(index => {
          return cells[index].classList.contains(currentClass)
      })
  })
 }
