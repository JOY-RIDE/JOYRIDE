import axios from 'axios';

const JOYRIDE_DOMAIN = '';
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? JOYRIDE_DOMAIN
    : 'http://localhost:3000';

export const joyrideAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
