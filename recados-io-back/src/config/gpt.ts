import axios from 'axios';

const GPT = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPEN_AI_KEY}`
  }
});

export default GPT;