// src/services/Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://muhafizapp-backend-phf9.onrender.com/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
