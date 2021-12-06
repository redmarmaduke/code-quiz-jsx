import React, { useEffect } from 'react';

import NavBar from '../../components/NavBar';
import Question from './Question';
import GameOver from './GameOver';

import { useTimeContext, START_QUIZ } from '../../components/TimeProvider';

function Quiz(props) {
    const [{ quiz }, dispatch] = useTimeContext();

    useEffect(() => {
            dispatch({ type: START_QUIZ });
    }, []);

    return (

        <div>
            {
                quiz.is.started ? <NavBar showTime /> : <NavBar />
            }            
            {
                quiz.question ? <Question question={quiz.question} /> : <GameOver />
            }
        </div >
    );
}

export default Quiz;