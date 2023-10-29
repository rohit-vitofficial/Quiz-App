const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const easyButton = document.getElementById("easy-button");
const mediumButton = document.getElementById("medium-button");
const hardButton = document.getElementById("hard-button");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let currentQuestionCategory = null;
let score = 0;
let timerInterval;
let timer = 120; // 30 seconds

const questionsData = {
  easy: [
    {
      question: "What is the capital of France?",
      answer: [
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false },
      ],
    },
    {
      question: "Which planet is known as the Red Planet?",
      answer: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Venus", correct: false },
        { text: "Jupiter", correct: false },
      ],
    },
    {
      question: "What is the largest mammal in the world?",
      answer: [
        { text: "African Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Hippopotamus", correct: false },
      ],
    },
    {
      question: "What is the main function of the heart in the human body?",
      answer: [
        { text: "Pumping Blood", correct: true },
        { text: "Digesting Food", correct: false },
        { text: "Filtering Waste", correct: false },
        { text: "Breathing", correct: false },
      ],
    },
    {
      question: "What is the freezing point of water in degrees Celsius?",
      answer: [
        { text: "-10°C", correct: false },
        { text: "0°C", correct: true },
        { text: "10°C", correct: false },
        { text: "20°C", correct: false },
      ],
    },
  ],
  medium: [
    {
      question: "What is the largest planet in our solar system?",
      answer: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Saturn", correct: false },
      ],
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      answer: [
        { text: "Oxygen", correct: false },
        { text: "Nitrogen", correct: true },
        { text: "Carbon Dioxide", correct: false },
        { text: "Helium", correct: false },
      ],
    },
    {
      question: "What is the chemical symbol for the element gold?",
      answer: [
        { text: "Go", correct: false },
        { text: "Gl", correct: false },
        { text: "Au", correct: true },
        { text: "Ag", correct: false },
      ],
    },
    {
      question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
      answer: [
        { text: "Oxygen", correct: false },
        { text: "Carbon Dioxide", correct: true },
        { text: "Nitrogen", correct: false },
        { text: "Hydrogen", correct: false },
      ],
    },
    {
      question: "What is the chemical symbol for water?",
      answer: [
        { text: "H2O", correct: true },
        { text: "CO2", correct: false },
        { text: "NaCl", correct: false },
        { text: "O2", correct: false },
      ],
    },
  ],
  hard: [
    {
      question: "What is the formula for calculating the area of a triangle?",
      answer: [
        { text: "A = 2 * b * h", correct: false },
        { text: "A = b * h", correct: true },
        { text: "A = (b + h) / 2", correct: false },
        { text: "A = π * r^2", correct: false },
      ],
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answer: [
        { text: "William Shakespeare", correct: true },
        { text: "Charles Dickens", correct: false },
        { text: "Leo Tolstoy", correct: false },
        { text: "Jane Austen", correct: false },
      ],
    },
    {
      question: "What is the capital of Australia?",
      answer: [
        { text: "Sydney", correct: false },
        { text: "Canberra", correct: true },
        { text: "Melbourne", correct: false },
        { text: "Perth", correct: false },
      ],
    },
    {
      question: "In which year did the Titanic sink?",
      answer: [
        { text: "1905", correct: false },
        { text: "1912", correct: true },
        { text: "1920", correct: false },
        { text: "1931", correct: false },
      ],
    },
    {
      question: "What is the chemical formula for table salt?",
      answer: [
        { text: " NaCl", correct: true },
        { text: " K2SO4", correct: false },
        { text: " H2O", correct: false },
        { text: " CO2", correct: false },
      ],
    },
  ],
};

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timer--;
    if (timer <= 0) {
      clearInterval(timerInterval);
      timer = 0; // Ensure timer doesn't go negative
      showScore();
    }
    updateTimerDisplay();
  }, 1000); // Update the timer every second
}

// Function to update the timer display
function updateTimerDisplay() {
  timerElement.textContent = `Time Left: ${timer} seconds`;
}

easyButton.addEventListener("click", () => {
  currentQuestionCategory = "easy";
  startQuiz();
});

mediumButton.addEventListener("click", () => {
  currentQuestionCategory = "medium";
  startQuiz();
});

hardButton.addEventListener("click", () => {
  currentQuestionCategory = "hard";
  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timer = 120; // Reset the timer
  nextButton.innerHTML = "Next";
  showQuestion();
  startTimer(); // Start the timer
}

function showQuestion() {
  resetState();
  const currentQuestion = questionsData[currentQuestionCategory][currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answer.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


function handleNextButton() {
  if (currentQuestionIndex < questionsData[currentQuestionCategory].length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", handleNextButton);

// Function to save the score in local storage
function saveScore(difficulty, score) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || {};
  scores[difficulty] = score;
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

// Function to get the score from local storage
function getScore(difficulty) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || {};
  return scores[difficulty] || 0;
}

function showScore() {
  resetState();
  const currentScore = score;
  const bestScore = getScore(currentQuestionCategory);
  clearInterval(timerInterval); // Pause the timer
  if (currentScore > bestScore) {
    saveScore(currentQuestionCategory, currentScore);
  }
  questionElement.innerHTML = `You scored ${currentScore} out of ${questionsData[currentQuestionCategory].length}!<br>Best Score: ${bestScore}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

const historyButton = document.getElementById("history-button");

  historyButton.addEventListener("click", function () {
    window.location.href = "history.html"; // Navigate to the history page
  });




