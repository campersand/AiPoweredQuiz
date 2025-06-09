let questions = [];
let selectedQuestions = [];
let current = 0;
let score = 0;

fetch("soal.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    selectedQuestions = shuffle(questions).slice(0, 20);
    loadQuestion();
  });

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  document.getElementById("feedback").textContent = "";
  document.getElementById("answer").value = "";
  document.getElementById("next").disabled = true;
  document.getElementById("submit").disabled = false;

  document.getElementById("question-number").textContent = `Soal ${current + 1} dari 20`;
  document.getElementById("question-text").textContent = selectedQuestions[current];
}

document.getElementById("submit").onclick = async () => {
  const answer = document.getElementById("answer").value;
  const question = selectedQuestions[current];

  const response = await fetch("https://a59c9a01-02b3-42dc-a551-8d42bfdb3880-00-x4gg61vtn32p.picard.replit.dev/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer })
  });

  const data = await response.json();

  document.getElementById("feedback").textContent = data.feedback;
  if (data.correct) score++;
  document.getElementById("submit").disabled = true;
  document.getElementById("next").disabled = false;
};

document.getElementById("next").onclick = () => {
  current++;
  if (current < 20) {
    loadQuestion();
  } else {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("score-box").classList.remove("hidden");
    document.getElementById("final-score").textContent = Math.round(score / 20 * 100);
  }
};
