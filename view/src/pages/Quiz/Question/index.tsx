import Box from '@mui/material/Box';

import CheckboxAnswers from './CheckboxAnswers';
import ListAnswers from './ListAnswers';
import ConfirmAnswers from './ConfirmAnswers';

import {useTimeContext} from '../../../components/TimeProvider';

import {SET_TIME, NEXT_QUESTION} from '../../../components/TimeProvider.d';
import {AnswerValue} from './index.d';


/**
 * Question Component
 * @return {React.Component}
 */
function Question() {
  const [{quiz}, dispatch] = useTimeContext();
  if (!quiz.question) {
    return <></>;
  }

  console.log(quiz);

  let component: JSX.Element;

  const name: string = quiz.question?.name;

  switch (quiz.question?.type) {
    case 'list':
      component = (
        <ListAnswers question={quiz.question} onAnswer={(answer) => {
          if (answer[name] !== quiz.question?.answer) {
            dispatch({type: SET_TIME, payload: quiz.time - 10});
          }
          dispatch({type: NEXT_QUESTION});
        }} />
      );
      break;
    case 'confirm':
      component = (
        <ConfirmAnswers question={quiz.question} onAnswer={(answer) => {
          console.log(answer[name], name, quiz.question?.answer);
          if (answer[name] !== quiz.question?.answer) {
            dispatch({type: SET_TIME, payload: quiz.time - 10});
          }
          dispatch({type: NEXT_QUESTION});
        }} />
      );
      break;
    case 'checkbox':
      component = (
        <CheckboxAnswers question={quiz.question} onAnswer={(answer) => {
          const sortCallback = (a: AnswerValue, b: AnswerValue) => {
            return JSON.stringify(a).localeCompare(JSON.stringify(b));
          };

          const userAnswers: AnswerValue[] = answer[name] && answer[name] instanceof Array ? answer[name] as AnswerValue[] : [];
          if (userAnswers.length === 0) {
            console.error('checkbox');
          }
          userAnswers.sort(sortCallback);

          const referenceAnswers = (quiz.question?.answer as AnswerValue[]).sort(sortCallback);
          // determine if all the checkboxes match?
          const isCorrect = userAnswers.every((value, index) => {
            return referenceAnswers[index] == value;
          });

          // if all checkboxes do not match (ie. is not correct)
          // then penalize time
          if (!isCorrect) {
            dispatch({type: SET_TIME, payload: quiz.time - 10});
          }
          dispatch({type: NEXT_QUESTION});
        }} />
      );
      break;
    default:
      component = <>Malformed Question Object.</>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 4,
      }}>
      {component}
    </Box>
  );
}

export default Question;
