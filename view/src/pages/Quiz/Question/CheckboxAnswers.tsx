import React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import { AnswerProps } from './index.d';

import generateKey from './generateKey';

export default function CheckboxAnswers({ question, onAnswer }: AnswerProps) {
    const [answers, setAnswers] = React.useState({});
  
    if (!question?.choices) {
      return <></>;
    }
  
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("CheckboxAnswers::onChange");
      setAnswers({
        ...answers,
        [e.target.name]: e.target.checked,
      });
    };
  
    return (
      <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
  
        const answerArray = Object.entries(answers).filter(([, value]) => !!value).map(([key]) => key);
        console.log("CheckboxAnswers::onSubmit", answerArray);
        onAnswer?.({ [question.name]: answerArray });
      }}>
        <FormControl>
          <FormLabel id="checkbox-question">{question?.message ?? "ERROR: Question missing."}</FormLabel>
          <FormGroup
            aria-labelledby="checkbox-question"
          >
            {question?.choices?.map(function (choice, index) {
              return (
                <FormControlLabel key={generateKey(`checkbox-${index}`)} control={<Checkbox onChange={changeHandler} name={choice} />} label={choice} />
              );
            })}
          </FormGroup>
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    );
  }
