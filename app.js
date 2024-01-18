document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const flagsLeft = document.querySelector('#flags-left')
  const width = 10
  let bombAmount = 20
  let squares = []

  function createBoard() {

    flagsLeft.innerHTML = bombAmount

    const bombArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
    //console.log(gameArray)

    for (let i = 0; i < width * width; i++){
      const square = document.createElement('div')
      square.id = i
      square.classList.add(shuffledArray[i])
      grid.append(square)
      squares.push(square)
      console.log(squares)

      square.addEventListener('click', () => {
        click(square)
      })

      // square.addEventListener('click', () => {
      //   addFlag(square)
      // })
    }

    for (let i = 0; i < squares.length; i++){
      let total = 0

      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width - 1)

    }
  }

  createBoard()

  function click(square) {
    console.log(square)
  }
  function addFlag(square) {
    console.log(square)
  }
});