function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openLesson() {
  showSection("lesson");
}

// QUIZ
const quizData = [
  {
    question: "What is a loop?",
    answers: ["Variable", "Repetition", "Function"],
    correct: 1
  }
];

let current = 0;
let selected = null;
let score = 0;

function startQuiz() {
  showSection("quiz");
  loadQuestion();
}

function loadQuestion() {
  let q = quizData[current];
  document.getElementById("question").innerText = q.question;

  let ansDiv = document.getElementById("answers");
  ansDiv.innerHTML = "";

  q.answers.forEach((a, i) => {
    let btn = document.createElement("button");
    btn.innerText = a;
    btn.onclick = () => selected = i;
    ansDiv.appendChild(btn);
  });
}

function submitAnswer() {
  if (selected === quizData[current].correct) score++;

  let percent = (score / quizData.length) * 100;
  document.getElementById("result").innerText = "Score: " + percent + "%";

  updateProgress(percent);
}

// PROGRESS
function updateProgress(p) {
  let bar = document.getElementById("progressBar");
  let text = document.getElementById("progressText");
  let level = document.getElementById("level");

  bar.style.width = p + "%";
  text.innerText = p + "%";

  if (p < 40) {
    bar.style.background = "red";
    level.innerText = "Beginner";
  } else if (p < 70) {
    bar.style.background = "orange";
    level.innerText = "Intermediate";
  } else {
    bar.style.background = "green";
    level.innerText = "Advanced";
  }
}

// AI CHAT (REAL)
async function sendMessage() {
  let input = document.getElementById("userInput");
  let msg = input.value;

  let chat = document.getElementById("chatBox");
  chat.innerHTML += `<div class="user">${msg}</div>`;

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();

  chat.innerHTML += `<div class="ai">${data.reply}</div>`;
  input.value = "";
}