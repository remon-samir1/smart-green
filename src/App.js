import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ChartsPage from "./Components/ChartsPage/ChartsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ChartsPage />} path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
