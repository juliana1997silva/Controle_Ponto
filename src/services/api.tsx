import axios from "axios";

const urlApi = 'http://127.0.0.1:8800/api/';

const api = axios.create({
  baseURL: urlApi,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
