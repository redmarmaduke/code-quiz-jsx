import React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import {AnswerProps} from './index.d';

import generateKey from './generateKey';

/**
 * @param {TimeProviderQuestion} question
 * @param {function} onAnswer
 * @return {JSX.Element}
 */
export default function CheckboxAnswers({question, onAnswer}: AnswerProps) {
  const [answers, setAnswers] = React.useState<{ [key: string]: boolean}>({});

  if (!question?.choices) {
    return <></>;
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((answers) => ({
      ...answers,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const answerArray = Object.entries(answers).filter(
          ([, value]) => !!value).map(([key]) => key,
      );
      onAnswer?.({[question.name]: answerArray});
    }}>
      <FormControl>
        <FormLabel id="checkbox-question">
          {question?.message ?? 'ERROR: Question missing.'}
        </FormLabel>
        <FormGroup
          aria-labelledby="checkbox-question"
        >
          {question?.choices?.map(function(choice, index) {
            return (
              <FormControlLabel
                key={generateKey(`checkbox-${index}`)}
                control={
                  <Checkbox onChange={changeHandler}
                    name={choice} checked={answers[choice]}/>
                } label={choice} />
            );
          })}
        </FormGroup>
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
}
