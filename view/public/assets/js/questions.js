/*
 * Question Array
 */
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: 2
    },
    {
        title: "The condition in an if else statement is enclosed within _______?",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: 2
    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 3
    },
    {
        title: "String values must be enclosed within  _______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: 2
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: 3
    }
];

var storage = new LocalStorage("code-quiz");

var scores = storage.get("scores", []);

function Interval(fn = () => { }, interval = 1000, timeout = null, ...arguments) {
    this.fn = fn;
    this.interval = interval;
    this.originalTimeout = timeout;
    this.timeout = timeout;
    this.arguments = arguments;
    this.handle = undefined;

    this.getTimeout = function () {
        if (typeof this.timeout === 'number') {
            return this.timeout;
        }
        else {
            return undefined;
        }
    };

    this.pause = function () {
        if (this.handle) {
            clearInterval(this.handle);
            this.handle = undefined;
        }
    };

    this.stop = function() {
        this.pause();
        this.timeout = this.originalTimeout;
    }

    this.start = function () {
        this.handle = this.handle ?? setInterval(function () {
            fn();
            if (typeof this.timeout === 'number') {
                if (this.timeout <= this.interval) {
                    clearInterval(this.handle);
                    this.handle = undefined;
                    this.timeout = 0;
                }
                else {
                    this.timeout -= this.interval;
                }
            }
        }.bind(this), this.interval, ...this.arguments);
    }
}

var intervalHandle = {
    question: null,
    answer: null,
    reset: function (name, timeout, fn) {
        if (this[name] !== null) {
            clearInterval(this[name]);
        }
        this[name] = setInterval(fn, timeout);
    },
    clear: function (name) {
        if (this[name] !== null) {
            clearInterval(this[name]);
            this[name] = null;
        }
    }
};

var timeEl = document.getElementById("time");
var highscoresEl = document.getElementById("highscores");

var titleEl = document.getElementById("title");
var choicesEl = document.getElementById("choices");
var answerEl = document.getElementById("answer");

var totalTime = questions.length * 15;

/**
 * displayTime
 * 
 * @param {bool} doDisplay indicates whether the time element should contain information
 */
function displayTime(doDisplay) {
    if (doDisplay) {
        timeEl.textContent = "Time: ".concat(totalTime, "s");
    }
    else {
        timeEl.textContent = "";
    }
}

/**
 * displayHighScores
 * 
 * @param {bool} doDisplay Indicates whether the highscores element should contain information
 */
function displayHighScores(doDisplay) {
    if (doDisplay) {
        highscoresEl.innerHTML = "<a href=\"javascript:initHighScores()\">high scores</a>";
    }
    else {
        highscoresEl.innerHTML = "";
    }
}

function navBar({ time, enableHighScores }) {
    if (time) {
        timeEl.textContent = "Time: ".concat(time, "s");        
    }
    else {
        timeEl.textContent = "";

    }
    if (enableHighScores) {
        highscoresEl.innerHTML = "<a href=\"javascript:initHighScores()\">high scores</a>";
    }
    else {
        highscoresEl.innerHTML = "";
    }
}

/**
 * disableIntervals
 * 
 * Disables both interval timers.
 * 
 */
function disableIntervals() {
    intervalHandle.clear("question");
    intervalHandle.clear("answer");
}

/**
 * deleteChildren
 * 
 * My version of JS erase
 * 
 * @param {DOMObject} domObject 
 */
function deleteChildren(domObject) {
    while (domObject.firstChild) {
        domObject.removeChild(domObject.firstChild);
    }
}

/**
 * Displays whether the answer is correct/incorrect for selected answer
 * 
 * @param {bool} isCorrect 
 */

async function displayAnswer(domObject, isCorrect) {
    deleteChildren(domObject);

    let timeout = new Timeout(3000.0);

    domObject.appendChild(document.createElement("hr"));
    var p = document.createElement("p");
    if (isCorrect) {
        p.textContent = "Correct!"
    }
    else {
        p.textContent = "Incorrect!";
    }
    p.style = "color: gray; font-style: italic;";

    domObject.appendChild(p);
    domObject.setAttribute("class", "answer-question");

    await timeout.then(() => {
        deleteChildren(domObject);
    });
}

/**
 * Display the question in the title area and populates the choices area with the choices buttons
 * 
 * @param {number} index Of the question in the questions array
 */

function displayQuestion(index) {
    if (index >= questions.length) {
        return;
    }

    titleEl.textContent = questions[index].title;

    deleteChildren(choicesEl);

    let ul = document.createElement("ul");
    ul.style = "list-style-type: none;"
    for (var i = 0; i < questions[index].choices.length; ++i) {
        let li = document.createElement("li");
        li.style = "text-align:left;"
        let button = document.createElement("button");
        button.setAttribute("id", i);
        button.textContent = "".concat(i + 1, ". ", questions[index].choices[i]);
        button.addEventListener("click", async function (event) {
            if (parseInt(event.target.id) === questions[index].answer) {
                await displayAnswer(answerEl, true);
            }
            else {
                totalTime -= 10;
                if (totalTime < 0) {
                    totalTime = 0;
                }
                await displayAnswer(answerEl, false);
            }

            if (totalTime > 0) {
                ++index;
                if (index < questions.length) {
                    displayQuestion(index);
                }
                else {
                    disableIntervals();
                    initAllDone();
                }
            }
            else {
                initGameOver();
            }
        });
        ul.appendChild(li);
        li.appendChild(button);
    }
    choicesEl.appendChild(ul);
    choicesEl.setAttribute("class", "justify-left");
}

/**
 * Setup the state of the DOM when the timer runs out i.e. "Game Over" without a score.
 */
function initGameOver() {
    initCodingQuizChallenge();
}

/**
 * Setup the initial "Questions" state of the DOM and starts the process of an event
 * driven question array traversal with the opportunity to select the correct answer.
 */
function initQuestions() {
    displayHighScores(false);
    displayTime(true);
    deleteChildren(answerEl);
    displayQuestion(0);
}

/**
 * Setup the initial DOM state when there is a positive score.  Provies an opportunity
 * to put their initials on the scoreboard.
 */
function initAllDone() {
    titleEl.textContent = "All done!";

    deleteChildren(choicesEl);
    deleteChildren(answerEl);

    displayTime(false);
    displayHighScores(false);

    let p = document.createElement("p");
    p.textContent = "Your final score is ".concat(totalTime.toString(), ".");
    choicesEl.appendChild(p);

    let label = document.createElement("label");
    label.setAttribute("for", "initials_input");
    label.textContent = "Enter initials: ";

    let input = document.createElement("input");
    input.setAttribute("placeholder", "Enter initials.");
    input.setAttribute("id", "initials_input");
    input.setAttribute("type", "text");
    input.setAttribute("style", "margin-bottom: 0.5em;")
    let submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.setAttribute("style", "font-size: 1em;");

    submit.addEventListener("click", function (event) {
        let regexp = /^[A-Za-z]+$/;
        if (input.value !== "" && regexp.test(input.value)) {
            let value = input.value.trim().toUpperCase();
            scores.push({ initials: value, score: totalTime });
            localStorage.setItem("scores", JSON.stringify(scores));
            initHighScores();
        }
        else {
            input.value = "";
            alert("Initials must be letters of the alphabet!");
        }
    });

    answerEl.setAttribute("class", "justify-left");
    answerEl.appendChild(label);
    answerEl.appendChild(input);
    answerEl.appendChild(submit);
}

/**
 * Setup the DOM state for the high scores list.
 */
function initHighScores() {
    titleEl.textContent = "High Scores";

    deleteChildren(choicesEl);
    deleteChildren(answerEl);

    displayTime(false);
    displayHighScores(false);

    scores.sort(function (a, b) {
        return b.score - a.score;
    });

    var ul = document.createElement("ul");
    ul.style = "width: 100%; list-style-type: none;"
    for (var i = 0; i < scores.length; ++i) {
        var li = document.createElement("li");
        li.style = "width: 100%; background-color: lavender;"
        li.setAttribute("class", "justify-left");
        var p = document.createElement("p");
        p.textContent = (i + 1).toString().concat(". ", scores[i].initials, " - ", scores[i].score);
        p.setAttribute("style", "width: 100%; padding: 0.25em; margin: 0.125em;")
        li.appendChild(p);
        ul.appendChild(li);
    }
    choicesEl.appendChild(ul);
    choicesEl.removeAttribute("class");

    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go Back";
    goBackButton.addEventListener("click", function () {
        initCodingQuizChallenge();
    });
    var clearHighScoresButton = document.createElement("button");
    clearHighScoresButton.textContent = "Clear High Scores";
    clearHighScoresButton.addEventListener("click", function () {
        scores = [];
        localStorage.removeItem("scores");
        deleteChildren(choicesEl);
    });
    answerEl.appendChild(goBackButton);
    answerEl.appendChild(clearHighScoresButton);
}

/**
 * Setup the DOM state for the initial Quiz Challenge screen
 */
function initCodingQuizChallenge() {
    titleEl.textContent = "Coding Quiz Challenge";

    deleteChildren(choicesEl);
    deleteChildren(answerEl);

    totalTime = 0;

    displayTime(true);
    displayHighScores(true);

    totalTime = questions.length * 15;

    choicesEl.innerHTML =
        "<p>Try to answer the following code-related questions within the time limit.</p>" +
        "<p>Keep in mind that incorrect answer will penalize your score/time by ten seconds!</p>";
    choicesEl.setAttribute("class", "justify-center");

    var button = document.createElement("button");
    button.textContent = "Start Quiz";
    button.addEventListener("click", function () {
        intervalHandle.reset("question", 1000.0, function () {
            if (totalTime > 0) {
                totalTime--;
                displayTime(true);
            }
            else {
                disableIntervals();
                initGameOver();
            }
        });

        /* Start the question/answer segment */
        initQuestions();
    });
    answerEl.appendChild(button);
    answerEl.setAttribute("class", "justify-center");
}


initCodingQuizChallenge();