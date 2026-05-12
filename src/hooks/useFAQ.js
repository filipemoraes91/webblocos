import { useState } from "react";
import requestFactory from "../services/api/factoryApi";

const useFAQ = () => {
  const [faqMenu, setFaqMenu] = useState([]);
  const [loadMenu, setloadingMenu] = useState(true);
  const [faq, setFaq] = useState([]);
  const [loadingFaq, setLoadingFaq] = useState(true);
  const [anFaq, setAnFaq] = useState([]);
  const [loadAnFaq, setloadingAnFaq] = useState(true);
  const [listFaqApro, setListFaqApro] = useState([]);
  const [listFaqPend, setListFaqPend] = useState([]);

  const getMenu = async () => {
    const url = "/faq/menu";
    try {
      const response = await requestFactory.get(url);
      setFaqMenu(response.result);
    } catch (error) {
      console.log(error);
    }
    setloadingMenu(false);
  };

  const getFaqAprovados = async () => {
    const response = await requestFactory.get("/faq");
    setListFaqApro(response.result);
    setLoadingFaq(false);
  };

  const getFaqPendentes = async () => {
    const response = await requestFactory.get("/faq/pendentes");
    setListFaqPend(response.result);
    setLoadingFaq(false);
  };

  const getFAQ = async (codigo) => {
    setLoadingFaq(true);
    const url = `faq/${codigo}`;
    try {
      const response = await requestFactory.get(url);
      setFaq(response.result[0]);
    } catch (error) {
      console.log(error);
    }
    setLoadingFaq(false);
  };

  const getAnFAQ = async (codigo) => {
    setLoadingFaq(true);
    const url = `/faq/${codigo}/anotacoes`;
    try {
      const response = await requestFactory.get(url);
      setAnFaq(response.result);
    } catch (error) {
      console.log(error);
    }
    setloadingAnFaq(false);
  };

  return {
    loadMenu,
    getMenu,
    faqMenu,

    loadingFaq,
    getFAQ,
    faq,

    loadAnFaq,
    getAnFAQ,
    anFaq,

    getFaqAprovados,
    listFaqApro,
    getFaqPendentes,
    listFaqPend,
  };
};
export default useFAQ;
