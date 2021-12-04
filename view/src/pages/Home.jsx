import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Title from '../components/Title';

function Home() {
    return (<div>
        <NavBar showHighscores />
        <div style={{
            width: "50%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
            padding: "2em 0 0 0"
        }}>
            <Title>Coding Quiz Challenge</Title>
            <div className="justify-center">
                <div style={{
                    marginBottom: "1em"
                }}>
                    <p>Try to answer the following code-related questions within the time limit.</p>
                    <p>Keep in mind that incorrect answer will penalize your score/time by ten seconds!</p>
                </div>
                <Link to="/quiz">
                    <button onClick={function () {
                        console.log("Start Quiz Button");
                    }}>
                        Start Quiz
                    </button>
                </Link>
            </div>
        </div>
    </div>);
}

export default Home;