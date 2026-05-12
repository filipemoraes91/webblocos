import { createContext, useState, useContext, useEffect } from "react";
import { groupAtendimentos, groupMovimentos } from "../utils/sac/index";
import useExtras from "../hooks/useExtras";
import useAtendimentos from "../hooks/useAtendimentos";
import { delSession, getSession } from "../utils/storage";
import { getAll, getById } from "../services/indexedDB/factoryDB";
import { data } from "react-router-dom";

const SacContext = createContext();

export const SacProvider = ({ children }) => {
  const [tipo, setTipo] = useState(undefined);
  const [listaAtendimentos, setListaAtendimentos] = useState(
    createEmptyListaAtendimentos(tipo),
  );
  const { getListMovimentos, movimentos } = useExtras();
  const {
    getListAtendimentos,
    getAtendimento,
    getDataWS,
    getConteudos,
    conteudos,
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
    anotarFaq,
    putConteudo,
    reservar,
    removerreservar,
    liberar,
    adicionarMarcador,
    removerMarcador,
    movimentar,
    rastrear,
    getOutrosAtendimentos,
    getUltimosAtendimentos,
    getVinculados,
    postVincular,
    postAtendimento,
    putAtendimento,
    listOutAtendimentos,
    loadAtendimento,
  } = useAtendimentos();
  const [idSelecionado, setIdSelecionado] = useState(0);
  const [atendimento, setAtendimento] = useState([]);
  const [atendimentoConsulta, setAtendimentoConsulta] = useState(null);
  const [loadingAtendimento, setLoadingAtendimento] = useState(false);
  const [acao, setAcao] = useState("sac");
  const [refresh, setRefresh] = useState(false);
  const [refreshAt, setRefreshAt] = useState(false);
  const [kanban, setKanban] = useState(false);
  const [paramns, setparamns] = useState(undefined);
  const [allTipos, setAllTipos] = useState([]);

  // const [listAtendimentos, setListAtendimentos] = useState(iniListAtendimentos);
  // const [loadAtendimento, setLoadAtendimento] = useState(false);
  // const [conteudos, setConteudos] = useState([]);
  // const [tarefas, setTarefas] = useState([]);
  // const [telefones, setTelefones] = useState([]);
  // const [listOutAtendimentos, setListOutAtendimentos] = useState([]);

  useEffect(() => {
    if (refreshAt) {
      getAtendimento(idSelecionado);
      getConteudos(idSelecionado);
      getTarefas(idSelecionado);
      setRefreshAt(false);
      setRefresh(true);
    }
  }, [refreshAt]);

  useEffect(() => {
    if (tipo)
      if (getDataWS(tipo)) {
        setRefresh(true);
      }
  }, [tipo]);

  function inserirAtendimento(data) {
    postAtendimento(data);
    setAtendimento(null);
    setIdSelecionado(0);
    setRefresh(true);
  }

  function atualizarAtendimento(codigo, data) {
    putAtendimento(codigo, {
      cliente: data.pessoa.codigo,
      assunto: data.assunto,
      prioridade: data.prioridade,
      tipo: data.tipo,
      contato: data.contato,
      software: data.software,
      rastreio: data.rastreio,
    });
    setAtendimento(null);
    setIdSelecionado(0);
  }

  // useEffect(() => {
  //   setRefresh(true);
  // }, [loadAtendimento]);

  useEffect(() => {
    let mov = [];
    if (tipo === undefined) return;
    getAll("tipos").then((data) => {
      const codigos = data.map((item) => item.codigo);
      setAllTipos(codigos);
    });

    getListAtendimentos({ tipo: tipo, ...paramns }, allTipos).then((data) => {
      if (data)
        if (kanban) {
          setListaAtendimentos(groupMovimentos(data, movimentos));
        } else {
          setListaAtendimentos(groupAtendimentos(data, movimentos));
        }
    });
    setRefresh(false);
  }, [refresh]);

  function carregarLista(tipo, kanban = false) {
    let mov = [];
    getListMovimentos(tipo).then((data) => {
      if (data) mov = data;
    });
    getListAtendimentos({ tipo: tipo, ...paramns }, allTipos).then((data) => {
      if (data) {
        if (kanban) setListaAtendimentos(groupMovimentos(data, mov));
        else setListaAtendimentos(groupAtendimentos(data, mov));
      }
    });
  }

  function carregarAtendimento(codigo) {
    let atendimento = null;
    getAtendimento(codigo).then((data) => {
      console.log(data);
      if (data) atendimento = data;
    });
    // console.log(atendimento);
  }

  function executarAcao(acao, data, codigo = 0) {
    switch (acao) {
      case "atender":
        atender(codigo).then(() => {
          getAtendimento(codigo).then((data) => {
            setAtendimento(data);
            setAcao("sac");
          });
          setRefresh(true);
        });
        break;
      case "finalizar":
        finalizar(idSelecionado, data);
        setAcao("sac");
        setIdSelecionado(0);
        setRefresh(true);
        break;
      case "retornar":
        retornar(idSelecionado, data);
        setAcao("sac");
        setRefresh(true);
        break;
      case "agendar":
        agendar(idSelecionado, data);
        setAcao("sac");
        setRefresh(true);
        break;
      case "direcionar":
        direcionar(idSelecionado, data);
        setAcao("sac");
        setIdSelecionado(0);
        setRefresh(true);
        break;
      case "enviar":
        enviar(idSelecionado, data);
        setAcao("sac");
        setIdSelecionado(0);
        setRefresh(true);
        break;
      case "anotar":
        anotar(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "anotarFAQ":
        anotarFaq(data.versao, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "postTarefa":
        postTarefa(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "putTarefa":
        putTarefa(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "deletarTarefa":
        deleteTarefa(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "finalizarTarefa":
        finalizarTarefa(idSelecionado, data);
        setAcao("sac");
        getTarefas(idSelecionado);
        break;
      case "reabrirTarefa":
        reabrirTarefa(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "putConteudo":
        putConteudo(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "reservar":
        reservar(idSelecionado, data);
        setAcao("sac");
        setRefresh(true);
        break;
      case "removerreservar":
        removerreservar(data.codigo);
        setAcao("sac");
        setRefresh(true);
        break;
      case "liberar":
        liberar(data.codigo);
        setAcao("sac");
        setRefresh(true);
        break;
      case "adicionarMarcador":
        adicionarMarcador(idSelecionado, data);
        setRefreshAt(true);
        break;
      case "removerMarcador":
        removerMarcador(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "movimentar":
        movimentar(codigo === 0 ? idSelecionado : codigo, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "rastrear":
        rastrear(idSelecionado, data);
        setAcao("sac");
        setRefreshAt(true);
        break;
      case "vincular":
        postVincular(idSelecionado, data);
        getVinculados(atendimento.vinculado);
        break;
      case "getVinculados":
        return getVinculados(atendimento.vinculado);
        break;
      default:
        setRefresh(true);
        break;
    }
  }

  const toggleIdSelecionado = (id, acao) => {
    
    if (id === idSelecionado && acao === "sac") {
      setIdSelecionado(0);
      setAtendimento(null);
    } else {
      setIdSelecionado(id);
      setAtendimento(null);
      setLoadingAtendimento(true);
      carregarAtendimento(id);
      // getAtendimento(id)
      //   .then((data) => {
      //     if (data) {
      //       setAtendimento(data);
      //       if (acao) {
      //         setAcao(acao);
      //       } else {
      //         setAcao("sac");
      //       }
      //     } else {
      //       console.error("Atendimento não encontrado:", id);
      //       setAtendimento(null);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Erro ao buscar atendimento:", error);
      //     setAtendimento(null);
      //   })
      //   .finally(() => {
      //     setLoadingAtendimento(false);
      //   });
    }
  };

  const getConsultaAtendimento = (idConsultar) => {
    setAtendimentoConsulta(null);
    getAtendimento(idConsultar)
      .then((data) => {
        if (data) {
          setAtendimentoConsulta(data);
        } else {
          console.error("Atendimento não encontrado:", idConsultar);
          setAtendimentoConsulta(null);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar atendimento:", error);
        setAtendimentoConsulta(null);
      })
      .finally(() => {
        setLoadingAtendimento(false);
      });
  };

  const toggleTipo = (novoTipo, kanban) => {
    setKanban(kanban);
    if (tipo !== novoTipo) {
      setListaAtendimentos(createEmptyListaAtendimentos(novoTipo));
      setIdSelecionado(0);
      setAtendimento(null);
      setTipo(novoTipo);
      carregarLista(novoTipo, kanban);
    }
  };

  const toggleAcao = (acao, id) => {
    // if (id !== idSelecionado && acao !== "sac") toggleIdSelecionado(id, acao);
    setAcao(acao);
  };

  const toggleParamns = (paramns) => {
    setparamns(paramns);
    setRefresh(true);
  };

  return (
    <SacContext.Provider
      value={{
        listaAtendimentos,
        atendimento,
        loadingAtendimento,
        idSelecionado,
        toggleIdSelecionado,
        acao,
        toggleAcao,
        tipo,
        toggleTipo,
        executarAcao,
        conteudos,
        getConteudos,
        getTarefas,
        tarefas,
        getOutrosAtendimentos,
        getUltimosAtendimentos,
        getConsultaAtendimento,
        listOutAtendimentos,
        atendimentoConsulta,
        inserirAtendimento,
        atualizarAtendimento,
        kanban,
        toggleParamns,
      }}
    >
      {children}
    </SacContext.Provider>
  );
};

export const useSacContext = () => {
  return useContext(SacContext);
};

const createEmptyListaAtendimentos = (tipo = "AT") => ({
  tipo: tipo,
  atendimentos: [
    { grupo: "Meus atendimentos", subgrupos: [], atendimentos: [], total: 0 },
    { grupo: "Sendo atendidos", subgrupos: [], atendimentos: [], total: 0 },
    { grupo: "Retornados", subgrupos: [], atendimentos: [], total: 0 },
    { grupo: "Aguardando", subgrupos: [], atendimentos: [], total: 0 },
  ],
  total: 0,
});
