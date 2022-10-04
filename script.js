const playerTurn = document.querySelector('.player')
const cell = document.querySelectorAll('td')
const restart = document.querySelector('.restart')
const playerXPoindsCell = document.querySelectorAll('.left')
const playerYPoindsCell = document.querySelectorAll('.right')

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
let playerXPoints = 0
let playerYPoints = 3


for (let i = 0;i < 9; i++) {
    cell[i].addEventListener("click", clickHandler)
}
restart.addEventListener("click", restartHandler)


function restartHandler () {
    for (let i = 0;i < 9; i++) {
        cell[i].innerText = ""
        cell[i].addEventListener("click", clickHandler)
        cell[i].className = ""
    }

    if(playerXPoints == 4 || playerYPoints == -1) {
        for(let i = 0; i < playerXPoindsCell.length; i++) {
            playerXPoindsCell[i].classList.remove('point')
            playerYPoindsCell[i].classList.remove('point')
        }
        playerXPoints = 0
        playerYPoints = 3
    }

    playerTurn.innerText = `Player X turn`
    restart.innerText = "reset"
    playerSwitch = false
    playerX = []
    playerY = []
    resultPattern = []
}


playerTurn.innerText = `Player x turn`

function clickHandler (event) {
    event.target.removeEventListener("click", clickHandler)
    playerTurn.innerText = `Player ${playerSwitch ? "X" : "O"} turn`
    playerSwitch = !playerSwitch
    event.target.innerText = playerSwitch ? "X" : "O"
    playerSwitch && playerX.push(Number(event.target.id))
    !playerSwitch && playerY.push(Number(event.target.id))

    if (playerX.length >= 3) {
        if (winCondition(playerX)) {
            for (let i = 0;i < 9; i++) {
                cell[i].removeEventListener("click", clickHandler)
            }
            playerXPoints ++
            for (let i = 0; i < playerXPoints; i++) {
                playerXPoindsCell[i].classList.add('point')
            }
            playerTurn.innerText = `Player X won`
            if(playerXPoints == 4 || playerYPoints == -1) {
                restart.innerText = "new game"
            } else {
                restart.innerText = "next game"
            }
        } else if (winCondition(playerY)) {
            for (let i = 0;i < 9; i++) {
                cell[i].removeEventListener("click", clickHandler)
            }
            playerYPoints --
            for (let i = 3; i > playerYPoints; i--) {
                playerYPoindsCell[i].classList.add('point')
            }
            playerTurn.innerText = `Player O won`
            if(playerXPoints == 4 || playerYPoints == -1) {
                restart.innerText = "new game"
            } else {
                restart.innerText = "next game"
            }
        } else if (playerX.length == 5) {
            playerTurn.innerText = `Draw`
            restart.innerText = "next game"
        }
    }

    for (let i = 0; i < 3; i++) {
        if(resultPattern.length > 2)  {cell[resultPattern[i]-1].className = "result"}
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

