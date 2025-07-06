import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import DetailView from "./pages/DetailView";
import Header from "./components/Header";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path=":id" element={<DetailView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
