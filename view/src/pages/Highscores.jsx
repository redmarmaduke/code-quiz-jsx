import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../components/Title';

import { useGameContext } from '../components/GameProvider';

function Highscores() {
    var [scores, dispatch] = useGameContext();
    return (
        <div>
            <Title>HighGame</Title>
            <div className="justify-center">
                <ul style={{ width: "100%", listStyleType: "none" }}>
                    {scores.map((score, i) => {
                        return (<li className="justify-left" key={i} style={{ width: "100%", backgroundColor: "lavender" }}>
                            <p style={{ width: "100%", padding: "0.25em", margin: "0.125em" }}>
                                {(i + 1).toString().concat(". ", score.getInitials(), " - ", score.getScore())}
                            </p>
                        </li>);
                    })}
                </ul>
                <Link to="/">
                    <button onClick={() => {
                        console.log("Go Back!");
                    }}>
                        Go Back
                    </button>
                </Link>
                <button onClick={() => {
                    dispatch({ type: 'clear' });
                }}>
                    Clear Game
                </button>
            </div>
        </div>
    );
}

export default Highscores;