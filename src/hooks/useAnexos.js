import { useState, useEffect } from "react"
import requestFactory from "../services/api/factoryApi";
import api from "../services/api/api";

// Estado global compartilhado para downloads
let globalDownloads = {};
let globalSetDownloads = null;
const downloadsListeners = new Set();
const downloadControllers = new Map();

// Estado global compartilhado para uploads
let globalUploads = {};
const uploadsListeners = new Set();
const uploadControllers = new Map();

const updateGlobalDownloads = (newDownloads) => {
  globalDownloads = newDownloads;
  downloadsListeners.forEach(listener => listener(newDownloads));
};

const updateGlobalUploads = (newUploads) => {
  globalUploads = newUploads;
  uploadsListeners.forEach(listener => listener(newUploads));
};

const useAnexos = () => {
  const [anexos, setAnexos] = useState([]);
  const [downloads, setDownloads] = useState(globalDownloads);
  const [uploads, setUploads] = useState(globalUploads);

  // Registra o listener quando o componente monta
  useEffect(() => {
    const downloadListener = (newDownloads) => setDownloads(newDownloads);
    const uploadListener = (newUploads) => setUploads(newUploads);
    
    downloadsListeners.add(downloadListener);
    uploadsListeners.add(uploadListener);
    
    if (!globalSetDownloads) {
      globalSetDownloads = updateGlobalDownloads;
    }
    
    return () => {
      downloadsListeners.delete(downloadListener);
      uploadsListeners.delete(uploadListener);
    };
  }, []);

  const setGlobalDownloads = (updateFn) => {
    const newDownloads = typeof updateFn === 'function' ? updateFn(globalDownloads) : updateFn;
    updateGlobalDownloads(newDownloads);
  };

  const setGlobalUploads = (updateFn) => {
    const newUploads = typeof updateFn === 'function' ? updateFn(globalUploads) : updateFn;
    updateGlobalUploads(newUploads);
  };

  const getAnexos = async (codigo) => {
    const url = `/atendimentos/${codigo}/anexos`;
    try {
      const response = await requestFactory.get(url);
      setAnexos(response.result.reverse()); // Inverte a ordem para mostrar os mais recentes primeiro
    } catch (error) {
      console.error("Erro ao buscar anexos:", error);
    }
  };

  const downloadFile = async (codigo, nome) => {
    // const downloadId = `${codigo}_${nome}`;
    const downloadId = nome;
    
    // Verifica se já está baixando
    if (globalDownloads[downloadId]?.status === 'downloading') {
      return;
    }

    // Cria AbortController para poder cancelar
    const controller = new AbortController();
    downloadControllers.set(downloadId, controller);

    // Inicializa o download
    setGlobalDownloads(prev => ({
      ...prev,
      [downloadId]: {
        nome,
        progress: 0,
        status: 'downloading',
        error: null
      }
    }));

    try {
      // Codifica corretamente o nome do arquivo para a URL
      const arquivoParam = encodeURIComponent(`${codigo}/${nome}`);
      
      const response = await api.get(
        `/downloads/anexos?arquivo=${arquivoParam}`,
        {
          responseType: "blob",
          signal: controller.signal,
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setGlobalDownloads(prev => ({
              ...prev,
              [downloadId]: {
                ...prev[downloadId],
                progress: percentCompleted
              }
            }));
          },
        }
      );


      // Tenta extrair o nome do arquivo do header Content-Disposition
      let fileName = nome;
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        // Tenta diferentes formatos de filename
        const utf8Match = contentDisposition.match(/filename\*=UTF-8''(.+)/);
        if (utf8Match) {
          fileName = decodeURIComponent(utf8Match[1]);
        } else {
          const regularMatch = contentDisposition.match(/filename="?([^";\n]+)"?/);
          if (regularMatch) {
            fileName = regularMatch[1];
          }
        }
      }
      // Remove o id do nome caso venha junto (ex: 1234_nome.pdf -> nome.pdf)
      const regex = /^[\w-]+_(.+)$/;
      const match = fileName.match(regex);
      if (match) {
        fileName = match[1];
      }

      // Criar blob forçando download (usando application/octet-stream)
      const blob = new Blob([response.data], {
        type: 'application/octet-stream'
      });

      // Função auxiliar para download tradicional
      const downloadTradicional = (blob, fileName) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        a.setAttribute('download', fileName);
        
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      };

      if (window.showSaveFilePicker) {
        try {
          const handle = await window.showSaveFilePicker({
            suggestedName: fileName,
            types: [{
              description: 'Arquivo',
              accept: { '*/*': ['.'+fileName.split('.').pop()] },
            }],
          });
          const writable = await handle.createWritable();
          await writable.write(blob);
          await writable.close();
        } catch (err) {
          if (err.name === 'AbortError') {
            // Usuário cancelou, remove o download da lista
            setGlobalDownloads(prev => {
              const newDownloads = { ...prev };
              delete newDownloads[downloadId];
              return newDownloads;
            });
            return;
          }
          // Se falhar, usa o método tradicional
          downloadTradicional(blob, fileName);
        }
      } else {
        // Navegadores antigos - método tradicional
        downloadTradicional(blob, fileName);
      }

      // Remove da lista imediatamente após conclusão
      setGlobalDownloads(prev => {
        const newDownloads = { ...prev };
        delete newDownloads[downloadId];
        return newDownloads;
      });
      downloadControllers.delete(downloadId);

    } catch (error) {
      // Se foi cancelado pelo usuário, não mostra erro
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        setGlobalDownloads(prev => {
          const newDownloads = { ...prev };
          delete newDownloads[downloadId];
          return newDownloads;
        });
        downloadControllers.delete(downloadId);
        return;
      }
      
      console.error("Erro no download:", error);
      
      // Remove da lista imediatamente após erro
      setGlobalDownloads(prev => {
        const newDownloads = { ...prev };
        delete newDownloads[downloadId];
        return newDownloads;
      });
      downloadControllers.delete(downloadId);
    }
  };

  const cancelDownload = (downloadId) => {
    // Cancela a requisição se estiver em andamento
    const controller = downloadControllers.get(downloadId);
    if (controller) {
      controller.abort();
      downloadControllers.delete(downloadId);
    }
    
    // Remove da lista
    setGlobalDownloads(prev => {
      const newDownloads = { ...prev };
      delete newDownloads[downloadId];
      return newDownloads;
    });
  };

  const postAnexos = async (codigo, file) => {
    const uploadId = `${codigo}_${file.name}_${Date.now()}`;
    
    // Verifica se já está fazendo upload
    if (globalUploads[uploadId]?.status === 'uploading') {
      return;
    }

    // Cria AbortController para poder cancelar
    const controller = new AbortController();
    uploadControllers.set(uploadId, controller);

    // Inicializa o upload
    setGlobalUploads(prev => ({
      ...prev,
      [uploadId]: {
        nome: file.name,
        progress: 0,
        status: 'uploading',
        error: null
      }
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post(`/atendimentos/${codigo}/anexos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setGlobalUploads(prev => ({
            ...prev,
            [uploadId]: {
              ...prev[uploadId],
              progress: percentCompleted
            }
          }));
        },
      });

      // Recarrega a lista de anexos
      await getAnexos(codigo);

      // Remove da lista imediatamente após conclusão
      setGlobalUploads(prev => {
        const newUploads = { ...prev };
        delete newUploads[uploadId];
        return newUploads;
      });
      uploadControllers.delete(uploadId);

    } catch (error) {
      // Se foi cancelado pelo usuário, não mostra erro
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
        setGlobalUploads(prev => {
          const newUploads = { ...prev };
          delete newUploads[uploadId];
          return newUploads;
        });
        uploadControllers.delete(uploadId);
        return;
      }
      
      console.error("Erro no upload:", error);
      
      // Remove da lista imediatamente após erro
      setGlobalUploads(prev => {
        const newUploads = { ...prev };
        delete newUploads[uploadId];
        return newUploads;
      });
      uploadControllers.delete(uploadId);
    }
  };

  const cancelUpload = (uploadId) => {
    // Cancela a requisição se estiver em andamento
    const controller = uploadControllers.get(uploadId);
    if (controller) {
      controller.abort();
      uploadControllers.delete(uploadId);
    }
    
    // Remove da lista
    setGlobalUploads(prev => {
      const newUploads = { ...prev };
      delete newUploads[uploadId];
      return newUploads;
    });
  };

  return {
    getAnexos,
    anexos,
    downloadFile,
    downloads,
    cancelDownload,
    postAnexos,
    uploads,
    cancelUpload
  };
};

export default useAnexos;
