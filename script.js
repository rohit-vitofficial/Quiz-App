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
            {text:"Nepal", correct: false},
            {text:"China", correct: false},
            {text:"India", correct: true},
            {text:"Pakistan", correct: false}
        ]
    },
    {
        question:"How is an array initialized in C language?",
        answer:[
            {text:"int[] a = {1,2,3}",correct:false},
            {text:"int a[3] = {1,2,3}",correct:true},
            {text:"int[] a = new int[3]",correct:false},
            {text:"int a = {1,2,3}",correct:false},
            
        ]
    },
    {
        question:"700 ml of a mixture contains milk and water in the ratio of 4:3. How much more milk is needed to make the ratio 4:1?",
        answer:[
            {text:"900ml",correct:false},
            {text:"800ml",correct:false},
            {text:"700ml",correct:false},
            {text:"650ml",correct:true},
            
        ]
    },
    {
        question:"what is the return type of malloc() and calloc()?",
        answer:[
            {text:"bool *",correct:false},
            {text:"void *",correct:true},
            {text:"int *",correct:false},
            {text:"char *",correct:false},
            
        ]
    },
    {
        question:"A=20% of B and B:C=4:5. What percentage of A is C?",
        answer:[
            {text:"625%",correct:true},
            {text:"600%",correct:false},
            {text:"125%",correct:false},
            {text:"25%",correct:false},
            
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