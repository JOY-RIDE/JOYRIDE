import axios from 'apis/axios';

interface NewUser {
  isTermsEnable: boolean;
  email: string;
  password: string;
  nickname: string;
  gender: string | null;
  old: number | null;
  bicycleType: string | null;
  message: string | null;
}

export default class AuthAPI {
  async signup(newUser: NewUser) {
    const {
      data: { code },
    } = await axios.post('/auth/signup', newUser);

    if (code !== 1000) {
      throw new Error(code);
    }
  }

  async checkEmail(email: string) {
    const {
      data: { code },
    } = await axios.get('/auth/email', { params: { email } });
    return code === 1000 ? true : false;
  }

  async checkNickname(nickname: string) {
    const {
      data: { code },
    } = await axios.get('/auth/nickname', { params: { nickname } });
    return code === 1000 ? true : false;
  }

  async login(email: string, password: string) {
    const {
      data: { code, result },
    } = await axios.post('/auth/signin', { email, password });

    if (code !== 1000) {
      throw new Error(code);
    }

    this.onLoginSuccess(result.token.accessToken);
  }

  async silentRefresh() {
    const {
      data: { code, result },
    } = await axios.get('/auth/jwt');

    if (code === 1000) {
      this.onLoginSuccess(result.token.accessToken);
    }
    return code;
  }

  async onLoginSuccess(accessToken: string) {
    const JWT_EXPIRY_TIME = 2 * 3600 * 1000;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setTimeout(this.silentRefresh, JWT_EXPIRY_TIME - 30 * 1000);
  }
}
