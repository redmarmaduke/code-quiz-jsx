import React from 'react';

const ADD_SCORE = "addScore";

const START_QUIZ = "startQuiz";
const STOP_QUIZ = "stopQuiz";
const NEXT_QUESTION = "nextQuestion";
const SET_INTERVAL_CALLBACK = "setIntervalCallback";
const SET_TIMEOUT_CALLBACK = "setTimeoutCallback";
const SET_TIME = "setTime";
const SET_INTERVAL = "setInterval";
const SET_TIMEOUT = "setTimeout";

const GET_INTERVAL_CALLBACK = "getIntervalCallback";
const GET_TIMEOUT_CALLBACK = "getTimeoutCallback";
const GET_TIME = "getTime";
const GET_INTERVAL = "getInterval";
const GET_TIMEOUT = "getTimeout";

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


var TimeContext = React.createContext([0]);

class TimeProvider extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            quiz: {
                is: { stopped: true },
                time: 30,
                question: null,
                questionIndex: 0
            },
            highscores: []
        };

        this.timeout = 30;
        this.handle = null;
        this.timeoutCallback = () => { };
        this.intervalCallback = () => { };
        this.questionIndex = 0;
    }

    dispatch(action) {
        function callback() {
            if (window.location.pathname !== '/quiz' || (this.state.quiz.is.started && this.state.quiz.time <= 1)) {
                console.log("CLEAR", this.handle);
                clearInterval(this.handle);
                this.handle = null;

                this.timeoutCallback();
                this.setState((state) => {
                    return {
                        ...state,
                        quiz: {
                            ...state.quiz,
                            is: { stopped: true },
                            question: null,
                            time: 0
                        }
                    };
                });
            }
            else {
                this.intervalCallback();
                this.setState((state) => (
                    {
                        ...state,
                        quiz: {
                            ...state.quiz,
                            time: state.quiz.time - 1
                        }
                    }
                ));
            }
        }

        function stopState(state) {
            return {
                ...this.state,
                quiz: {
                    ...this.state.quiz,
                    is: { stopped: true },
                    question: null
                }
            };
        }

        switch (action.type) {
            case ADD_SCORE:
                this.setState((state) => {
                    console.log(action.payload)
                    return {
                        ...state,
                        highscores: [...state.highscores, action.payload]
                    };
                });
                break;
            case START_QUIZ:
                console.log("START_QUIZ");
                // if handle exists ignore start
                if (this.handle !== null) {
                    return;
                }
                this.handle = setInterval(callback.bind(this), 1000);
                this.setState((state) => ({
                    ...state,
                    quiz: {
                        ...state.quiz,
                        is: { started: true },
                        time: 30,
                        question: questions[0]
                    }
                }));
                break;
            case STOP_QUIZ:
                if (this.handle === null && this.state.time === 0) {
                    return;
                }
                clearInterval(this.handle);
                this.handle = null;
                this.setState(stopState);
                break;
            case NEXT_QUESTION:
                if (this.state.quiz.questionIndex >= questions.length - 1) {
                    // next question will be out of range, set to stopped
                    clearInterval(this.handle);
                    this.handle = null;
                    this.setState(stopState);
                }
                else {
                    // set question to next question
                    this.setState((state) => ({
                        ...state,
                        quiz: {
                            ...state.quiz,
                            question: questions[state.quiz.questionIndex + 1],
                            questionIndex: state.quiz.questionIndex + 1
                        }
                    }));
                }
                break;
            case SET_TIME:
                if (typeof action.payload === 'number') {
                    // immediately take appropriate actions time time has been set to 0
                    callback.bind(this)();
                    this.setState((state) => ({
                        ...state,
                        quiz: {
                            ...state.quiz,
                            time: action.payload < 0 ? 0 : action.payload
                        }
                    }));
                }
                break;
            case SET_INTERVAL_CALLBACK:
                if (typeof action.payloud === 'function') {
                    this.intervalCallback = action.payload;
                }
                break;
            case SET_TIMEOUT_CALLBACK:
                if (typeof action.payloud === 'function') {
                    this.timeoutCallback = action.payload;
                }
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <TimeContext.Provider value={[this.state, this.dispatch.bind(this)]}>
                {this.props.children}
            </TimeContext.Provider>
        );
    }
}

var useTimeContext = function () {
    return React.useContext(TimeContext);
}

var Time = function (props) {
    return (
        <div>
            <TimeContext.Consumer>
                {([{ quiz: { time } }]) => <div>Time: {time}</div>}
            </TimeContext.Consumer>
        </div>);
}

export {
    TimeProvider, useTimeContext, Time,
    ADD_SCORE,
    START_QUIZ,
    STOP_QUIZ,
    NEXT_QUESTION,
    SET_INTERVAL_CALLBACK,
    SET_TIMEOUT_CALLBACK,
    SET_TIME,
    SET_INTERVAL,
    SET_TIMEOUT,
    GET_INTERVAL_CALLBACK,
    GET_TIMEOUT_CALLBACK,
    GET_TIME,
    GET_INTERVAL,
    GET_TIMEOUT,
};
