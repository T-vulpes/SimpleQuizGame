const questions = [
    {
        question: "What does -ology mean (Biology, cardiology, physiology, etc.)?",
        answers: [
            { text: "The Study Of", correct: true },
            { text: "Science", correct: false },
            { text: "A Class You Take", correct: false },
            { text: "Scientific Research In School", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", correct: true },
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which element does 'O' represent on the periodic table?",
        answers: [
            { text: "Oxygen", correct: true },
            { text: "Gold", correct: false },
            { text: "Silver", correct: false },
            { text: "Osmium", correct: false }
        ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Great White Shark", correct: false }
        ]
    },
    {
        question: "Which country is the origin of the game of chess?",
        answers: [
            { text: "India", correct: true },
            { text: "China", correct: false },
            { text: "Russia", correct: false },
            { text: "Persia", correct: false }
        ]
    },
    {
        question: "How many continents are there on Earth?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: [
            { text: "Mercury", correct: true },
            { text: "Venus", correct: false },
            { text: "Mars", correct: false },
            { text: "Earth", correct: false }
        ]
    },
    {
        question: "Which ocean is the largest?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Platinum", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let fiftyFiftyUsed = false;
let passUsed = false;

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const fiftyFiftyButton = document.getElementById('fifty-fifty');
const passButton = document.getElementById('pass');
const resultContainer = document.getElementById('result');
const loseContainer = document.getElementById('lose');
const levelIndicator = document.getElementById('level-indicator').children;

startGame();

function startGame() {
    nextButton.classList.add('hide');
    resultContainer.classList.add('hide');
    loseContainer.classList.add('hide');
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        levelIndicator[currentQuestionIndex].classList.add('correct');
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            setTimeout(setNextQuestion, 1000);
        } else {
            resultContainer.classList.remove('hide');
        }
    } else {
        selectedButton.classList.add('wrong');
        loseContainer.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

fiftyFiftyButton.addEventListener('click', () => {
    if (fiftyFiftyUsed) return;
    fiftyFiftyUsed = true;
    const incorrectAnswers = Array.from(answerButtonsElement.children).filter(button => !button.dataset.correct);
    incorrectAnswers.slice(0, 2).forEach(button => button.classList.add('hide'));
});

passButton.addEventListener('click', () => {
    if (passUsed) return;
    passUsed = true;
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        resultContainer.classList.remove('hide');
    }
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
