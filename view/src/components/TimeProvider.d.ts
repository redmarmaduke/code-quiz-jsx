export const ADD_SCORE = "addScore";
export const START_QUIZ = "startQuiz";
export const STOP_QUIZ = "stopQuiz";
export const NEXT_QUESTION = "nextQuestion";
export const SET_INTERVAL_CALLBACK = "setIntervalCallback";
export const SET_TIMEOUT_CALLBACK = "setTimeoutCallback";
export const SET_TIME = "setTime";
export const DECREMENT_TIME = "DECREMENT_TIME";
export const SET_INTERVAL = "setInterval";
export const SET_TIMEOUT = "setTimeout";

export const GET_INTERVAL_CALLBACK = "getIntervalCallback";
export const GET_TIMEOUT_CALLBACK = "getTimeoutCallback";
export const GET_TIME = "getTime";
export const GET_INTERVAL = "getInterval";
export const GET_TIMEOUT = "getTimeout";

export type TimeProviderHighscore = {
  score: number;
  initials: string;
};

export type TimeProviderDispatchAction = {
  type: string;
  payload?: unknown;
};

export type TimeProviderQuestion = {
  type: "list"|"confirm"|"checkbox";
  message: string;
  choices?: string[];
  name: string;
  default?: string | number | boolean;
  answer: string | number | boolean | (string | number | boolean)[];
};

export type TimeProviderStateQuiz = {
  is: { stopped: boolean };
  time: number;
  question: TimeProviderQuestion | null;
  questionIndex: number;
};

export type TimeProviderState = {
  quiz: TimeProviderStateQuiz;
  highscores: TimeProviderHighscore[];
};
