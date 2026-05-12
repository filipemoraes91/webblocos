import { useState } from "react";
import requestFactory from "../services/api/factoryApi";

const useBackups = () => {
  const [arquivos, setArquivos] = useState([]);
  const [progress, setProgress] = useState(0);
  const [statusBar, setStatusBar] = useState(false);
  const [loadingBkp, setLoadingBkp] = useState(true);

  const getBkp = async (cnpj) => {
    const url = `/ftp/backups/${cnpj}`;
    try {
      const response = await requestFactory.get(url);
      setArquivos(response.arquivos);
    } catch (error) {
      console.log(error);
    }
    setLoadingBkp(false);
  };

  const getFile = async (cnpj, nome) => {
    const url = `/downloads/backups/${cnpj}%2F${nome}`;
    console.log(url);
    try {
      const response = await requestFactory.get(url);
      const blob = new Blob([response], { type: response.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = nome;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao baixar o backup:", error);
    }
  };

  // const getFile = async (cnpj, nome) => {
  //   if (isRequestInProgress) return; // Impede que o GET seja disparado novamente enquanto uma requisição estiver em andamento
  //   isRequestInProgress = true; // Marca a requisição como em andamento

  //   setStatusBar(true);
  //   setProgress(0);
  //   axios
  //     .get(`/downloads/backups/${cnpj}%2F${nome}`, {
  //       responseType: "blob",
  //       ...config,
  //       onDownloadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round(
  //           (progressEvent.loaded * 100) / progressEvent.total
  //         );
  //         setProgress(percentCompleted);
  //       },
  //     })
  //     .then((response) => {
  //       const blob = new Blob([response.data], {
  //         type: response.headers["content-type"],
  //       });

  //       const contentDisposition = response.headers["content-disposition"];
  //       if (contentDisposition && contentDisposition.includes("attachment")) {
  //         console.warn("Download já iniciado automaticamente pelo servidor.");
  //         return; // Evita o segundo download
  //       }

  //       const url = window.URL.createObjectURL(blob);
  //       // Criando um link de download
  //       if (window.navigator.msSaveOrOpenBlob) {
  //         // Para IE e Edge
  //         window.navigator.msSaveOrOpenBlob(blob, nome);
  //       } else {
  //         const a = document.createElement("a");
  //         a.style.display = "none";
  //         a.href = url;
  //         a.download = decodeURIComponent(nome); // Garante o nome correto do arquivo
  //         document.body.appendChild(a);
  //         a.click();
  //         document.body.removeChild(a);
  //         window.URL.revokeObjectURL(url); // Libera a memória
  //         setTimeout(() => window.URL.revokeObjectURL(url), 100);
  //       }

  //       setProgress(100); // Define 100% após conclusão
  //       setTimeout(() => setStatusBar(false), 1000); // Oculta a barra após um tempo
  //       // window.open(url);
  //     })
  //     .catch((error) => {
  //       console.error("Erro no download:", error);
  //       setStatusBar(false);
  //     })
  //     .finally(() => {
  //       isRequestInProgress = false; // Marca a requisição como finalizada
  //     });
  // };

  return {
    getBkp,
    arquivos,
    progress,
    setProgress,
    statusBar,
    loadingBkp,
    getFile,
  };
};
export default useBackups;
