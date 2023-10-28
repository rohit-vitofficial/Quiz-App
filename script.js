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
    },
    {
        question: "What is the binary system in computing?",
        answer: [
            { text: "A system of 10 digits (0-9)", correct: false },
            { text: "A system of 8 digits (0-7)", correct: false },
            { text: "A system of 2 digits (0 and 1)", correct: true },
            { text: "A system of 16 digits (0-15)", correct: false },
        ]
    },
    {
        question: "What is an operating system?",
        answer: [
            { text: "A type of software used for word processing", correct: false },
            { text: "The physical components of a computer", correct: false },
            { text: "Software that manages computer hardware and provides services for computer programs", correct: true },
            { text: "A hardware component used for data storage", correct: false },
        ]
    },
    {
        question: "What does CPU stand for?",
        answer: [
            { text: "Central Processing Unit", correct: true },
            { text: "Computer Peripheral Unit", correct: false },
            { text: "Central Print Unit", correct: false },
            { text: "Control Panel Unit", correct: false },
        ]
    },
    {
        question: "What is RAM in a computer?",
        answer: [
            { text: "Random Access Memory", correct: true },
            { text: "Read-Only Memory", correct: false },
            { text: "Real-time Application Management", correct: false },
            { text: "Remote Access Module", correct: false },
        ]
    },
    {
        question: "What is a compiler in programming?",
        answer: [
            { text: "A hardware component of a computer", correct: false },
            { text: "A device used for input and output operations", correct: false },
            { text: "A software that translates high-level programming code into machine code", correct: true },
            { text: "A type of programming language", correct: false },
        ]
    },
    {
        question: "What is an IP address used for in networking?",
        answer: [
            { text: "To send emails", correct: false },
            { text: "To identify a computer or device on a network", correct: true },
            { text: "To store data on a server", correct: false },
            { text: "To display web pages", correct: false },
        ]
    },
    {
        question: "What is a firewall in computer security?",
        answer: [
            { text: "A protective barrier around a computer", correct: false },
            { text: "A software or hardware system that prevents unauthorized access to or from a private network", correct: true },
            { text: "A type of antivirus software", correct: false },
            { text: "A device used to increase network speed", correct: false },
        ]
    },
    {
        question: "What is a motherboard in a computer?",
        answer: [
            { text: "The main circuit board that houses the CPU, RAM, and other key components", correct: true },
            { text: "A type of software used for graphics design", correct: false },
            { text: "A peripheral device for audio input and output", correct: false },
            { text: "A type of computer monitor", correct: false },
        ]
    },
    {
        question: "What does HTML stand for in web development?",
        answer: [
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Highly Textual Markup Language", correct: false },
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hyper Transfer Markup Language", correct: false },
        ]
    },
    {
        question: "What is a database in computing?",
        answer: [
            { text: "A computer's file system", correct: false },
            { text: "A collection of related data organized for efficient retrieval", correct: true },
            { text: "A type of computer virus", correct: false },
            { text: "A network of interconnected computers", correct: false },
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