import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;