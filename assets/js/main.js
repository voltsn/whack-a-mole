let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let holes = document.querySelectorAll(".hole");
let score = 0;
let timeFrame = 1600;
let timeoutId = undefined;
let previousHole = undefined;
const minTimeFrame = 500;

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")){
    incrementScore();
    updateScore();
    increaseDifficulty();
  }
});
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);

function start() {
  game();
}

function game() {
  let index = randIndex();
  for (let i = 0; i < holes.length; i++){
    if (i === index){
      continue;
    }
    holes[i].classList.remove("active");
  }
  holes[index].classList.add("active");
  timeoutId = setTimeout(game,timeFrame);
}

function stop() {
  if (timeoutId === undefined){
    return;
  }
  clearInterval(timeoutId);
}

function updateScore() {
  let scoreDisplay = document.querySelector("#score");
  scoreDisplay.innerText = score;
}

function incrementScore() {
  score++;
}

function increaseDifficulty() {
  if (timeFrame <= minTimeFrame){
    return;
  }

  if (score % 5 === 0){
    timeFrame -= 300;
  }

  console.log(timeFrame);
}

function randIndex() {
  let max = holes.length;
  let randIndex;
  do{
    randIndex = Math.floor(Math.random() * max);
  }while(randIndex === previousHole)

  return randIndex;
}
