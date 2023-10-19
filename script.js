document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []
    let isGameOver = false

    //Board creation
    function createBoard() {

        const bombsArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width * width - bombAmount).fill('valid')
        const gameArray = emptyArray.concat(bombsArray)
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)


        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            //click for squares
            square.addEventListener('click', function () {
                click(square)
            })
        }

        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i === width - 1)

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
                if (i > 10 && squares[i - width].classList.contains('bomb')) total++
                if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
                if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
                if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
                if (i < 89 && squares[i + width].classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)
                console.log(squares[i])
            }

        }

    }
    createBoard()


    //it tells me that the game's over if i press a bomb
    function click(square) {
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('bomb') || square.classList.contains('flag')) return

        if (square.classList.contains('bomb')) {
            alert('Game over')
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSqaure(square, currentId)
        }
        square.classList.add('checked')
    }

// creo una funzione che prenda anche i quadrati vicini ad esso con valore 0 che non hanno bombe vicino

function checkSqaure(square , currentId){
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = ( currentId % width === width - 1)

    setTimeout(()=> {
        if (currentId > 0  && !isLeftEdge){
            const newId = squares[parseInt(currentId) -1].id
            const newSquare = document.getElementById(newId)
            click(newSquare, newId) 
        }
        if(currentId > 9 && !isRightEdge){
            const newId = squares[parseInt(currentId) +1 -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if (currentId > 10){
            const newId = squares[parseInt(currentId -width)].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if( currentId > 11 && !isLeftEdge) {
            const newId = squares [parseInt(currentId) -1 -width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 98 && !isGameOver) {
            const newId = squares [parseInt(currentId) +1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 90 && !isLeftEdge) {
            const newId = squares [parseInt(currentId)-1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 88 && !isRightEdge) {
            const newId = squares [parseInt(currentId) +1 +width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
        if(currentId < 89){
            const newId = squares[parseInt( currentId) + width].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
    }, 10)
}












}) 