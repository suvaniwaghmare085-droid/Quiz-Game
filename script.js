let categories = {
  Math: [
    {question:"2+2?", answers:["3","4","5"], correct:1},
    {question:"5-3?", answers:["1","2","3"], correct:1},
  ],
  Science: [
    {question:"H2O is?", answers:["Water","Oxygen","Hydrogen"], correct:0},
    {question:"Sun is a?", answers:["Planet","Star","Moon"], correct:1},
  ]
};

let currentQ = 0, score=0, timer, selectedCategory = "";
let questions = [];

const categoryScreen = document.getElementById('category-screen');
const categoryOptions = document.getElementById('category-options');
const quizScreen = document.getElementById('quiz-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const scoreChip = document.getElementById('score-chip');
const progressFill = document.getElementById('progress-fill');
const qCounter = document.getElementById('q-counter');
const feedbackEl = document.getElementById('feedback');
const resultScreen = document.getElementById('result-screen');
const resultTitle = document.getElementById('result-title');
const resultSub = document.getElementById('result-sub');
const scoreNum = document.getElementById('score-num');
const scoreTotal = document.getElementById('score-total');
const restartBtn = document.getElementById('restartBtn');

// Category selection
Object.keys(categories).forEach(cat=>{
  const btn = document.createElement('button');
  btn.textContent = cat;
  btn.onclick = ()=>selectCategory(cat);
  categoryOptions.appendChild(btn);
});

function selectCategory(cat){
  selectedCategory = cat;
  questions = [...categories[cat]];
  questions.sort(()=>Math.random()-0.5); // Shuffle
  categoryScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  loadQuestion();
}

function loadQuestion(){
  if(currentQ>=questions.length){ showResult(); return;}
  const q = questions[currentQ];
  questionEl.textContent = q.question;
  answersEl.innerHTML="";
  q.answers.forEach((ans,i)=>{
    const btn = document.createElement('button');
    btn.textContent=ans;
    btn.onclick=()=>checkAnswer(i,btn);
    answersEl.appendChild(btn);
  });
  scoreChip.textContent=`Score: ${score}`;
  qCounter.textContent=`Question ${currentQ+1} of ${questions.length}`;
  progressFill.style.width = `${(currentQ/questions.length)*100}%`;
}

function checkAnswer(i,btn){
  const correct = questions[currentQ].correct;
  Array.from(answersEl.children).forEach(b=>b.disabled=true);
  if(i===correct){ score++; btn.style.background='green'; } 
  else { btn.style.background='red'; answersEl.children[correct].style.background='green';}
  currentQ++;
  nextBtn.classList.remove('hidden');
}

nextBtn.onclick=()=>{
  nextBtn.classList.add('hidden');
  loadQuestion();
}

function showResult(){
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreNum.textContent=score;
  scoreTotal.textContent=questions.length;
  const pct=Math.round((score/questions.length)*100);
  resultTitle.textContent = pct>=67?'🎉 Great Job!':'👍 Good Try!';
  resultSub.textContent = `You scored ${score} out of ${questions.length}`;
}

restartBtn.onclick=()=>{
  currentQ=0;score=0;
  resultScreen.classList.add('hidden');
  categoryScreen.classList.remove('hidden');
}
