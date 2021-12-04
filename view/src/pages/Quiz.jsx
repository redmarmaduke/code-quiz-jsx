import React, { useState, useRef, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Title from '../components/Title';

import { useTimeContext, SET_TIMEOUT_CALLBACK, START_TIME, SET_TIME, PAUSE_TIME, STOP_TIME, IS_STARTED } from '../components/TimeProvider';
import { Score, useGameContext } from '../components/GameProvider';

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

function Quiz(props) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const ref = useRef();

    const [{time}, dispatch] = useTimeContext();
    const [, dispatchGame] = useGameContext();

    useEffect(() => {
        if (questionIndex === 0) {
            dispatch({
                type: SET_TIMEOUT_CALLBACK, payload: function () {
                    console.log("DONE!");
                }
            });
            dispatch({ type: SET_TIME, payload: 30 });
            dispatch({ type: START_TIME });
        }
    }, [questionIndex]);

    return (

        <div>
            {
                dispatch({ type: IS_STARTED }) ? <NavBar showTime /> : <NavBar />
            }
            {questions[questionIndex] && dispatch({ type: IS_STARTED }) ?
                <>
                    <Title>{questions[questionIndex]?.title}</Title>
                    <div className="justify-center">
                        <ul className="justify-left" style={{ width: "100%", backgroundColor: "black", listStyleType: "none" }}>
                            {
                                questions[questionIndex]?.choices.map(function (answer, index) {
                                    return (
                                        <li key={index} style={{ textAlign: "left" }}>
                                            <button index={index} onClick={function (e) {
                                                console.log(e.target.attributes.index.value, index, questions[questionIndex].answer);
                                                if (parseInt(e.target.attributes.index.value) !== questions[questionIndex].answer) {
                                                    dispatch({ type: SET_TIME, payload: time - 10 });
                                                }
                                                setQuestionIndex(questionIndex + 1);
                                            }}>{`${index + 1}. ` + answer}</button>
                                        </li>);
                                })
                            }
                        </ul>
                    </div>
                </> : (() => {
                    let score = dispatch({ type: PAUSE_TIME });

                    return !redirect ? <div
                        style={{
                            width: "50%",
                            margin: "auto",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignContent: "center",
                            padding: "2em 0 0 0"
                        }}>
                        {score > 0 ?
                            <>
                                <Title>Game Over!</Title>
                                <Title>Your final score is: {score} </Title>
                                <label htmlFor="initials_input">Enter initials:</label>
                                <input id="initials_input" type="text" ref={ref} style={{ marginBottom: "0.5em" }} onChange={() => {
                                    ref.current.value = ref.current.value.toUpperCase().replace(/[^A-Z]/g, "").substr(0, 3);
                                }} />
                                <button style={{ fontSize: "1em" }} onClick={() => {
                                    dispatchGame({ type: "add", score: new Score(ref.current.value, score) });
                                    setRedirect(true);
                                    dispatch({ type: STOP_TIME });
                                    setQuestionIndex(0);
                                }}>Submit</button>
                            </> :
                            <>
                                <Title>Game Over!</Title>
                                <Link to="/" style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <button onClick={() => {
                                        console.log("Go Back!");
                                    }} className='justify-center' style={{ padding: "0px" }}>
                                        Go Back
                                    </button>
                                </Link>
                            </>
                        }
                    </div>
                        :
                        <Navigate to="/highscores" />;
                })()
            }
        </div >
    );
}

export default Quiz;