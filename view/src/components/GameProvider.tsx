import React, {useReducer} from 'react';

export type GameProviderDispatchAction = {
  type: string;
  payload?: unknown;
};

const GameContext = React.createContext<
  [Score[], React.Dispatch<GameProviderDispatchAction>]
>([[], () => null]);

/**
 * @class Score
 * @classdesc structure for highscores data
 */
class Score {
  _initials: string;
  _score: number;

  /**
   * @constructor
   * @param {string} initials
   * @param {number} score
   */
  constructor(initials: string, score: number) {
    if (typeof initials === 'string') {
      initials = initials.toUpperCase();
      if (initials.length > 3) {
        this._initials = initials.substr(0, 3);
      } else {
        this._initials = initials;
      }
    } else {
      this._initials = '';
    }
    this._score = typeof score === 'number' && score >= 0 ? score : 0;
  }

  /**
   * getInitials
   * @return {string} initials
   */
  getInitials() {
    return this._initials;
  }

  /**
   * getScore
   * @return {number} score
   */
  getScore() {
    return this._score;
  }
}

/**
 * GameProvider
 * @param {React.PropsWithChildren} props
 * @return {JSX.Element}
 */
function GameProvider(props: React.PropsWithChildren) {
  const [state, dispatch] = useReducer<(
      state: Score[], action: { type: string; score?: Score }) => Score[]
      >(
      function(state, action) {
        switch (action.type) {
          case 'add': {
            if (!(action.score instanceof Score)) {
              throw new Error('score is not instance of Score class!');
            }
            // make a shallow copy of the old state
            let newState = [...state];
            // add the score to the new state
            newState.push(action.score);
            // sort the scores in descending order
            newState.sort((a, b) => b.getScore() - a.getScore());
            // only 10 scores are permitted
            newState = newState.slice(0, 11);
            return newState;
          }

          case 'clear':
            return [];
          default:
            return state;
        }
      },
      [new Score('MSN', 1000)],
      );

  return (
    <GameContext.Provider value={[state, dispatch]}>
      {props.children}
    </GameContext.Provider>
  );
}

const useGameContext = function() {
  return React.useContext(GameContext);
};

export {GameProvider, useGameContext, Score};
