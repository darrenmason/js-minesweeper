document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const flagsLeft = document.querySelector('#flags-left')
  const width = 10
  let bombAmount = 20

  function createBoard() {

    flagsLeft.innerHTML = bombAmount

    const bombArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width * width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombArray)
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
    console.log(gameArray)

    for (let i = 0; i < width * width; i++){
      const square = document.createElement('div')
      square.id = i
      square.classList.add(shuffledArray[i])
      grid.append(square)
    }
  }

  createBoard()
});