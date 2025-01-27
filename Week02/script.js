// Game variables
let currentQuestion = 0;
let score = 0;
let prize = 0;
let selectedOption = -1;
let lifelineUsed = false; // 50-50 lifeline flag

// DOM Elements
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const options = Array.from(document.getElementsByClassName('option'));
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const prizeElement = document.getElementById('prize');
const fiftyfiftyBtn = document.getElementById('fiftyfifty-btn');
const resultContainer = document.getElementById('result-container');

// Randomly generate a question
function generateRandomQuestion() {
  const questionTypes = ['math', 'general', 'science', 'geography'];

  // Randomly pick a question type
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  let questionData = {};

  switch (questionType) {
    case 'math':
      questionData = generateMathQuestion();
      break;
    case 'general':
      questionData = generateGeneralKnowledgeQuestion();
      break;
    case 'science':
      questionData = generateScienceQuestion();
      break;
    case 'geography':
      questionData = generateGeographyQuestion();
      break;
  }

  return questionData;
}

// Generate a math question
function generateMathQuestion() {
  const num1 = Math.floor(Math.random() * 100) + 1;
  const num2 = Math.floor(Math.random() * 100) + 1;
  const answer = num1 + num2;

  const options = [answer, answer + 5, answer - 5, answer + 10];
  return {
    question: `What is ${num1} + ${num2}?`,
    options: shuffleArray(options),
    correct: options.indexOf(answer),
    prize: 1000 * (currentQuestion + 1)
  };
}

// Generate a general knowledge question
function generateGeneralKnowledgeQuestion() {
  const questions = [
    { question: "What is the capital of India?", answer: "New Delhi", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"] },
    { question: "Who is known as the father of the nation in India?", answer: "Mahatma Gandhi", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"] },
    { question: "Who wrote the book '1984'?", answer: "George Orwell", options: ["George Orwell", "J.K. Rowling", "Leo Tolstoy", "Ernest Hemingway"] }
  ];
  const selectedQ = questions[Math.floor(Math.random() * questions.length)];
  return {
    question: selectedQ.question,
    options: shuffleArray(selectedQ.options),
    correct: selectedQ.options.indexOf(selectedQ.answer),
    prize: 5000 * (currentQuestion + 1)
  };
}

// Generate a science question
function generateScienceQuestion() {
  const questions = [
    { question: "What is the chemical symbol for water?", answer: "H2O", options: ["H2O", "O2", "CO2", "NaCl"] },
    { question: "What is the hardest natural substance on Earth?", answer: "Diamond", options: ["Gold", "Diamond", "Iron", "Steel"] },
    { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon dioxide", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Methane"] }
  ];
  const selectedQ = questions[Math.floor(Math.random() * questions.length)];
  return {
    question: selectedQ.question,
    options: shuffleArray(selectedQ.options),
    correct: selectedQ.options.indexOf(selectedQ.answer),
    prize: 10000 * (currentQuestion + 1)
  };
}

// Generate a geography question
function generateGeographyQuestion() {
  const questions = [
    { question: "Which is the largest continent?", answer: "Asia", options: ["Africa", "Asia", "Europe", "Australia"] },
    { question: "Which country is known as the Land of the Rising Sun?", answer: "Japan", options: ["China", "Japan", "India", "South Korea"] },
    { question: "What is the longest river in the world?", answer: "Nile", options: ["Amazon", "Nile", "Yangtze", "Mississippi"] }
  ];
  const selectedQ = questions[Math.floor(Math.random() * questions.length)];
  return {
    question: selectedQ.question,
    options: shuffleArray(selectedQ.options),
    correct: selectedQ.options.indexOf(selectedQ.answer),
    prize: 15000 * (currentQuestion + 1)
  };
}

// Randomize the order of options
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Load the next question
function loadQuestion() {
  if (currentQuestion >= 10) {
    showResult();
    return;
  }

  const questionData = generateRandomQuestion();

  questionElement.textContent = questionData.question;
  options.forEach((btn, index) => {
    btn.textContent = questionData.options[index];
    btn.classList.remove('correct', 'incorrect'); // Reset the option styling
    btn.addEventListener('click', () => handleOptionClick(index, questionData)); // Add event listener dynamically
  });

  selectedOption = -1;
  nextBtn.disabled = true; // Disable Next button until an option is selected
  fiftyfiftyBtn.disabled = lifelineUsed; // Disable 50-50 lifeline if already used

  return questionData;
}

// Handle option selection
function handleOptionClick(index, questionData) {
  selectedOption = index;

  // Check if selected option is correct
  if (selectedOption === questionData.correct) {
    prize = questionData.prize;
    score++;
  } else {
    prize = 0; // If the answer is wrong, set prize to 0
  }

  // Update the score and prize display
  scoreElement.textContent = `Score: ₹${score}`;
  prizeElement.textContent = `Prize: ₹${prize}`;

  // Highlight options
  options.forEach((btn, btnIndex) => {
    if (btnIndex === questionData.correct) {
      btn.classList.add('correct'); // Correct answer style
    } else {
      btn.classList.add('incorrect'); // Incorrect answer style
    }
  });

  // Enable Next button after answering
  nextBtn.disabled = false;
}

// Move to next question
function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

// Display the final result
function showResult() {
  questionContainer.style.display = 'none';
  nextBtn.style.display = 'none';
  fiftyfiftyBtn.style.display = 'none';
  resultContainer.textContent = `Game Over! Your final prize is: ₹${prize}`;
}

// Use 50-50 lifeline
function useFiftyFifty() {
  if (!lifelineUsed) {
    const currentQ = generateRandomQuestion();
    const correctOption = currentQ.correct;
    const incorrectOptions = currentQ.options.filter((_, index) => index !== correctOption);

    // Randomly hide two incorrect options
    const optionsToHide = [];
    while (optionsToHide.length < 2) {
      const randomIndex = Math.floor(Math.random() * 4);
      if (randomIndex !== correctOption && !optionsToHide.includes(randomIndex)) {
        optionsToHide.push(randomIndex);
      }
    }

    // Hide the incorrect options
    optionsToHide.forEach(index => {
      options[index].style.display = 'none';
    });
    lifelineUsed = true;
    fiftyfiftyBtn.disabled = true; // Disable the 50-50 button after use
  }
}

// Add event listener to Next button
nextBtn.addEventListener('click', nextQuestion);

// Add event listener to 50-50 lifeline
fiftyfiftyBtn.addEventListener('click', useFiftyFifty);

// Initialize the game
loadQuestion();
