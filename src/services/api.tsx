import axios from "axios";

const urlApi = "https://api.tempus.wilsonfelix.com.br";

const api = axios.create({
  baseURL: urlApi,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
