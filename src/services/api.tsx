import axios from 'axios';

const urlApi = 'http://localhost:8800/api/';

const api = axios.create({
  baseURL: urlApi,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default api;
