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

    const accessToken = result.token.accessToken;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  // async getNewAccessToken(refreshToken: string) {
  //   const {
  //     data: { code, result },
  //   } = await axios.post('/auth/jwt', { refreshToken });
  //   const accessToken = result?.token.accessToken;
  //   return { code, accessToken };
  // }
}
