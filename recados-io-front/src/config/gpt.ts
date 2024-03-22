import axios from 'axios';
import {useToast} from 'vue-toast-notification';
const $toast = useToast();

const GPT = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.VUE_APP_OPEN_AI_KEY}`
  }
});

GPT.interceptors.request.use((config: any) => {
  $toast.clear();
  $toast.default('Carregando...');
  return config;
}, (error) => {
  $toast.clear();
  $toast.error('Não foi possível se comunicar com o Chat GPT.');
  return Promise.reject(error);
})

GPT.interceptors.response.use((config: any) => {
  $toast.clear();
  $toast.success('Ação realizada com sucesso.');
  return config;
}, (error) => {
  $toast.clear();
  $toast.error('Chat GPT está indisponível no momento. Tente mais tarde.');
  return Promise.reject(error);
})

export default GPT;