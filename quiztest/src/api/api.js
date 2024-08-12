import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Introduce from "./pages/introduce/Introduce";
import Quiz from "./pages/quiz/Quiz";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Introduce />} />
          <Route path="/quiz/:question_type" element={<Quiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
