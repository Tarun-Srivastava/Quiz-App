
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
let questionCounter = 0;
let currentQuestion;
let availableQuestions =[];
let availableOptions =[];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions(){
    const totalQuestion =quiz.length;
    for(let i=0;i<totalQuestion;i++){
        availableQuestions.push(quiz[i]);
    }
}

function getNewQuestion(){
    questionNumber.innerHTML= "Question "+(questionCounter+1)+" of " +quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion=questionIndex;
    questionText.innerHTML= currentQuestion.q;
    const index1= availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    // console.log(questionIndex);
    // console.log(availableQuestions);
    // console.log(quiz);
    const optionLen = currentQuestion.Options.length;
    for(let i=0;i<optionLen;i++)
    {
        availableOptions.push(i);
    }
    optionContainer.innerHTML='';
    let animationDelay =0.1;

    for(let i=0; i<optionLen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        // console.log(optionIndex);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.Options[optionIndex];
        option.id=optionIndex;
        option.style.animationDelay= animationDelay+'s';
        animationDelay+=0.2;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++;
}
//================================================================
function getResult(element){
// console.log(element.innerHTML);
// console.log(attempt);
const id =element.id;
if(id==currentQuestion.answer){
    // console.log("correct");
    element.classList.add("correct");
    upadteAnswerIndicator("correct");
    correctAnswers++;
    // document.getElementById("body").classList.toggle("correct")   
}
    else{
        element.classList.add("Incorrect");
        upadteAnswerIndicator("Incorrect");
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id)==currentQuestion.answer)
            optionContainer.children[i].classList.add("correct");
        }
        // document.getElementById("body").classList.toggle("Incorrect");
    // console.log("incorrect "+ id +" "+ currentQuestion.answer);
    }
    
    attempt++;
    console.log(attempt);
    freezeOptions();
}

function freezeOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("Already-answered");

    }
}

function answerIndicator(){
    answerIndicatorContainer.innerHTML='';
    const totalQuestion = quiz.length;
    for(let i =0;i<totalQuestion;i++){
        const  indicator= document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}
function upadteAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

//================================================================
function next(){
    if(questionCounter===quiz.length){
        console.log("Quiz over: "+ attempt);
        quizOver();
    }
    else{
        getNewQuestion();
    }

}

function quizResult(){
    console.log("quiz result attempt =" + attempt);
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-Incorrect").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100; 
    resultBox.querySelector(".Percentage").innerHTML = percentage.toFixed(2)+"%"
    resultBox.querySelector(".total-score").innerHTML = correctAnswers+"/"+quiz.length;
}
//==================================================================

function quizOver(){
    //console.log("over : " + attempt);
    quizResult();
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function resetQuiz(){
 questionCounter = 0;
 correctAnswers = 0;
 attempt = 0;
}

function goHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answerIndicator();
}