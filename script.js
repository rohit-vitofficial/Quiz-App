const questions = [
    {
        question:"Your name is ?",
        answer:[
            {text:"Rohit", correct: true},
            {text:"Rahul", correct: false},
            {text:"Rahul", correct: false},
            {text:"Rahul", correct: false}
        ]
    },
    {
        question:"You Live in ",
        answer:[
            {text:"Nepa;", correct: false},
            {text:"Nepa;", correct: false},
            {text:"Vellore", correct: true},
            {text:"India", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex =0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHtml = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    //It will add the question in the question
    questionElement.innerHTML = questionNo+". "+ currentQuestion.question;

    // It will add the answer in the options
    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        } 
        button.addEventListener("click",selectAnswer);
    });
    
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;   
    }
    else
    {
        selectedBtn.classList.add("incorrect");   
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();