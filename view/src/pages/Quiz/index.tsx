import { useEffect } from "react";

import NavBar from "../../components/NavBar";
import Question from "./Question";
import GameOver from "./GameOver";

import useInterval from "../../components/useInterval";

import { START_QUIZ, STOP_QUIZ, DECREMENT_TIME } from "../../components/TimeProvider.d";
import { useTimeContext } from "../../components/TimeProvider";

function Quiz() {
  const [{ quiz }, dispatch] = useTimeContext();

  const clearInterval = useInterval(() => {
    if (quiz.time < 1) {
      clearInterval();
      dispatch({ type: STOP_QUIZ });
    } else if (!quiz.is.stopped) {
      dispatch({ type: DECREMENT_TIME });
    }
  }, 1000, [ quiz.time, quiz.is.stopped ]);

  useEffect(() => {
    dispatch({ type: START_QUIZ });

    return () => clearInterval();
  }, []);

  return (
    <div>
      <NavBar/>
      {quiz.question ? <Question /> : <GameOver />}
    </div>
  );
}

export default Quiz;
