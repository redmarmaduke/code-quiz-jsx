import React from 'react';
import { Link } from 'react-router-dom';

//import Time from './Time';
import { Time } from './TimeProvider';

function NavBar(props) {
    return (
        <div style={{
            height: "20%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
        }}>
            {
                "showHighscores" in props ? <div id="highscores">
                    <Link to="/highscores">high scores</Link>
                </div> : <div></div>
            }
            {
                "showTime" in props ?
                    <Time />
                : <div></div>
            }
        </div>
    );
}

export default NavBar;