import { Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import { Home } from "../pages/home";
// import Load from "../pages/load";
// import SacList from "../pages/sac/list";
// import SacForm from "../pages/sac/form";
// import Clientes from "../pages/clientes";
// import FTP from "../pages/ftp";
// import Videos from "../pages/videos";
// import ListFAQ from "../pages/faq/list";
// import FAQForm from "../pages/faq/form";
// import Rastreios from "../pages/rastreios";
// import Setores from "../pages/setores";
// import { validarToken } from "../utils/user";

// import { Navigate } from "react-router-dom";
// import { SacProvider } from "../context/sacContext";
// import Movimentos from "../pages/movimentos";
// function PrivateLayout() {
//   return validarToken() ? (
//     <SacProvider>
//       <Outlet />
//     </SacProvider>
//   ) : (
//     <Navigate to="/login" replace />
//   );
// }

function Rotas() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" exact element={<Home />} />
      {/* <Route element={<PrivateLayout />}> */}
        {/* <Route path="/load" exact element={<Load />} />
        <Route path="/sac" exact element={<SacList />} />
        <Route path="/sac/create" exact element={<SacForm />} />
        <Route path="/sac/edit/:codigo" exact element={<SacForm />} />
        <Route path="/clientes" exact element={<Clientes />} />
        <Route path="/faq" exact element={<ListFAQ />} />
        <Route path="/faq/:codigo" exact element={<ListFAQ />} />
        <Route path="/faq/create" exact element={<FAQForm />} />
        <Route path="/faq/edit/:codigo" exact element={<FAQForm />} />
        <Route path="/ftp" exact element={<FTP />} />
        <Route path="/videos" exact element={<Videos />} />
        <Route path="/finavancado" exact element={""} />
        <Route path="/versionamento" exact element={""} />
        <Route path="/marcadores" exact element={""} />
        <Route path="/rastreios" exact element={<Rastreios />} />
        <Route path="/setores" exact element={<Setores />} />
        <Route path="/movimentos" exact element={<Movimentos />} /> */}
      {/* </Route> */}
    </Routes>
  );
}

export default Rotas;
