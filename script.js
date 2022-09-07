const playerTurn = document.querySelector('.player')
const cell = document.querySelectorAll('td')
const restart = document.querySelector('.restart')

const conditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

let playerSwitch = false
let playerX = []
let playerY = []
let resultPattern = []


for (let i = 0;i < 9; i++) {
    cell[i].addEventListener("click", clickHandler)
}
restart.addEventListener("click", restartHandler)


function restartHandler () {
    for (let i = 0;i < 9; i++) {
        cell[i].innerText = ""
        cell[i].addEventListener("click", clickHandler)
    }
    playerTurn.innerText = `Player X turn`
    restart.innerText = "restart"
    playerSwitch = false
    playerX = []
    playerY = []
    resultPattern = []
    for (let i = 0; i < cell.length; i++) {
        cell[i].className = ""
    }
}


playerTurn.innerText = `Player ${playerSwitch ? "O" : "X"} turn`

function clickHandler (event) {
    event.target.removeEventListener("click", clickHandler)
    playerTurn.innerText = `Player ${playerSwitch ? "X" : "O"} turn`
    playerSwitch = !playerSwitch
    event.target.innerHTML = playerSwitch ? "X" : "O"
    playerSwitch && playerX.push(Number(event.target.id))
    !playerSwitch && playerY.push(Number(event.target.id))

    if (playerX.length >= 3) {
        if (winCondition(playerX)) {
            for (let i = 0;i < 9; i++) {
                cell[i].removeEventListener("click", clickHandler)
            }
            playerTurn.innerText = `Player X won`
            restart.innerText = "next game"
        } else if (winCondition(playerY)) {
            for (let i = 0;i < 9; i++) {
                cell[i].removeEventListener("click", clickHandler)
            }
            playerTurn.innerText = `Player O won`
            restart.innerText = "next game"
        } else if (playerX.length == 5) {
            playerTurn.innerText = `Draw`
            restart.innerText = "next game"
        }
    }

    for (let i = 0; i < resultPattern.length; i++) {
        cell[resultPattern[i]-1].className = "result"
    }
}



function winCondition(player) {
    let finalResult = []
    for (let i = 0; i < conditions.length; i++) {
        let result = []
        for (let j = 0; j < player.length; j++) {
            conditions[i].includes(player[j]) && result.push(true)
        } 
        result.filter(x => x==true).length >= 3 ? finalResult.push(true) : finalResult.push(false)
    }
    for (let i = 0; i < finalResult.length; i++) {
        if (finalResult[i]) {
            resultPattern = conditions[i]
        }
    }
    return finalResult.filter(x => x==true).length > 0 && true
}

