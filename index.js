const questions=[
    {
        question:"Which attribute is used to provide alternative text for an image?",
        answers:[
            {text:"href",correct:false},
            {text:"alt",correct:true},
            {text:"src",correct:false},
            {text:"title",correct:false}
        ]
    },
    {
        question:"What does HTML stand for?",
        answers:[
            {text:"Hyper Trainer Marking Language",correct:false},
            {text:"Hyper Text Markup Language",correct:true},
            {text:"Hyper Text Marketing Language",correct:false},
            {text:"High Text Markup Language",correct:false}
        ]
    },
    {
        question:"Which HTML tag is used to create  hyperlink?",
        answers:[
            {text:"img",correct:false},
            {text:"a",correct:true},
            {text:"p",correct:false},
            {text:"h1",correct:false}
        ]
    },
    {
    question:"Which tag is used to insert an image element? ",
    answers:[
        {text:"a",correct:false},
        {text:"img",correct:true},
        {text:"div",correct:false},
        {text:"span",correct:false}
    ]
    },
    {
        question:"what does css stand for?",
        answers:[
            {text:"Computer style sheets",correct:false},
            {text:"colorful style sheets",correct:false},
            {text:"creative style sheets",correct:false},
            {text:"cascading style sheets",correct:true}
        ]
    },
    {
        question:"which html element is used to create largest heading?",
        answers:[
            {text:"h1",correct:true},
            {text:"h2",correct:false},
            {text:"h6",correct:false},
            {text:"h3",correct:false}
        ]
    },
    {
        question:"Which property is used in css to change the text color?",
        answers:[
            {text:"bgcolor",correct:false},
            {text:"text-color",correct:false},
            {text:"color",correct:true},
            {text:"font-color",correct:false}
        ]
    },
    {
        question:"which css property is used to set the back-ground color?",
        answers:[
            {text:"background-color",correct:true},
            {text:"bg-color",correct:false},
            {text:"color",correct:false},
            {text:"background-style",correct:false}
        ]
    },
    {
        question:"which tag is used to create an unordered list in html?",
        answers:[
            {text:"ol",correct:false},
            {text:"li",correct:false},
            {text:"list",correct:false},
            {text:"ul",correct:true}
        ]
    },
    {
        question:"which css property controls the text size?",
        answers:[
            {text:"font-style",correct:false},
            {text:"text-size",correct:false},
            {text:"font-size",correct:true},
            {text:"text-style",correct:false}
            
        ]
    }

];



const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const progressElement = document.getElementById('progress');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() { currentQuestionIndex = 0; score = 0; nextButton.innerHTML = "Next"; progressElement.style.width = '0%'; showQuestion(); }

function showQuestion() { resetState(); startTimer(); let currentQuestion = questions[currentQuestionIndex]; questionElement.innerHTML = currentQuestion.question; currentQuestion.answers.forEach(answer => { const button = document.createElement('button'); button.innerHTML = answer.text; button.classList.add('btn'); answerButtons.appendChild(button); if (answer.correct) { button.dataset.correct = answer.correct; } button.addEventListener('click', selectAnswer); }); updateProgressBar(); }

function resetState() { clearInterval(timer); nextButton.style.display = 'none'; while (answerButtons.firstChild) { answerButtons.removeChild(answerButtons.firstChild); } }

function startTimer() { clearInterval(timer); timeLeft = 10; timerElement.innerHTML = `Time Left: ${timeLeft}s`; timer = setInterval(() => { timeLeft--; timerElement.innerHTML = `Time Left: ${timeLeft}s`; if (timeLeft <= 0) { clearInterval(timer); disableButtons(); nextButton.style.display = 'block'; } }, 1000); }

function disableButtons() { Array.from(answerButtons.children).forEach(button => { if (button.dataset.correct === "true") { button.style.backgroundColor = 'green'; } button.disabled = true; }); }

function selectAnswer(e) { clearInterval(timer); const selectedBtn = e.target; const isCorrect = selectedBtn.dataset.correct === "true"; if (isCorrect) { selectedBtn.style.backgroundColor = 'green'; score++; } else { selectedBtn.style.backgroundColor = 'red'; } Array.from(answerButtons.children).forEach(button => { if (button.dataset.correct === "true") { button.style.backgroundColor = 'green'; } button.disabled = true; }); nextButton.style.display = 'block'; }

function showScore() { clearInterval(timer); resetState(); questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; nextButton.innerHTML = "Play Again"; nextButton.style.display = 'block'; progressElement.style.width = '100%'; }

function handleNextButton() { currentQuestionIndex++; if (currentQuestionIndex < questions.length) { showQuestion(); } else { showScore(); } }

function updateProgressBar() { const progressPercentage = ((currentQuestionIndex) / questions.length) * 100; progressElement.style.width = `${progressPercentage}%`; }

nextButton.addEventListener('click', () => { if (currentQuestionIndex < questions.length) { handleNextButton(); } else { startQuiz(); } });

startQuiz();
