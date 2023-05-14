let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");
let startButton = document.getElementById("startNewGame");
let pauseButton = document.getElementById("pauseGame");
let grid = document.getElementsByClassName("grid")[0];
let squares = document.querySelectorAll(".square");
let gameMusic = new Audio("./images/Assets_gameMusic.mp3");
let hitMusic = new Audio("./images/Assets_hitMusic.mp3");
// Assets_gameMusic.play();

let score = 0;
let timeLeft = 0;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;
//randomly placing mole
function randomMole() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.ceil(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}
randomMole();

function startGame() {
  score = 0;
  timeLeft = 60;

  scoreH2.innerHTML = 'Score:0';
  timeLeft.innerHTML = 'Time Left: 60';
  grid.style.display = 'flex';
  pauseButton.style.display = 'inline-block';
  pauseButton.innerHTML = 'Pause';
  gameMusic.play();
  //callback function
  // setInterval calls function at regular interval
  timerId = setInterval(randomMole, 1000);
  randomMoleId = setInterval(countDown, 1000);
}
function countDown() {
  timeLeft--;
  timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;
  if (timeLeft === 0) {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    grid.style.display = 'none';
  }
}
function pauseResumeGame() {
  if (pauseButton.textContent === "Pause") {
    gameMusic.pause();
    clearInterval(timerId);
    clearInterval(randomMoleId);
    timerId = null;
    randomMoleId = null;
    pauseButton.textContent = "Resume";
  } else {
    gameMusic.play();
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
    pauseButton.textContent = "Pause";
  }
}
squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (timerId !== null) {
      if (square.id === hitPosition) {
        hitMusic.play();
        setTimeout(() => {
          hitMusic.pause();
        }, 1000);
        score++;
        scoreH2.innerText = `Score:${score}`;
        hitPosition = null;
      }
    }
  });
});
startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseResumeGame);
