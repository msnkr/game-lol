let countdownElem = document.querySelector(".countdown-number");
let modeElem = document.querySelector(".mode");
let questionElem = document.querySelector(".is-true");
let highScore = document.querySelector(".high-score");

const easyBtn = document.querySelector(".easy");
const mediumBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");

const trueBtn = document.querySelector(".true");
const falseBtn = document.querySelector(".false");

const container = document.querySelector(".container");
const difficultyContainer = document.querySelector(".select-difficulty");

let highestScore = 0;
let count = 0;
let correctAnswer;
let difficulty = "";

function hideUnhideContainers() {
  difficultyContainer.classList.toggle("hidden");
  container.classList.toggle("hidden");
}

function isAnswerCorrect(answer, difficulty) {
  if (correctAnswer == answer) {
    count++;
    getQuestions(difficulty);
  } else {
    if (highestScore < count) {
      highestScore = count;
    }
    count = 0;
    getQuestions(difficulty);
  }
}

function updateDom(data) {
  modeElem.innerHTML = data.difficulty;
  modeElem.style.textTransform = "capitalize";

  questionElem.innerHTML = data.question;
  countdownElem.innerHTML = count;
  correctAnswer = data.correct_answer;
  highScore.innerHTML = highestScore;

  console.log(correctAnswer);
}

async function getQuestions(difficulty) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=boolean`
  );
  const jsonData = await response.json();
  let questionData = jsonData.results;
  updateDom(questionData[0]);
}

// Events
trueBtn.addEventListener("click", () => {
  let answer = "True";
  isAnswerCorrect(answer, difficulty);
});

falseBtn.addEventListener("click", () => {
  let answer = "False";
  isAnswerCorrect(answer, difficulty);
});

easyBtn.addEventListener("click", () => {
  difficulty = "easy";
  hideUnhideContainers();

  getQuestions(difficulty);
});

mediumBtn.addEventListener("click", () => {
  difficulty = "medium";
  hideUnhideContainers();

  getQuestions(difficulty);
});

hardBtn.addEventListener("click", () => {
  difficulty = "hard";
  hideUnhideContainers();

  getQuestions(difficulty);
});
