import { useState } from "react";
import requestFactory from "../services/api/factoryApi";
import { iniListAtendimentos } from "../utils/constructor";
import { useNavigate } from "react-router-dom";
import { setSession } from "../utils/storage";

const useAtendimentos = () => {
  const [listAtendimentos, setListAtendimentos] = useState(iniListAtendimentos);
  const [loadAtendimento, setLoadAtendimento] = useState(false);
  const [conteudos, setConteudos] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [telefones, setTelefones] = useState([]);
  const [listOutAtendimentos, setListOutAtendimentos] = useState([]);
  const navigate = useNavigate();

  const getListAtendimentos = async (paramns, allTipos) => {
    const url =
      paramns?.valor === undefined
        ? `/atendimentos?setor=${paramns?.tipo}`
        : `/atendimentos?setor=${allTipos}&filtro=${paramns.filtro.toLowerCase()}&pesquisa=${paramns.valor}`;

    try {
      const response = await requestFactory.get(url);
      setListAtendimentos(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getAtendimento = async (codigo) => {
    setTarefas([]);
    setConteudos([]);
    try {
      // const response = await requestFactory.get(`/atendimentos/${codigo}/novo`);
      const response = await requestFactory.get(`/atendimentos/${codigo}`);
      return response.result[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getOutrosAtendimentos = async (codigo) => {
    try {
      const response = await requestFactory.get(
        `/atendimentos/cliente/${codigo}/abertos`,
      );
      setListOutAtendimentos(response.result);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getUltimosAtendimentos = async (codigo) => {
    try {
      const response = await requestFactory.get(
        `/atendimentos/cliente/${codigo}/finalizados`,
      );
      setListOutAtendimentos(response.result);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getVinculados = async (codigo) => {
    try {
      const response = await requestFactory.get(
        `/atendimentos/${codigo}/vinculados`,
      );
      setListOutAtendimentos(response.result);
      return response.result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const postVincular = async (id, data) => {
    const response = await requestFactory.post(
      `/atendimentos/${id}/vinculados`,
      data,
    );
  };

  const getConteudos = async (codigo) => {
    try {
      const response = await requestFactory.get(
        `/atendimentos/${codigo}/conteudos`,
      );
      setConteudos(response.result.reverse());
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getTelefones = async (codigo) => {
    try {
      const response = await requestFactory.get(
        `/atendimentos/${codigo}/conteudos`,
      );
      setTelefones(response.result.reverse());
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getTarefas = async (codigo) => {
    try {
      const response = await requestFactory.get(
        `/atendimentos/${codigo}/tarefas`,
      );
      setTarefas(response.result.reverse());
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const atender = async (codigo) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/atender`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const finalizar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/finalizar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const retornar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/retornar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const agendar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/agendar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const direcionar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/direcionar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const enviar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/enviar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const anotar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/anotar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const reservar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/reservar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const removerreservar = async (codigo) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/tirarreserva`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const liberar = async (codigo) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/liberar`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const anotarFaq = async (codigoFaq, data) => {
    try {
      await requestFactory.put(`/faq/${codigoFaq}/anotacoes/`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const postTarefa = async (codigo, data) => {
    try {
      await requestFactory.post(`/atendimentos/${codigo}/tarefas`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const putTarefa = async (codigo, data) => {
    try {
      await requestFactory.put(
        `/atendimentos/${codigo}/tarefas/${data.codigo}`,
        data,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteTarefa = async (codigo, data) => {
    try {
      await requestFactory.delete(
        `/atendimentos/${codigo}/tarefas/${data.codigo}`,
        data,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const finalizarTarefa = async (codigo, data) => {
    try {
      await requestFactory.put(
        `/atendimentos/${codigo}/tarefas/${data.codigo}/finalizar`,
        data,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const reabrirTarefa = async (codigo, data) => {
    try {
      await requestFactory.put(
        `/atendimentos/${codigo}/tarefas/${data.codigo}/reabrir`,
        data,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const postAtendimento = async (data) => {
    try {
      await requestFactory.post("/atendimentos", data).then(navigate("/sac"));
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const adicionarMarcador = async (codigo, name) => {
    try {
      await requestFactory.post(`/atendimentos${codigo}\tagsac`, { tag: name });
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const removerMarcador = async (codigo, name) => {
    try {
      await requestFactory.delete(`/atendimentos${codigo}\tagsac\${name}`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const movimentar = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/movimentar`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const rastrear = async (codigo, data) => {
    try {
      await requestFactory.put(`/atendimentos/${codigo}/rastreio`, data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const putAtendimento = async (codigo, data) => {
    try {
      await requestFactory
        .put(`/atendimentos/${codigo}`, data)
        .then(navigate("/sac"));
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const putConteudo = async (codigo, data) => {
    try {
      await requestFactory.put(
        `/atendimentos/${codigo}/conteudos/${data.codigo}`,
        data,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // DATA WS *****************************************************************************************************
  const getDataWS = (tipo) => {
    const socket = new WebSocket("wss://server.stackbloco.com.br:8089");
    socket.onopen = function () {
      console.log("Conectado ao WebSocket");
      socket.send("Olá, servidor!"); // Enviando uma mensagem inicial
      const listRefresh = [];
    };

    socket.onmessage = function (event) {
      console.log(
        "Mensagem recebida:",
        event.data,
        JSON.parse(event.data).refresh,
        "atualizado em :" + Date.now(),
      );
      if (JSON.parse(event.data).refresh === tipo) {
        setSession("refresh", Date.now());
        return true;
        console.log(tipo);
      }

      socket.onerror = function (error) {
        console.error("Erro no WebSocket:", error);
      };

      socket.onclose = function () {
        console.log("Conexão encerrada");
      };
    };
  };

  return {
    getListAtendimentos,
    getAtendimento,
    postAtendimento,
    putAtendimento,
    getConteudos,
    conteudos,
    telefones,
    getTarefas,
    postTarefa,
    putTarefa,
    deleteTarefa,
    finalizarTarefa,
    reabrirTarefa,
    tarefas,
    atender,
    finalizar,
    retornar,
    agendar,
    direcionar,
    enviar,
    anotar,
    reservar,
    removerreservar,
    liberar,
    anotarFaq,
    adicionarMarcador,
    putConteudo,
    removerMarcador,
    movimentar,
    rastrear,
    listAtendimentos,
    getDataWS,
    setLoadAtendimento,
    loadAtendimento,
    getOutrosAtendimentos,
    getUltimosAtendimentos,
    getVinculados,
    postVincular,
    listOutAtendimentos,
  };
};

export default useAtendimentos;
