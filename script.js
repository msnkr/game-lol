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

function getHighestScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore == null) {
    localStorage.setItem("score", "0");
  }
  highestScore = savedScore;
}

function hideUnhideContainers() {
  difficultyContainer.classList.toggle("hidden");
  container.classList.toggle("hidden");
}

function isAnswerCorrect(answer, difficulty, e) {
  if (correctAnswer == answer) {
    count++;

    e.target.classList.add("correct");
    setTimeout(() => {
      e.target.classList.remove("correct"), 1000;
    });
    getQuestions(difficulty);
  } else {
    e.target.classList.add("incorrect");
    setTimeout(() => {
      e.target.classList.remove("incorrect"), 1000;
    });
    if (highestScore < count) {
      highestScore = count;
    }
    localStorage.setItem("score", highestScore);
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
trueBtn.addEventListener("click", (e) => {
  let answer = "True";
  isAnswerCorrect(answer, difficulty, e);
});

falseBtn.addEventListener("click", (e) => {
  let answer = "False";
  isAnswerCorrect(answer, difficulty, e);
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

getHighestScore();
