import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";

import { SET_TIME, NEXT_QUESTION, TimeProviderQuestion } from "../../components/TimeProvider.d";
import { useTimeContext } from "../../components/TimeProvider";
import { Checkbox } from "@mui/material";
import React from "react";

// list 1 of many
// confirm Y/N
// checkbox any of many

type AnswerValue = string | number | boolean | undefined;
type AnswerType = AnswerValue | AnswerValue[];

type AnswerProps = React.PropsWithChildren & {
  question?: TimeProviderQuestion;
  onAnswer?: (answer: { [key:string]: AnswerType}) => void;
};

function ListAnswers({ question, onAnswer }: AnswerProps) {
  if (!question) {
    return <></>;
  }

  return (
    <FormControl>
      <FormLabel id="list-question">{question?.message ?? "ERROR: Question missing."}</FormLabel>
      <RadioGroup
        aria-labelledby="list-question"
        name="list-controlled-radio-buttons-group"
        value={question?.default}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onAnswer?.({[question?.name]: e.target.value});
        }}
      >
        {question?.choices.map(function (choice, index) {
          return (
            <FormControlLabel key={index} value={index} control={<Radio />} label={choice} />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

function ConfirmAnswers({ question, onAnswer }: AnswerProps) {
  if (!question) {
    return <></>;
  }
  return (
    <FormControl>
      <FormLabel id="confirm-question">{question?.message ?? "ERROR: Question missing."}</FormLabel>
      <RadioGroup
        aria-labelledby="confirm-question"
        name="confirm-controlled-radio-buttons-group"
        value={question?.default}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
          onAnswer?.({[question?.name]: e.target.value === "true"})}
      >
        {[true, false].map(function (answer, index) {
          return (
            <FormControlLabel key={index} value={answer} control={<Radio />} label={answer ? "Yes" : "No"} />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

function CheckboxAnswers({ question, onAnswer }: AnswerProps) {
  const [answers, setAnswers] = React.useState({});

  if (!question) {
    return <></>;
  }
  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.checked
    })
  };

  return (
    <FormControl>
      <FormLabel id="checkbox-question">{question?.message ?? "ERROR: Question missing."}</FormLabel>
      <FormGroup
        aria-labelledby="checkbox-question"
      >
        {question?.choices.map(function (choice, index) {
          return (
            <FormControlLabel key={index} control={<Checkbox onChange={changeHandler} name={choice}/>} label={choice} />
          );
        })}
      </FormGroup>
      <Button type="submit" onSubmit={(event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const answerArray = Object.entries(answers).filter(([, value]) => !!value).map(([key]) => key);
        onAnswer?.({[question.name]: answerArray});
      }}>Submit</Button>
    </FormControl>
  );
}

function Question() {
  const [{ quiz }, dispatch] = useTimeContext();

  if (!quiz.question) {
    return <></>;
  }

  let component: JSX.Element;

  const name : string = quiz.question?.name;

  switch (quiz.question?.type) {
    case "list":
      component = (
        <ListAnswers question={quiz.question} onAnswer={(answer) => {
          if (answer[name] !== quiz.question?.answer) {
            dispatch({ type: SET_TIME, payload: quiz.time - 10 });
          }
          dispatch({ type: NEXT_QUESTION });
        }} />
      );
      break;
    case "confirm":
      component = (
        <ConfirmAnswers question={quiz.question} onAnswer={(answer) => {
          if (answer[name] !== quiz.question?.answer) {
            dispatch({ type: SET_TIME, payload: quiz.time - 10 });
          }
          dispatch({ type: NEXT_QUESTION });
        }} />
      );
      break;
    case "checkbox":
      component = (
        <CheckboxAnswers question={quiz.question} onAnswer={(answer) => {
          const sortCallback = (a : AnswerValue,b: AnswerValue) => {
            if (a === b) {
              return 0;
            }
            if (typeof a === 'undefined') {
              return -1;
            }
            else if (typeof b === 'undefined') {
              return 1;
            }
            return a.toString().localeCompare(b.toString());
          };

          const answerArray = answer[name] instanceof Array ? answer[name].sort(sortCallback);
          const referenceArray = (quiz.question?.answer as AnswerValue[]).sort(sortCallback);
          const isSame = answerArray.every((value, index) => {
            return referenceArray[index] = value;
          });

          if (!isSame) {
            dispatch({ type: SET_TIME, payload: quiz.time - 10 });
          }
          dispatch({ type: NEXT_QUESTION });
        }}/>
      );
      break;
    default:
      component = <></>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 4
      }}>
      {component}
    </Box>
  );
}

export default Question;
