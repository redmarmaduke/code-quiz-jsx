import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import Title from '../components/Title';

import {useTimeContext} from '../components/TimeProvider';

import generateKey from './Quiz/Question/generateKey';

/**
 * Highscores
 * @return {JSX.Element}
 */
function Highscores() {
  const [{highscores}, dispatch] = useTimeContext();
  return (
    <div>
      <Title>High Scores</Title>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell align="right">Initials</TableCell>
                  <TableCell align="right">Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {highscores.map((score, i) => {
                  return (
                    <TableRow key={generateKey(`highscore-${i}`)}>
                      <TableCell>
                        {i+1}
                      </TableCell>
                      <TableCell align="right">
                        {score.initials}
                      </TableCell>
                      <TableCell align="right">
                        {score.score}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              component={Link}
              to="/"
              onClick={() => {
                console.log('Go Back!');
              }}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                dispatch({type: 'clear'});
              }}
            >
              Clear Game
            </Button>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default Highscores;
