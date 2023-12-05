import Box from '@mui/material/Box';

import CheckboxAnswers from './CheckboxAnswers';
import ListAnswers from './ListAnswers';
import ConfirmAnswers from './ConfirmAnswers';

import {useTimeContext} from '../../../components/TimeProvider';

import {PASS_QUESTION, FAIL_QUESTION} from '../../../components/TimeProvider.d';
import {AnswerValue} from './index.d';


/**
 * Question Component
 * @return {JSX.Element}
 */
function Question() {
  const [{quiz: {question = null}}, dispatch] = useTimeContext();
  if (!question) {
    return <></>;
  }

  let component: JSX.Element;

  const name: string = question?.name;

  switch (question?.type) {
    case 'list':
      component = (
        <ListAnswers question={question} onAnswer={(answer) => {
          if (answer[name] != question?.answer) {
            dispatch({type: FAIL_QUESTION});
          } else {
            dispatch({type: PASS_QUESTION});
          }
        }} />
      );
      break;
    case 'confirm':
      component = (
        <ConfirmAnswers question={question} onAnswer={(answer) => {
          if (answer[name] != question?.answer) {
            dispatch({type: FAIL_QUESTION});
          } else {
            dispatch({type: PASS_QUESTION});
          }
        }} />
      );
      break;
    case 'checkbox':
      component = (
        <CheckboxAnswers question={question} onAnswer={(answer) => {
          const sortCallback = (a: AnswerValue, b: AnswerValue) => {
            return JSON.stringify(a).localeCompare(JSON.stringify(b));
          };

          const userAnswers: AnswerValue[] =
            answer[name] && answer[name] instanceof Array ?
              answer[name] as AnswerValue[] :
              [];
          if (userAnswers.length === 0) {
            console.error('ERROR: checkbox question has no answers.');
          }
          userAnswers.sort(sortCallback);

          const referenceAnswers = (question?.answer as AnswerValue[]).
              sort(sortCallback);
          // determine if all the checkboxes match?
          const isCorrect = userAnswers.every((value, index) => {
            return referenceAnswers[index] == value;
          });

          // if all checkboxes do not match (ie. is not correct)
          // then penalize time
          if (!isCorrect) {
            dispatch({type: FAIL_QUESTION});
          } else {
            dispatch({type: PASS_QUESTION});
          }
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
