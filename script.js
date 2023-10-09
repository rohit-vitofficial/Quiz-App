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
            {text:"Nepal;", correct: false},
            {text:"China", correct: false},
            {text:"India", correct: true},
            {text:"Pakistan", correct: false}
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
        
    });
    
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
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