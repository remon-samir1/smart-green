import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ChartsPage from "./Components/ChartsPage/ChartsPage";
import Home from "./Components/Home/Home";
import OverView from "./Components/OverView/OverView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<ChartsPage />} path="/charts" />
          <Route element={<OverView />} path="/overview" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
