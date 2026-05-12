// src/services/indexedDB/dbFactory.js
import { DB_NAME, DB_VERSION, OBJECT_STORES } from "./config";

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      OBJECT_STORES.forEach(({ name, options }) => {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, options);
          // console.log(`Object store '${name}' criada`);
        }
      });
    };

    request.onsuccess = (event) => {
      // console.log('Banco de dados aberto com sucesso');
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      // console.error('Erro ao abrir o banco de dados:', event.target.errorCode);
      reject(event.target.error);
    };
  });
};

export const resetDB = async (preserveStores = ['configuracoes']) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Salva os dados das stores que devem ser preservadas
      const preservedData = {};
      for (const storeName of preserveStores) {
        try {
          preservedData[storeName] = await getAll(storeName);
        } catch (error) {
          // Se a store não existir, ignora
          console.log(`Store '${storeName}' não encontrada para preservar`);
        }
      }

      // Deleta o banco
      const deleteRequest = indexedDB.deleteDatabase(DB_NAME);

      deleteRequest.onsuccess = async () => {
        // console.log(`Banco de dados '${DB_NAME}' excluído com sucesso.`);
        try {
          const db = await openDB(); // recria o banco
          
          // Restaura os dados preservados
          for (const [storeName, data] of Object.entries(preservedData)) {
            if (data && data.length > 0) {
              const tx = db.transaction(storeName, "readwrite");
              const store = tx.objectStore(storeName);
              for (const item of data) {
                store.put(item);
              }
            }
          }
          
          // console.log(`Banco '${DB_NAME}' recriado com configurações preservadas.`);
          resolve(db);
        } catch (error) {
          reject(error);
        }
      };

      deleteRequest.onerror = (event) => {
        // console.error(`Erro ao excluir o banco '${DB_NAME}':`, event.target.error);
        reject(event.target.error);
      };

      deleteRequest.onblocked = () => {
        // console.warn(`A exclusão do banco '${DB_NAME}' está bloqueada. Feche outras abas que o estejam usando.`);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const getAll = async (storeName) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

/**
 * Recupera um item pela chave primária
 */
export const getById = async (storeName, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

/**
 * Insere ou atualiza um item
 */
export const insertItem = async (storeName, data) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

/**
 * Remove um item pela chave
 */
export const deleteItem = async (storeName, key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
};

/**
 * Limpa todos os registros da store
 * ATENÇÃO: Não use esta função com a store 'configuracoes' pois ela contém dados do usuário
 */
export const clearStore = async (storeName) => {
  // Proteção contra limpeza acidental da tabela de configurações
  if (storeName === 'configuracoes') {
    console.warn('Tentativa de limpar a store "configuracoes" foi bloqueada. Use deleteItem() para remover configurações específicas.');
    return Promise.resolve();
  }
  
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = (e) => reject(e.target.error);
  });
};
