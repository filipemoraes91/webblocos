import { useState } from "react";
import requestFactory from "../services/api/factoryApi";
import iDB from "../services/indexedDB/db";

const useExtras = () => {
  const [loadTipos, setLoadTipos] = useState(true);
  const [tipos, setTipos] = useState([]);

  const [loadProgramas, setLoadProgramas] = useState(true);
  const [programas, setProgramas] = useState([]);

  const [loadAssuntos, setLoadAssuntos] = useState(true);
  const [assuntos, setAssuntos] = useState([]);

  const [loadMovimentos, setLoadMovimentos] = useState(true);
  const [movimentos, setMovimentos] = useState([]);

  const [loadMarcadores, setLoadMarcadores] = useState(true);
  const [marcadores, setMarcadores] = useState([]);

  const [loadUsuarios, setLoadUsuarios] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({ codigo: 0, nome: "" });

  //SALVANDO INFORMAÇÔES INDEXDB
  const getTipos = async () => {
    const url = "/tipos";
    try {
      const response = await requestFactory.get(url);
      iDB.put("tipos", response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadTipos(false);
  };

  const getProgramas = async () => {
    const url = "/programas";
    try {
      const response = await requestFactory.get(url);
      iDB.put("programas", response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadProgramas(false);
  };

  const getAssuntos = async () => {
    const url = "/assuntos";
    try {
      const response = await requestFactory.get(url);
      iDB.put("assuntos", response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadAssuntos(false);
  };

  const getMovimentos = async () => {
    const url = "atendimentos/movimentos";
    try {
      const response = await requestFactory.get(url);
      iDB.put("movimentos", response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadMovimentos(false);
  };

  const getUsuarios = async () => {
    const url = "/usuarios";
    try {
      const response = await requestFactory.get(url);
      iDB.put("usuarios", response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadUsuarios(false);
  };

  const getMarcadores = async () => {
    const url = "/tags";
    try {
      const response = await requestFactory.get(url);
      iDB.put("marcadores", response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadMarcadores(false);
  };

  //LISTAS
  const getListTipos = async () => {
    const response = await iDB.getAll("tipos");
    setTipos(response);
    setLoadTipos(false);
  };

  const getListTiposVisiveis = async () => {
    const response = await iDB.getAll("configuracoes");
    setTipos(response);
    setLoadTipos(false);
  };

  const getListAssuntos = async () => {
    const response = await iDB.getAll("assuntos");
    setAssuntos(response);
    setLoadAssuntos(false);
  };

  const getListProgramas = async () => {
    const response = await iDB.getAll("programas");
    setProgramas(response);
    setLoadProgramas(false);
  };

  const getListMovimentos = async (setor) => {
    setMovimentos([]);
    setLoadMovimentos(true);
    const response = await iDB.getAll("movimentos", setor || "AT");
    setMovimentos(response);
    setLoadMovimentos(false);
    return response;
  };

  const getListUsuarios = async () => {
    const response = await iDB.getAll("usuarios");
    setUsuarios(response);
    setLoadUsuarios(false);
  };

  const getUsuario = async (id) => {
    const response = await iDB.get("usuarios", id);
    setUsuario(response);
    setLoadUsuarios(false);
  };

  const getListMarcadores = async () => {
    const response = await iDB.getAll("marcadores");
    setMarcadores(response);
    setLoadMarcadores(false);
  };

  const setConfigTipos = async () => {
    const response = await iDB.getAll("tipos");
    let lista = [];
    let configuracoes = {
      setorSelecionado: "AT",
      kanban: response.kanban
    };
    for (let i = 0; i < response?.length; i++) {
      lista.push({ ...response[i], visivel: true });
    }
    configuracoes = {
      config: "setores",
      ...configuracoes,
      setoresVisiveis: lista,      
    };
    await iDB.post("configuracoes", configuracoes);
  };

  return {
    getTipos,
    getProgramas,
    getAssuntos,
    getMovimentos,
    getUsuarios,
    getMarcadores,

    loadTipos,
    getListTipos,
    tipos,

    loadProgramas,
    getListProgramas,
    programas,

    loadAssuntos,
    getListAssuntos,
    assuntos,

    loadMovimentos,
    getListMovimentos,
    movimentos,

    loadUsuarios,
    getListUsuarios,
    usuarios,
    getUsuario,
    usuario,

    loadMarcadores,
    getListMarcadores,
    marcadores,

    setConfigTipos,
  };
};

export default useExtras;
