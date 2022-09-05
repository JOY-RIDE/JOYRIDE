import axios from 'axios';

const JOYRIDE_BASE_URL = 'http://localhost:3000';

export const joyrideAxios = axios.create({
  baseURL: JOYRIDE_BASE_URL,
  withCredentials: true,
});
