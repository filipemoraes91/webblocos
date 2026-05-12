import { useState, useEffect } from "react";
import { getById, insertItem } from "../services/indexedDB/factoryDB";

const STORE_NAME = "configuracoes";
const CONFIG_KEY = "configAtendimento"; // Usando "accordions" como setor/chave

export const useAccordionConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configuração padrão
  const defaultConfig = {
    config: CONFIG_KEY,
    accordions: {
      contatos: true,
      anexos: true,
      descricao: true,
      tarefas: true,
      outrosDados: true,
      outrosAtendimentos: true,
      ultimosAtendimentos: true,
      vinculados: true,
    },
  };

  // Carrega a configuração do IndexedDB
  const loadConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const savedConfig = await getById(STORE_NAME, CONFIG_KEY);
      
      if (savedConfig) {
        setConfig(savedConfig);
      } else {
        // Se não existir, salva a configuração padrão
        await insertItem(STORE_NAME, defaultConfig);
        setConfig(defaultConfig);
      }
    } catch (err) {
      console.error("Erro ao carregar configurações:", err);
      setError(err);
      setConfig(defaultConfig);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza a configuração no IndexedDB
  const updateConfig = async (newAccordionConfig) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedConfig = {
        config: CONFIG_KEY,
        accordions: {
          ...(config?.accordions || defaultConfig.accordions),
          ...newAccordionConfig.accordions,
        },
      };
      
      await insertItem(STORE_NAME, updatedConfig);
      setConfig(updatedConfig);
      
      return updatedConfig;
    } catch (err) {
      console.error("Erro ao atualizar configurações:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reseta para a configuração padrão
  const resetConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await insertItem(STORE_NAME, defaultConfig);
      setConfig(defaultConfig);
      
      return defaultConfig;
    } catch (err) {
      console.error("Erro ao resetar configurações:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Carrega a configuração quando o hook é montado
  useEffect(() => {
    loadConfig();
  }, []);

  return {
    config,
    loading,
    error,
    updateConfig,
    resetConfig,
    loadConfig,
  };
};
