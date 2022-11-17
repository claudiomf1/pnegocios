import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About/About";
import Nav from "./components/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
