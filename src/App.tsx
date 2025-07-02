import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import DetailView from "./pages/DetailView";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path=":id" element={<DetailView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
