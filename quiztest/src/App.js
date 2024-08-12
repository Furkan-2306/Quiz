import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Introduce from "./pages/introduce/Introduce";
import Quiz from "./pages/quiz/Quiz";
import Results from "./pages/results/Results";
import Game from "./pages/yilan/Game"; // Game bileşenini doğru şekilde içe aktar

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Introduce />} />
          <Route path="/quiz/:questionType" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/yilan" element={<Game />} /> {/* Yılan rotasını tanımla */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
