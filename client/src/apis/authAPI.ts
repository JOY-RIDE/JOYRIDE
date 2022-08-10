import { joyrideAxios as axios } from './axios';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from 'states/atoms';

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

export const authAPI = {
  // const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  async signup(newUser: NewUser) {
    const {
      data: { code },
    } = await axios.post('/auth/signup', newUser);

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  async checkIfEmailExists(email: string) {
    const {
      data: { code },
    } = await axios.get('/auth/email', { params: { email } });

    // TODO
    console.log(typeof code);
    if (code !== 1000) {
      throw new Error(code);
    }
  },

  async checkIfNicknameExists(nickname: string) {
    const {
      data: { code },
    } = await axios.get('/auth/nickname', { params: { nickname } });

    if (code !== 1000) {
      throw new Error(code);
    }
  },

  //  const login = async (
  //     email: string,
  //     password: string,
  //     isAuto: boolean,
  //   ) => {
  //     const {
  //       data: { code, result },
  //     } = await axios.post(`/auth/signin${isAuto ? '/auto' : ''}`, {
  //       email,
  //       password,
  //     });

  //     if (code !== 1000) {
  //       throw new Error(code);
  //     }

  //     onLoginSuccess(result.accessToken);
  //   }

  // const silentRefresh = async () => {
  //   try {
  //     const {
  //       data: { code, result },
  //     } = await axios.post('/auth/jwt');

  //     if (code !== 1000) {
  //       // TODO: 로그아웃
  //       setIsLoggedIn(false);
  //       return;
  //     }

  //     handleLoginSuccess(result.accessToken);
  //   } catch (e) {
  //     // refresh cookie X
  //   }
  // };

  // const handleLoginSuccess = (accessToken: string) => {
  //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   setIsLoggedIn(true);
  //   const JWT_EXPIRY_TIME_IN_SECONDS = 2 * 3600;
  //   setTimeout(() => silentRefresh(), (JWT_EXPIRY_TIME_IN_SECONDS - 30) * 1000);
  // };
};
