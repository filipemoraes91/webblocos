import { useState, useEffect } from "react";
import { getById, insertItem } from "../services/indexedDB/factoryDB";

const STORE_NAME = "configuracoes";
const CONFIG_KEY = "configGrupos";

export const useAccordionGruposConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configuração padrão
  const defaultConfig = {
    config: CONFIG_KEY,
    grupos: {}, // { [grupo]: true/false }
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
        await insertItem(STORE_NAME, defaultConfig);
        setConfig(defaultConfig);
      }
    } catch (err) {
      setError(err);
      setConfig(defaultConfig);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza a configuração no IndexedDB
  const updateConfig = async (grupo, expanded) => {
    try {
      setLoading(true);
      setError(null);
      const newConfig = {
        config: CONFIG_KEY,
        grupos: {
          ...(config?.grupos || {}),
          [grupo]: expanded,
        },
      };
      await insertItem(STORE_NAME, newConfig);
      setConfig(newConfig);
      return newConfig;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  return {
    config,
    loading,
    error,
    updateConfig,
    loadConfig,
  };
};
