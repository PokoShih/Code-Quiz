// This assignment asks questions with the appropriate answers for users.
//arrray of the quiz questions    
var questions = [{
        title: "What are the four forces of flight?",
        choices: ["Air law, trust, drag, and heavy", "Crew, aircraft, luggage, and passengers", "Lift, thrust, drag, and weight"],
        answer: "Lift, thrust, drag, and weight"
    },
    {
        title: "What does FAA stand for?",
        choices: ["Federal Avionics Administration", "Federal Aviation Administration", "Fedex Aircraft Administration"],
        answer: "Federal Aviation Administration"
    },
    {
        title: "Which of the following are PPL(Private Pilot License) training aircraft?",
        choices: ["C172, B737, DA-20", "B757, B767, A330", "C172, C152, DA-20"],
        answer: "C172, C152, DA-20"
    },
    {
        title: "Altitude in aviation in measured in?",
        choices: ["Feet", "Metres", "Kilometres"],
        answer: "Feet"
    },
    {
        title: "At what age can you receive your PPL(Private Pilot License)?",
        choices: ["15", "17", "14"],
        answer: "17"
    }
]
//setting needed values and elements for click events
var score = 0;
var currentQuestion = -1;
var timeRemain = 0;
var timer;
var startQ=document.querySelector("#startButton");
var viewScore=document.querySelector("#leftScore");
startQ.addEventListener("click",start);
viewScore.addEventListener("click",getScore);
//starts the countdown timer once user clicks the 'start' button
function start() {
    timeRemain = 60;
    document.getElementById("timeRemain").textContent = timeRemain;
    timer = setInterval(function() {
        timeRemain--;
        document.getElementById("timeRemain").textContent = timeRemain;
        //proceed to end the game function when timer is below 0 at any time
        if (timeRemain <= 0) {
            clearInterval(timer);
            outOfTime(); 
            document.body.style.backgroundImage="url('Assets/mayday.jpg')";
        }
    }, 1000);
    next();
}

function outOfTime() {
    clearInterval(timer);
    var quizContent = `
    <h2>Game over!</h2>
    <h3>Unfortunately, you are out of time.</h3>
    <h3>You got a ` + score +  ` /100!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);
    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;
}
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }
    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quizBody").innerHTML = quizContent;
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    `;
    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeRemain = 0;
    timer = null;

    document.getElementById("timeRemain").innerHTML = timeRemain;
    var quizContent = `<h1>Aerospace 101!</h1>
    <h3>Click to take off!</h3>
    <button onclick="start()">Start!</button>`;
    document.getElementById("quizBody").innerHTML = quizContent;
}
//Gain 20 points for the right answer
function correct() {
    score += 20;
    next();
}
//Lose 15 seonds for the incorrect answer
function incorrect() {
    timeRemain -= 10; 
    next();
}
//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}