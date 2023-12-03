import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";

import { SET_TIME, NEXT_QUESTION, TimeProviderQuestion } from "../../../components/TimeProvider.d";
import { useTimeContext } from "../../../components/TimeProvider";
import { Checkbox } from "@mui/material";
import React from "react";

// list 1 of many
// confirm Y/N
// checkbox any of many

type AnswerValue = string | number | boolean;
type AnswerType = AnswerValue | AnswerValue[] | undefined;

type AnswerProps = React.PropsWithChildren & {
  question?: TimeProviderQuestion;
  onAnswer?: (answer: { [key: string]: AnswerType }) => void;
};

function generateKey(prefix : string) {
  return `${prefix}-${Date.now()}`;
}

function ListAnswers({ question, onAnswer }: AnswerProps) {
  if (!question?.choices) {
    return <></>;
  }
  console.log("List: ",question);
  return (
    <FormControl>
      <FormLabel id="list-question">{question?.message ?? "ERROR: Question missing."}</FormLabel>
      <RadioGroup
        aria-labelledby="list-question"
        name={question?.name}
        value={question?.default}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onAnswer?.({ [question?.name]: e.target.value });
        }}
      >
        {question?.choices.map(function (choice, index) {
          return (
            <FormControlLabel key={generateKey(`list-${index}`)} value={index} control={<Radio />} label={choice} />
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log('ConfirmAnswers::onChange');
          onAnswer?.({ [question?.name]: e.target.value === "true" })
        }
        }
      >
        {[true, false].map(function (answer, index) {
          return (
            <FormControlLabel key={generateKey(`confirm-${index}`)} value={answer} control={<Radio />} label={answer ? "Yes" : "No"} />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

function CheckboxAnswers({ question, onAnswer }: AnswerProps) {
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

function Question() {
  const [{ quiz }, dispatch] = useTimeContext();
  if (!quiz.question) {
    return <></>;
  }

  console.log(quiz);

  let component: JSX.Element;

  const name: string = quiz.question?.name;

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
          console.log(answer[name], name, quiz.question?.answer);
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
          const sortCallback = (a: AnswerValue, b: AnswerValue) => {
            return JSON.stringify(a).localeCompare(JSON.stringify(b));
          };

          const userAnswers: AnswerValue[] = answer[name] && answer[name] instanceof Array ? answer[name] as AnswerValue[] : [];
          if (userAnswers.length === 0) {
            console.error("checkbox")
          }
          userAnswers.sort(sortCallback);

          const referenceAnswers = (quiz.question?.answer as AnswerValue[]).sort(sortCallback)
          // determine if all the checkboxes match?
          const isCorrect = userAnswers.every((value, index) => {
            return referenceAnswers[index] == value;
          });

          // if all checkboxes do not match (ie. is not correct)
          // then penalize time
          if (!isCorrect) {
            dispatch({ type: SET_TIME, payload: quiz.time - 10 });
          }
          dispatch({ type: NEXT_QUESTION });
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
        mt: 4
      }}>
      {component}
    </Box>
  );
}

export default Question;
