import { getSession } from "../../utils/storage";
import api from "./api";

const config = {
  headers: {
    authorization: getSession("token_sac"),
  },
};

const requestFactory = {
  get: async (url, paramns = {}) => {
    try {
      const response = await api.get(url, { paramns });
      return response.data;
    } catch (error) {
      // console.log(1, error)
      if (error.status === 401) window.location.href = "/login";
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default requestFactory;
