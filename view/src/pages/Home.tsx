import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import NavBar from "../components/NavBar";
import Title from "../components/Title";

function Home() {
  return (
    <div>
      <NavBar />
      <Stack
        spacing={1}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Title>Coding Quiz Challenge</Title>
        <div
          style={{
            marginBottom: "1em",
          }}
        >
          <p>
            Try to answer the following code-related questions within the time
            limit.
          </p>
          <p>
            Keep in mind that an incorrect answer will penalize your score/time
            by ten seconds!
          </p>
        </div>
        <Button
          variant="contained"
          component={Link}
          to="/quiz"
          onClick={function () {
            console.log("Start Quiz Button");
          }}
        >
          Start Quiz
        </Button>
      </Stack>
    </div>
  );
}

export default Home;
