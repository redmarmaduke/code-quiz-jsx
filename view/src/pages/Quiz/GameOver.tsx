import {useState, useRef} from 'react';
import {Navigate, Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';

import Title from '../../components/Title';

import {ADD_SCORE} from '../../components/TimeProvider.d';
import {useTimeContext} from '../../components/TimeProvider';

/**
 * GameOver
 * @return {JSX.Element}
 */
function GameOver() {
  const [{quiz}, dispatch] = useTimeContext();
  const [redirect, setRedirect] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  return redirect ? (
    <Navigate to="/highscores" />
  ) : (
    <div
      style={{
        width: '50%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '2em 0 0 0',
      }}
    >
      <Title>Game Over!</Title>
      {quiz.time > 0 ? (
        <Stack display="flex" justifyContent={'center'} alignItems="center">
          <Title>Your final score is: {quiz.time} </Title>
          <label htmlFor="initials_input">Enter initials:</label>
          <input
            id="initials_input"
            type="text"
            ref={ref}
            style={{marginBottom: '0.5em'}}
            onChange={() => {
              (ref.current as HTMLInputElement).value =
                ref.current?.value
                    .toUpperCase()
                    .replace(/[^A-Z]/g, '')
                    .substr(0, 3) ?? '';
            }}
          />
          <Button
            variant="contained"
            style={{fontSize: '1em'}}
            onClick={() => {
              dispatch({
                type: ADD_SCORE,
                payload: {initials: ref.current?.value, score: quiz.time},
              });
              setRedirect(true);
            }}
          >
            Submit
          </Button>
        </Stack>
      ) : (
        <Button
          variant="contained"
          component={Link}
          to="/"
          onClick={() => {
            console.log('Go Back!');
          }}
          className="justify-center"
          style={{padding: '0px'}}
        >
          Go Back
        </Button>
      )}
    </div>
  );
}

export default GameOver;
