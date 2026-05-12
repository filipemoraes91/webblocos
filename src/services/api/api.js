import axios from "axios";
import { getSession } from "../../utils/storage";

const api = axios.create({
  baseURL: "https://api.stackbloco.com.br",
  //  baseURL: "https://saborsenior.stackbloco.com.br",
  // baseURL: "https://testeapi.stackbloco.com.br",

});

api.interceptors.request.use((config) => {
  const token = getSession("token_sac");
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

export default api;
