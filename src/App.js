import { Routes, Route } from "react-router-dom";
import Home from "./client/components/Home";
import About from "./client/components/About/About";
import Nav from "./client/Nav";
import FormInput from "./client/components/Formimput/FormInput";
import FormClient from "./client/components/FormCliente/FormCliente";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Home />} />
        <Route path="formulario" element={<FormInput />} />
        <Route path="formcliente" element={<FormClient />} />
      </Routes>
    </>
  );
}

export default App;
