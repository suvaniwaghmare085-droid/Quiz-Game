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
const progressEl = document.getElementById("progress");

function loadQuestion() {
  resetState();

  let q = questions[currentQ];
  questionEl.innerText = q.question;
  progressEl.innerText = `Question ${currentQ + 1} of ${questions.length}`;

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.innerText = ans;
    btn.onclick = () => selectAnswer(btn, index);
    answersEl.appendChild(btn);
  });
}

function resetState() {
  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";
}

function selectAnswer(button, index) {
  const correct = questions[currentQ].correct;

  Array.from(answersEl.children).forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add("correct");
  });

  if (index === correct) {
    score++;
  } else {
    button.classList.add("wrong");
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
  currentQ++;
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
