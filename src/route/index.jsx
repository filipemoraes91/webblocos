import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import { Home } from "../pages/home";
import Cadastros from "../pages/cadastros";

function Rotas() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/cadastros/:tipo" exact element={<Cadastros />} />
    </Routes>
  );
}

export default Rotas;
