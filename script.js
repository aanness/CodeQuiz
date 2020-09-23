//Ashley Anness Homework4
//click the start button (onclick)
    // timer starts  
    // present a question
        //-lets fill this in
        //Question?
        //Answers
            //-present  another question
            //if answer is incorrect
                //-subtract from the timer
            // - if all questions are answered or timer is 0
                //-game over man
                    // - save initials and score to somewhere

// Var with questions, choices and answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        answer: "3. parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "Terminal / bash", "For loops", "Console log"],
        answer: "console log"
    },

];
// Declared variables 
var score = 0;
var questionList = 0;
var secondsRemaining = 76;
// https://javascript.info/settimeout-setinterval
var holdInterval = 0;
var penalty = 10;
var createUl = document.createElement("ul");
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper")


// Clicking start button
timer.addEventListener("click", function () {
    // set to 0
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsRemaining--;
            currentTime.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionList);
});

// creates questions and choices 
function render(questionList) {
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";
    // For loops 
    for (var i = 0; i < questions.length; i++) {
        // Appends question
        var userQuestion = questions[questionList].title;
        var userChoices = questions[questionList].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Compare choices to answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "newDiv");
        // Keeps timer the same
        if (element.textContent == questions[questionList].answer) {
            score++;
            createDiv.textContent = "Correct!";
            
        } else {
            // deducts for wrong answers
            secondsRemaining = secondsRemaining - penalty;
            createDiv.textContent = "Wrong!";
        }

    }
    // what question
    questionList++;

    // Combine with user scores
    if (questionList >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionList);
    }
    questionsDiv.appendChild(createDiv);

}
// Completed - will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // creates Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Completed!"

    questionsDiv.appendChild(createH1);

    // creates Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Adds time remainig = score
    if (secondsRemaining >= 0) {
        var timeRemaining = secondsRemaining;
        var createScore = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createScore);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // local storage for initials and highscores
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                //JSON.parse(value) --> translates a string and convertsit to whatever it was before
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            // JSON.stringify(value) --> turns whatever it is into a string
            var newScore = JSON.stringify(allScores);
            //mystorage.setItem('exampleArray', JSON.stringify(exampleArray))
            localStorage.setItem("allScores", newScore);
            // Takes you to highscores page
            window.location.replace("./scores.html");
        }
    });

}


// Tutor Notes
//storage uses
// set an item  (also updates0 (key - value pair) assignment
// myStorage.setItem('RBG', 'I dissent')
// update---> mystorage.setItem('RBG', 'I dissent!!!!!)' overwrites previous value
//get an item - reading the value
//var rbg = myStorage.getItme('RBG)
//delete an item 
// mystorage.remove('key')
//delete everything
//myStorage.clear()


//tWO ADDITIONAL METHODS
//JSON.stringify(value) --> turns whatever it is into a stringa
//JSON.parse(value) --> translates a string and convertsit to whatever it was before


//ex
//var exampleArray = ['hi', 'hello', 'hola', 'bon jour']
//to add to ocal storage 
//mystorage.setItem('exampleArray', JSON.stringify(exampleArray))
//get a value out of storage
//var retrievedArray = JSON.parse(mystorage.getItem('exampleArray'))

