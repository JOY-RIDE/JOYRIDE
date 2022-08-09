import axios from './axios';

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
type SetLoggedIn = (loggedIn: boolean) => void;

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
    return code === 1000;
  }

  async checkNickname(nickname: string) {
    const {
      data: { code },
    } = await axios.get('/auth/nickname', { params: { nickname } });
    return code === 1000;
  }

  async login(
    email: string,
    password: string,
    isAuto: boolean,
    setLoggedIn: SetLoggedIn
  ) {
    const {
      data: { code, result },
    } = await axios.post(`/auth/signin${isAuto ? '/auto' : ''}`, {
      email,
      password,
    });

    if (code !== 1000) {
      throw new Error(code);
    }

    this.onLoginSuccess(result.accessToken, setLoggedIn);
  }

  async onLoginSuccess(accessToken: string, setLoggedIn: SetLoggedIn) {
    const JWT_EXPIRY_TIME = 2 * 3600 * 1000;
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setLoggedIn(true);
    setTimeout(
      () => this.silentRefresh(setLoggedIn),
      JWT_EXPIRY_TIME - 30 * 1000
    );
  }

  async silentRefresh(setLoggedIn: SetLoggedIn) {
    try {
      const {
        data: { code, result },
      } = await axios.post('/auth/jwt');

      if (code !== 1000) {
        // TODO: 로그아웃
        setLoggedIn(false);
        return;
      }

      this.onLoginSuccess(result.accessToken, setLoggedIn);
    } catch (e) {
      // refresh cookie X
    }
  }
}
