import { useState } from "react";
import requestFactory from "../services/api/factoryApi";

const useRastreios = () => {
  const [loadRastreios, setLoadRastreios] = useState(true);
  const [rastreios, setRastreios] = useState([]);

  const getRastreios = async () => {
    const url = "/atendimentos/rastreios";
    try {
      const response = await requestFactory.get(url);
      setRastreios(response.result);
    } catch (error) {
      console.log(error);
    }
    setLoadRastreios(false);
  };

  return {
    loadRastreios,
    getRastreios,
    rastreios,
  };
};

export default useRastreios;
