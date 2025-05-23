// src/services/Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
