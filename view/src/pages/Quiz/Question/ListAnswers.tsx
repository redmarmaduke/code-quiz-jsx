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
 * @return {JSX.Element}
 */
export default function ListAnswers({question, onAnswer}: AnswerProps) {
  if (!question?.choices) {
    return <></>;
  }
  return (
    <FormControl>
      <FormLabel id="list-question">
        {question?.message ?? 'ERROR: Question missing.'}
      </FormLabel>
      {/* value must not be undefined else the component is uncontrolled */}
      <RadioGroup
        aria-labelledby="list-question"
        name={question?.name}
        value={question?.default ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onAnswer?.({[question?.name]: e.target.value});
        }}
      >
        {question?.choices.map(function(choice, index) {
          return (
            <FormControlLabel
              key={generateKey(`list-${index}`)}
              value={index}
              control={<Radio />}
              label={choice}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

