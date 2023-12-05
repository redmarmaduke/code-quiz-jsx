import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Highscores from './pages/Highscores';
import Quiz from './pages/Quiz/index';
import {TimeProvider} from './components/TimeProvider';
import {GameProvider} from './components/GameProvider';

/**
 * App
 * @return {JSX.Element}
 */
function App() {
  console.log(import.meta.env.PROD ? import.meta.env.BASE_URL : '/');
  return (
    <div className="App">
      <TimeProvider>
        <GameProvider>
          <BrowserRouter basename={
            import.meta.env.MODE === 'production' ?
              import.meta.env.BASE_URL : ''
          }>
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
