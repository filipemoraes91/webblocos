import { useState } from "react";
import requestFactory from "../services/api/factoryApi";

const useClientes = () => {
  const [loadClientes, setLoadClientes] = useState(true);
  const [clientes, setClientes] = useState([]);

  const [loadCliente, setLoadCliente] = useState(true);
  const [cliente, setCliente] = useState();

  const [loadTelefones, setLoadTelefones] = useState(true);
  const [telefones, setTelefones] = useState();

  const getClientes = async () => {
    const url = "atendimentos/clientes";
    try {
      const response = await requestFactory.get(url);
      setClientes(response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadClientes(false);
  };

  const getCliente = async (codigo) => {
    const url = `atendimentos/clientes/${codigo}`;
    try {
      const response = await requestFactory.get(url);
      setCliente(response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadCliente(false);
  };

  const getTelefones = async (codigo) => {
    const url = `/atendimentos/clientes/${codigo}/telefones`;
    try {
      const response = await requestFactory.get(url);
      setTelefones(response.TELEFONES);
    } catch (error) {
      console.log(error);
    }
    setLoadTelefones(false);
  };

  return {
    loadClientes,
    getClientes,
    clientes,

    loadCliente,
    getCliente,
    cliente,

    loadTelefones,
    getTelefones,
    telefones,
  };
};

export default useClientes;
