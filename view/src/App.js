import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Highscores from './pages/Highscores';
import Quiz from './pages/Quiz';
import { TimeProvider } from './components/TimeProvider';
import { GameProvider } from './components/GameProvider';

function App() {
  return (
    <div className="App">
      <TimeProvider>
        <GameProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/highscores" element={<Highscores />} />
              <Route path="/quiz" element={<Quiz />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </TimeProvider>
    </div>
  );
}

export default App;
