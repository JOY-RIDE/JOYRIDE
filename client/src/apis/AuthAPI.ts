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
      data: { code, message },
    } = await axios.post('/auth/signup', newUser);
    return code;
  }

  async checkEmail(email: string) {
    const {
      data: { code },
    } = await axios.get('/auth/email', { params: { email } });
    return code;
  }

  async checkNickname(nickname: string) {
    const {
      data: { code },
    } = await axios.get('/auth/nickname', { params: { nickname } });
    return code;
  }

  async login(email: string, password: string) {
    const {
      data: { code, result },
    } = await axios.post('/auth/signin', { email, password });
    const accessToken = result?.token.accessToken;
    return { code, accessToken };
  }
}
