import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Interceptador de resposta para mostrar mensagem de sucesso ou erro (exceto para GET)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
