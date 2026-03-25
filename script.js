const questions = [
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5"],
    correct: 1
  },
  {
    question: "Capital of India?",
    answers: ["Mumbai", "Delhi", "Chennai"],
    correct: 1
  },
  {
    question: "Which language is used for web?",
    answers: ["Python", "Java", "JavaScript"],
    correct: 2
  }
];

let currentQ = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  let q = questions[currentQ];
  questionEl.innerText = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((ans, index) => {
    let btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (index === questions[currentQ].correct) {
    score++;
  }
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentQ++;
  nextBtn.style.display = "none";

  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  resultDiv.classList.remove("hidden");
  scoreEl.innerText = `Your Score: ${score}/${questions.length}`;
}

function restartGame() {
  currentQ = 0;
  score = 0;
  resultDiv.classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

loadQuestion();
