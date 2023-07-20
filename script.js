let countdownElem = document.querySelector(".countdown-number");
let modeElem = document.querySelector(".mode");
let questionElem = document.querySelector(".is-true");
let highScore = document.querySelector(".high-score");

const trueBtn = document.querySelector(".true");
const falseBtn = document.querySelector(".false");

let highestScore = 0;
let count = 0;
let correctAnswer;

function isAnswerCorrect(answer) {
  if (correctAnswer == answer) {
    count++;
    getQuestions();
  } else {
    if (highestScore < count) {
      highestScore = count;
    }
    count = 0;
    getQuestions();
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

async function getQuestions() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=1&type=boolean"
  );
  const jsonData = await response.json();
  let questionData = jsonData.results;
  updateDom(questionData[0]);
}

// Events
trueBtn.addEventListener("click", () => {
  let answer = "True";
  isAnswerCorrect(answer);
});

falseBtn.addEventListener("click", () => {
  let answer = "False";
  isAnswerCorrect(answer);
});

getQuestions();
