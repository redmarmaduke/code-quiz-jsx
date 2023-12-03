import React from 'react';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import {AnswerProps} from './index.d';

import generateKey from './generateKey';

/**
 * @param {TimeProviderQuestion} question
 * @param {function} onAnswer
 * @return {void}
 */
export default function ConfirmAnswers({question, onAnswer}: AnswerProps) {
  if (!question) {
    return <></>;
  }
  return (
    <FormControl>
      <FormLabel id="confirm-question">
        {question?.message ?? 'ERROR: Question missing.'}
      </FormLabel>
      <RadioGroup
        aria-labelledby="confirm-question"
        name="confirm-controlled-radio-buttons-group"
        value={question?.default}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log('ConfirmAnswers::onChange');
          onAnswer?.({[question?.name]: e.target.value === 'true'});
        }
        }
      >
        {[true, false].map(function(answer, index) {
          return (
            <FormControlLabel
              key={generateKey(`confirm-${index}`)}
              value={answer}
              control={<Radio />}
              label={answer ? 'Yes' : 'No'}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

