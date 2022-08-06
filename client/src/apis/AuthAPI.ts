import axios from 'apis/axios';

interface NewUser {
  isTermsEnable: boolean;
  email: string;
  password: string;
  nickname: string;
  gender: string | null;
  old: number | null;
  bicycleType: string | null;
  introduce: string | null;
}

export default class AuthAPI {
  async signup(payload: NewUser) {
    // TODO: message X
    const {
      data: { code, message },
    } = await axios.post('/auth/signup', payload, {
      withCredentials: true,
    });
    console.log(message);
    return code;
  }

  async login() {}
}
