import { getAll, openDB, resetDB } from "./factoryDB";

const iDB = {
  getAll: async (nome, sigla) => {
    try {
      if (sigla) {
        const lista = await getAll(nome);
        return lista.filter((item) => item.sigla === sigla);
      } else {
        const lista = await getAll(nome);
        return lista;
      }
    } catch (error) {
      throw error;
    }
  },
  get: async (nome, id) => {
    try {
      // const db = await openDB();
      // const tx = db.transaction(nome, "readonly");
      // const store = tx.objectStore(nome);
      // const item = await store.get(id);

      // return await item;
      const db = await openDB(); // seu openDB nativo
      const tx = db.transaction(nome, "readonly");
      const store = tx.objectStore(nome);

      return new Promise((resolve, reject) => {
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      throw error;
    }
  },
  post: async (nome, data) => {
    try {
      const db = await openDB();
      const tx = db.transaction(nome, "readwrite");
      const store = tx.objectStore(nome);
      const result = await store.add(data); // ou store.put(data) se quiser sobrescrever se já existir

      return result; // geralmente retorna o ID gerado
    } catch (error) {
      throw error;
    }
  },

  // put: async (nome, lista) => {
  //   console.log(lista);
  //   try {
  //     const db = await openDB();
  //     const tx = db.transaction(nome, "readwrite");
  //     const store = tx.objectStore(nome);
  //     store.clear();
  //     lista.forEach((item) => {
  //       store.put(item);
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  put: async (nome, dados) => {
    try {
      const db = await openDB();
      const tx = db.transaction(nome, "readwrite");
      const store = tx.objectStore(nome);

      // NÃO limpa a store "configuracoes" pois contém dados do usuário
      // Para outras stores, limpa antes de salvar
      if (nome !== "configuracoes") {
        await store.clear();
      }

      // Se for array, salva todos
      if (Array.isArray(dados)) {
        for (const item of dados) {
          await store.put(item);
        }
      } else {
        // Se for objeto único
        await store.put(dados);
      }

      await tx.done;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url) => {
    try {
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reseta o banco de dados, mas PRESERVA a tabela de configurações
   * As configurações do usuário são mantidas após o reset
   */
  deleteIBD: async () => {
    // Por padrão, preserva a store 'configuracoes'
    console.log("deletou");
    await resetDB(["configuracoes"]);
  },
};

export default iDB;
