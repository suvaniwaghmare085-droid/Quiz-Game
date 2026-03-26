// ── Questions ──────────────────────────────────────────────────
// Add or edit questions here. Each object needs:
//   question : string
//   answers  : array of strings
//   correct  : index of the correct answer (0-based)
const questions = [
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5"],
    correct: 1
  },
  {
    question: "What is the capital of India?",
    answers: ["Mumbai", "Delhi", "Chennai"],
    correct: 1
  },
  {
    question: "Which language is used for the web?",
    answers: ["Python", "Java", "JavaScript"],
    correct: 2
  }
];

// ── State ───────────────────────────────────────────────────────
const LABELS = ["A", "B", "C", "D"];
let currentQ  = 0;
let score     = 0;
let wrongCount = 0;

// ── DOM References ───────────────────────────────────────────────
const questionEl   = document.getElementById("question");
const answersEl    = document.getElementById("answers");
const nextBtn      = document.getElementById("nextBtn");
const feedbackEl   = document.getElementById("feedback");
const qCounter     = document.getElementById("q-counter");
const scoreChip    = document.getElementById("score-chip");
const progressFill = document.getElementById("progress-fill");

// ── Load Question ────────────────────────────────────────────────
function loadQuestion() {
  const q = questions[currentQ];

  // Update header meta
  qCounter.textContent    = `Question ${currentQ + 1} of ${questions.length}`;
  scoreChip.textContent   = `Score: ${score}`;
  progressFill.style.width = `${(currentQ / questions.length) * 100}%`;

  // Reset feedback & next button
  feedbackEl.className    = "feedback";
  feedbackEl.textContent  = "";
  nextBtn.className       = "btn-next";

  // Animate question text in
  questionEl.textContent = q.question;
  questionEl.className   = "question";
  void questionEl.offsetWidth; // force reflow so animation re-triggers
  questionEl.className   = "question slide-in";

  // Build answer buttons
  answersEl.innerHTML = "";
  q.answers.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.className = "ans-btn";
    btn.style.animation      = "fadeUp 0.3s ease both";
    btn.style.animationDelay = `${i * 0.07}s`;
    btn.innerHTML = `
      <span class="ans-label">${LABELS[i]}</span>
      <span class="ans-text">${ans}</span>
      <span class="ans-icon"></span>
    `;
    btn.addEventListener("click", () => checkAnswer(i, btn));
    answersEl.appendChild(btn);
  });
}

// ── Check Answer ─────────────────────────────────────────────────
function checkAnswer(index, clickedBtn) {
  const correctIndex = questions[currentQ].correct;
  const allBtns      = answersEl.querySelectorAll(".ans-btn");

  // Disable all buttons immediately
  allBtns.forEach(btn => (btn.disabled = true));

  if (index === correctIndex) {
    score++;
    clickedBtn.classList.add("correct");
    clickedBtn.querySelector(".ans-icon").textContent = "✓";
    feedbackEl.textContent = "✓ Correct! Nice one.";
    feedbackEl.className   = "feedback correct show";
  } else {
    wrongCount++;
    clickedBtn.classList.add("wrong");
    clickedBtn.querySelector(".ans-icon").textContent = "✗";
    // Highlight the correct answer
    allBtns[correctIndex].classList.add("correct");
    allBtns[correctIndex].querySelector(".ans-icon").textContent = "✓";
    feedbackEl.textContent = `✗ Not quite — the answer was "${questions[currentQ].answers[correctIndex]}".`;
    feedbackEl.className   = "feedback wrong show";
  }

  // Update live score & show Next button
  scoreChip.textContent = `Score: ${score}`;
  nextBtn.className     = "btn-next show";
}

// ── Next Question ────────────────────────────────────────────────
nextBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ── Show Results ─────────────────────────────────────────────────
function showResult() {
  document.getElementById("quiz").style.display = "none";

  const resultEl = document.getElementById("result");
  resultEl.className = "show";

  const pct   = Math.round((score / questions.length) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 67 ? "🎉" : pct >= 33 ? "👍" : "😅";
  const title = pct === 100 ? "Perfect Score!" : pct >= 67 ? "Great Job!" : pct >= 33 ? "Good Try!" : "Better Luck Next Time!";

  document.getElementById("result-emoji").textContent = emoji;
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-sub").textContent   = `You scored ${score} out of ${questions.length}`;
  document.getElementById("score-num").textContent    = score;
  document.getElementById("score-total").textContent  = `out of ${questions.length}`;
  document.getElementById("r-correct").textContent    = score;
  document.getElementById("r-wrong").textContent      = wrongCount;
  document.getElementById("r-accuracy").textContent   = `${pct}%`;

  // Animate the conic score ring
  document.getElementById("score-circle").style.setProperty("--pct", `${pct}%`);
}

// ── Restart ──────────────────────────────────────────────────────
function restartGame() {
  currentQ   = 0;
  score      = 0;
  wrongCount = 0;

  document.getElementById("result").className      = "";
  document.getElementById("quiz").style.display    = "block";
  loadQuestion();
}

// ── Init ─────────────────────────────────────────────────────────
loadQuestion();
