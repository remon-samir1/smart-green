import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ChartsPage from "./Components/ChartsPage/ChartsPage";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<ChartsPage />} path="/charts" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
