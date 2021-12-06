import React from 'react';

import Title from '../../components/Title';

import { useTimeContext, SET_TIME, NEXT_QUESTION } from '../../components/TimeProvider';


function Question() {
    const [{ quiz }, dispatch] = useTimeContext();

    return (
        <div>
            <Title>{quiz.question.title}</Title>
            <div className="justify-center">
                <ul className="justify-left" style={{ width: "100%", backgroundColor: "black", listStyleType: "none" }}>
                    {
                        quiz.question.choices.map(function (answer, index) {
                            return (
                                <li key={index} style={{ textAlign: "left" }}>
                                    <button index={index} onClick={function (e) {
                                        console.log(e.target.attributes.index.value, index, quiz.question.answer);
                                        if (parseInt(e.target.attributes.index.value) !== quiz.question.answer) {
                                            dispatch({ type: SET_TIME, payload: quiz.time - 10 });
                                        }
                                        dispatch({ type: NEXT_QUESTION });
                                    }}>{`${index + 1}. ` + answer}</button>
                                </li>);
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Question;