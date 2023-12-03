import React from "react";
import {
  ADD_SCORE,
  START_QUIZ,
  STOP_QUIZ,
  NEXT_QUESTION,
  SET_TIME,
  DECREMENT_TIME,
} from "./TimeProvider.d";

import type {
  TimeProviderHighscore,
  TimeProviderState,
  TimeProviderDispatchAction,
  TimeProviderQuestion,
} from "./TimeProvider.d";

const questions : TimeProviderQuestion[] = [
/*  {
    type: "confirm",
    message:
      "Yes or No (Hint Yes):",
    answer: true,
    name: "yesorno",
  },
  {
    type: "checkbox",
    message:
      "You must choose A and B:",
    choices: ["A", "B", "C"],
    answer: ["A","B"],
    name: "checkbox",
  }, */
  {
    type: "list",
    message: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: 2,
    name: "q1",
  },
  {
    type: "list",
    message: "The condition in an if else statement is enclosed within _______?",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: 2,
    name: "q2",
  },
  {
    type: "list",
    message: "Arrays in JavaScript can be used to store _______.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: 3,
    name: "q3",
  },
  {
    type: "list",
    message:
      "String values must be enclosed within  _______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: 2,
    name: "q4",
  },
  {
    type: "list",
    message:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: 3,
    name: "q5",
  },
  {
    type: "confirm",
    message:
      "Yes or No (Hint Yes):",
    answer: true,
    name: "q6",
  },
  {
    type: "checkbox",
    message:
      "You must choose A and B:",
    choices: ["A", "B", "C"],
    answer: ["A","B"],
    name: "q7",
  },
];

function reducer(
  state: TimeProviderState,
  action: TimeProviderDispatchAction
): TimeProviderState {
  const stopQuiz = (state : TimeProviderState) => ({
      ...state,
      quiz: {
        ...state.quiz,
        is: { stopped: true },
        question: null,
        questionIndex: -1,
      }
  });

  switch (action.type) {
    case ADD_SCORE: {
      const highscore = action.payload as TimeProviderHighscore;
      console.log("ADD_SCORE", highscore);
      return {
        ...state,
        highscores: [...state.highscores, highscore],
      };
    }
    case START_QUIZ:
      console.log("START_QUIZ");
      if (!state.quiz.is.stopped) {
        console.log("Already started!");
        return state;
      }
      return {
        ...state,
        quiz: {
          ...state.quiz,
          is: { stopped: false },
          time: 30,
          question: questions[0],
        },
      };
    case STOP_QUIZ:
      console.log("STOP QUIZ");
      return stopQuiz(state);
    case NEXT_QUESTION:
      console.log("NEXT QUESTION");
      // if end of quiz the end
      if (state.quiz.questionIndex >= questions.length - 1) {
        return stopQuiz(state);
        // else increment question
      } else {
        return {
          ...state,
          quiz: {
            ...state.quiz,
            question: questions[state.quiz.questionIndex + 1],
            questionIndex: state.quiz.questionIndex + 1,
          },
        };
      }
    case DECREMENT_TIME:
      console.log("DECREMENT_TIME");
      // if time then increment time
      if (state.quiz.time > 0) {
        return {
          ...state,
          quiz: {
            ...state.quiz,
            time: state.quiz.time - 1,
          },
        };  
      }
      // else if time <= 0 then stop quiz
      else {
        return stopQuiz(state);
      }
  case SET_TIME:
      if (typeof action.payload === "number") {
        // immediately take appropriate action if time has been set to 0
        return {
          ...state,
          quiz: {
            ...state.quiz,
            time: action.payload < 0 ? 0 : action.payload,
          },
        };
      }
      return state;
    default:
      return state;
  }
}

const initialState: TimeProviderState = {
  quiz: {
    is: { stopped: true },
    time: 30,
    question: null,
    questionIndex: 0,
  },
  highscores: [],
};

const TimeContext = React.createContext<
  [TimeProviderState, React.Dispatch<TimeProviderDispatchAction>]
>([initialState, () => null]);

function TimeProvider(props: React.PropsWithChildren) {
  const [state, dispatch] = React.useReducer<
    (
      state: TimeProviderState,
      action: TimeProviderDispatchAction
    ) => TimeProviderState
  >(reducer, initialState);

  return (
    <TimeContext.Provider value={[state, dispatch]}>
      {props.children}
    </TimeContext.Provider>
  );
}

const useTimeContext = function () {
  return React.useContext(TimeContext);
};


const Time = function () {
  return (
    <div>
      <TimeContext.Consumer>
        {([
          {
            quiz: { time },
          },
        ]) => <div>Time: {time}</div>}
      </TimeContext.Consumer>
    </div>
  );
};

export { TimeProvider, useTimeContext, Time };
