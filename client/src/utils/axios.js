import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.HOST || 'http://localhost:3000/api'
});

export default instance;
