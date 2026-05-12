import { useContext, useState } from "react";
import axios from "../services/api";
import { GeralContext } from "../context";

const useTarefas = () => {
  const [listTarefas, setListTarefas] = useState(undefined);
  const [loadingTarefas, setLoadingTarefas] = useState(true);
  const { toggleMensagem } = useContext(GeralContext);

  const getTarefas = async (codigo) => {
    const url = `/atendimentos/${codigo}/tarefas`;
    setLoadingTarefas(true);
    try {
      const response = await requestFactory.get(url);
      setListTarefas(response.data.result);
    } catch (error) {}
    setLoadingTarefas(false);
  };

  const postTarefas = async (codigo, data) => {
    try {
      if (data.codigo > 0) {
        const url = `/atendimentos/${codigo}/tarefas/${data.codigo}`;
        const response = await requestFactory.put(url, data);
        toggleMensagem(response.data.result, "success");
      } else {
        const url = `/atendimentos/${codigo}/tarefas`;
        const response = await requestFactory.post(url, data);
        toggleMensagem(response.data.result, "success");
      }
    } catch (error) {
      toggleMensagem(error.message, "error");
    }
  };

  const finalizarTarefa = async (codigo, tarefa) => {
    try {
      const url = `/atendimentos/${codigo}/tarefas/${tarefa}/finalizar`;
      const response = await requestFactory.put(url);
      toggleMensagem(response.data.result, "success");
    } catch (error) {
      toggleMensagem(error.message, "error");
    }
  };

  const reabrirTarefa = async (codigo, tarefa) => {
    try {
      const url = `/atendimentos/${codigo}/tarefas/${tarefa}/reabrir`;
      const response = await requestFactory.put(url);
      toggleMensagem(response.data.result, "success");
    } catch (error) {
      toggleMensagem(error.message, "error");
    }
  };

  const deleteTarefa = async (codigo, tarefa) => {
    try {
      const url = `/atendimentos/${codigo}/tarefas/${tarefa}`;
      const response = await requestFactory.delete(url);
      toggleMensagem(response.data.result, "success");
    } catch (error) {
      toggleMensagem(error.message, "error");
    }
  };

  return {
    getTarefas,
    postTarefas,
    deleteTarefa,
    finalizarTarefa,
    reabrirTarefa,
    listTarefas,
    loadingTarefas,
  };
};
export default useTarefas;
