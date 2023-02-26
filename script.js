let array = []
let gameArray = []
let NodeNumsCopy = []

let startSize = 4
let stopGame = false

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let restartBtn = document.getElementsByClassName("restart")[0];

span.onclick = function () {
  modal.style.display = "none"
}

restartBtn.onclick = function () {
  window.location.reload()
}

function generateArray() {
  let nums = []
  ranNums = [],
    j = 0;

  for (let x = 0; x < 36; x++) nums.push(x)

  let i = nums.length

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    ranNums.push(nums[j]);
    nums.splice(j, 1);
  }

  return ranNums
}

function emptyBoard() {
  document.getElementById('tabla').innerHTML = ''
  for (let i = 0; i < 36; i++) {
    const e = document.createElement('div');
    e.id = `${i}`
    document.getElementById('tabla').appendChild(e)
  }
}

function hideValues() {
  for (let i = 0; i < 36; i++) {
    if (i < startSize) {
      const e = document.getElementById(`${NodeNumsCopy[i]}`)
      e.innerHTML = ``
    }
  }
}

function showValues() {
  let k = 0;
  for (let i = 0; i < 36; i++) {
    if (i < startSize) {
      const e = document.getElementById(`${NodeNumsCopy[i]}`)
      e.innerHTML = `${++k}`
    }
  }
}

function nextLevel(size) {
  let NodeNums = generateArray()
  NodeNumsCopy = Array.from(NodeNums)
  let k = 0;
  for (let i = 0; i < 36; i++) {
    if (i < size) {
      const e = document.getElementById(`${NodeNums[i]}`)
      e.innerHTML = `${++k}`
      e.classList.add('box')
      e.dataset.value = k
    }
    else {
      const e = document.getElementById(`${NodeNums[i]}`)
      e.classList.add('invisible')
    }
  }

}

function roundLoop() {
  if (stopGame) return
  else {
    if (gameArray.length == 0) hideValues()
    if (gameArray.length == 0 && this.dataset.value == 1) {
      gameArray.push(this.dataset.value)
      this.classList.add('correct')
    }
    else if (gameArray.length == startSize - 1) {
      startSize = startSize + 1
      gameArray = []
      playLevel()
      const boxes = document.querySelectorAll(".box")
      boxes.forEach(box => box.addEventListener('click', roundLoop))
    }
    else {
      if (this.dataset.value - gameArray[gameArray.length - 1] !== 1) {
        stopGame = true
        showValues()
        this.classList.add('incorrect')
      }
      else {
        this.classList.add('correct')
        gameArray.push(this.dataset.value)
      }
    }
  }
  if (stopGame) {
    //TODO: Show Restart Game Dialog
    // Also create a style.css
    // alert("Game over!")
    modal.style.display = "block";
  }
}

function playLevel() {
  emptyBoard()
  nextLevel(startSize)
}


function gameLoop() {
  emptyBoard()
  playLevel()
  const boxes = document.querySelectorAll(".box")
  boxes.forEach(box => box.addEventListener('click', roundLoop))
}
document.body.onload = gameLoop
