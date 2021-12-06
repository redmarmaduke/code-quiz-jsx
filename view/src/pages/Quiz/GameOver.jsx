import React, { useState, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';

import Title from '../../components/Title';

import { useTimeContext, ADD_SCORE } from '../../components/TimeProvider';

function GameOver() {
    const [{ quiz }, dispatch] = useTimeContext();
    const [redirect, setRedirect] = useState(false);
    const ref = useRef();

    return (
        redirect ?
            <Navigate to="/highscores" />
            :
            <div style={{
                width: "50%",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
                padding: "2em 0 0 0"
            }}>
                <Title>Game Over!</Title>
                {
                    quiz.time > 0 ?
                        <>
                            <Title>Your final score is: {quiz.time} </Title>
                            <label htmlFor="initials_input">Enter initials:</label>
                            <input id="initials_input" type="text" ref={ref} style={{ marginBottom: "0.5em" }} onChange={() => {
                                ref.current.value = ref.current.value.toUpperCase().replace(/[^A-Z]/g, "").substr(0, 3);
                            }} />
                            <button style={{ fontSize: "1em" }} onClick={() => {
                                dispatch({ type: ADD_SCORE, payload: { initials: ref.current.value, score: quiz.time } });
                                setRedirect(true);
                            }}>Submit</button>
                        </>
                        :
                        <>
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
        );
    /*
    <Title>Your final score is: {quiz.time} </Title>
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
    </>); */
}

export default GameOver;
