import axios from 'axios';

import {useToast} from 'vue-toast-notification';
const $toast = useToast();

const API = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use((config: any) => {
  $toast.clear();
  $toast.default('Carregando...');
  return config;
}, (error) => {
  $toast.clear();
  $toast.error('Não foi possível completar a ação desejada.');
  return Promise.reject(error);
})

API.interceptors.response.use((config: any) => {
  $toast.clear();
  $toast.success('Ação realizada com sucesso.');
  return config;
}, (error) => {
  $toast.clear();
  $toast.error('Não foi possível completar a ação desejada.');
  return Promise.reject(error);
})

export default API;