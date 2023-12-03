import { useEffect, useCallback } from "react";

import NavBar from "../../components/NavBar";
import Question from "./Question";
import GameOver from "./GameOver";

import useInterval from "../../components/useInterval";

import { START_QUIZ, DECREMENT_TIME } from "../../components/TimeProvider.d";
import { useTimeContext } from "../../components/TimeProvider";

function Quiz() {
  const [{ quiz }, dispatch] = useTimeContext();

  const cb = useCallback(() => {
    if (!quiz.is.stopped) {
      dispatch({ type: DECREMENT_TIME });
    }
  },[quiz.is.stopped, dispatch]);

  useInterval(cb, 1000);

  useEffect(() => {
    dispatch({ type: START_QUIZ });
  }, [dispatch]);

  return (
    <div>
      <NavBar/>
      {quiz.question ? <Question /> : <GameOver />}
    </div>
  );
}

export default Quiz;
