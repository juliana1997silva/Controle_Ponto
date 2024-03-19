import axios from 'axios';

const urlApi = 'https://api.tempus.wilsonfelix.com.br/api';

const api = axios.create({
  baseURL: urlApi,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default api;
