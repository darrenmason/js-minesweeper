document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const flagsLeft = document.querySelector('#flags-left')
  const result = document.querySelector('#result')
  const width = 10
  let bombAmount = 20
  let squares = []
  let isGameOver = false
  let flags = 0

  function createBoard() {

    flagsLeft.innerHTML = bombAmount

    const bombArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

    for (let i = 0; i < width * width; i++){
      const square = document.createElement('div')
      square.id = i
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      square.addEventListener('click', () => {
        click(square)
      })

      square.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        addFlag(square)
      })
    }

    for (let i = 0; i < squares.length; i++){
      let total = 0


      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge(i) && squares[i - 1].classList.contains('bomb')) total++
        if (i > 9 && !isRightEdge(i) && squares[i + 1 - width].classList.contains('bomb')) total++
        if (i > 10 && squares[i - width].classList.contains('bomb')) total++
        if (i > 11 && !isLeftEdge(i) && squares[i - width - 1].classList.contains('bomb')) total++
        if (i < 98 && !isRightEdge(i) && squares[i + 1].classList.contains('bomb')) total++
        if (i < 90 && !isLeftEdge(i) && squares[i - 1 + width].classList.contains('bomb')) total++
        if (i < 88 && !isRightEdge(i) && squares[i + 1 + width].classList.contains('bomb')) total++
        if (i < 89 && squares[i + width].classList.contains('bomb')) total++
        squares[i].setAttribute('data', total)
      }

    }
  }

  createBoard()


  function click(square) {
    if (
      isGameOver || 
      square.classList.contains('flag') || 
      square.classList.contains('checked')) return

    if (square.classList.contains('bomb')){
      gameOver()
    }else{
      let total = square.getAttribute('data')
      if (total != 0){
        square.classList.add('checked')
        if (total == 1) square.classList.add('one')
        if (total == 2) square.classList.add('two')
        if (total == 3) square.classList.add('three')
        if (total == 4) square.classList.add('four')
        square.innerHTML = `<div class="total-adjacent">${total}</div>`
        return
      }
      checkSquare(square)  
    }
    square.classList.add('checked')


  }

  function checkSquare(square){

    const currentId = parseInt(square.id)
    
    setTimeout(() => {
      if(square.id > 0 && !isLeftEdge(square.id)){
        click(document.getElementById(
          squares[currentId - 1].id
        ))
      }
      if(square.id > 9 && !isRightEdge(square.id)){
        click(document.getElementById(
          squares[currentId + 1 - width].id
        ))
      }
      if(square.id > 10){
        click(document.getElementById(
          squares[currentId - width].id
        ))
      }
      if(square.id > 11 && !isLeftEdge(square.id)){
        click(document.getElementById(
          squares[currentId - 1 - width].id
        ))
      }
      if(square.id < 98 && !isRightEdge(square.id)){
        click(document.getElementById(
          squares[currentId + 1].id
        ))
      }
      if(square.id < 90 && !isLeftEdge(square.id)){
        click(document.getElementById(
          squares[currentId - 1 + width].id
        ))
      }
      if(square.id < 88 && !isRightEdge(square.id)){
        click(document.getElementById(
          squares[currentId + 1 + width].id
        ))
      }
      if(square.id < 89){
        click(document.getElementById(
          squares[currentId + width].id
        ))
      }
    }, 10)
  }

  function isLeftEdge(item){
    return (item % width === 0)
  }

  function isRightEdge(item){
    return (item % width === width - 1)
  }

  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')){
        square.classList.add('flag')
        flags++
        square.innerHTML = '<div class="flag">&#128681;</div>'
        flagsLeft.innerHTML = bombAmount - flags
        checkIfWin()
      }else{
        square.classList.remove('flag')
        flags--
        square.innerHTML = ''
        flagsLeft.innerHTML = bombAmount  - flags
      }
    }
  }

  function checkIfWin(){
    let matches = 0
    for (let i = 0; i < squares.length; i++){
      if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
        matches++
      }
      if(matches === bombAmount){
        gameWon()
      }
    }
  }

  function gameOver() {
    result.innerHTML = 'You have been horrendously disfigured by a hidden bomb. Game Over!'
    isGameOver = true

    squares.forEach(square => {
      if (square.classList.contains('bomb')){
        square.innerHTML = '&#128163;'
        square.classList.remove('bomb')
        square.classList.add('checked')
      }
    })
  }

  function gameWon(){
    result.innerHTML = 'You have overcome the darkness. Congratulations. You get a fish. &#128031;'
    isGameOver = true
  }

});