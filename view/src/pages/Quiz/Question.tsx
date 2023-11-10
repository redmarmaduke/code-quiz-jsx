import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import { SET_TIME, NEXT_QUESTION } from "../../components/TimeProvider.d";
import { useTimeContext } from "../../components/TimeProvider";

function Question() {
  const [{ quiz }, dispatch] = useTimeContext();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 4
      }}>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{quiz.question?.title ?? "ERROR: Question missing."}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={-1}
        onChange={function (e) {
          const index = parseInt(e.target.value);
          if (index !== quiz.question?.answer) {
            dispatch({ type: SET_TIME, payload: quiz.time - 10 });
          }
          dispatch({ type: NEXT_QUESTION });
        }}
      >
      {quiz.question?.choices.map(function (answer, index) {
            return (
              <FormControlLabel key={index} value={index} control={<Radio />} label={answer} />
            );
          })}        
      </RadioGroup>
    </FormControl>
    </Box>
  );
}

export default Question;
