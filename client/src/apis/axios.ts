import axios from 'axios';

export const joyrideAxios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
