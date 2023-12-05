import {Link} from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import QuizIcon from '@mui/icons-material/Quiz';

import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

// import Time from './Time';
import {useTimeContext} from './TimeProvider';

/**
 * Progress Component
 * @param {CircularProgressProps} props
 * @return {JSX.Element}
 */
function Progress(props: CircularProgressProps) {
  const [{quiz: {time}}] = useTimeContext();
  const value = ((30-time)/30)*100;
  return (
    <Box sx={{position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant="determinate"
        {...props} value={value} style={{color: 'white'}}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          component="div"
          color="primary.contrastText"
        >{`${Math.round(time)}`}</Typography>
      </Box>
    </Box>
  );
}

/**
 * NavBar Component
 * @return {JSX.Element}
 */
function NavBar() {
  const [{quiz: {is: {stopped}}}] = useTimeContext();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <QuizIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Quiz
          </Typography>
          { stopped ? <Button color="inherit"
            component={Link} to="/highscores">High Scores</Button> : <></> }
          { !stopped ? <Progress /> : <div></div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
