import { joyrideAxios as axios } from './axios';
import { SetterOrUpdater } from 'recoil';

type SetIsLoggedIn = SetterOrUpdater<boolean>;
export interface NewUser {
  isTermsEnable: boolean;
  email: string;
  password: string;
  nickname: string;
  gender: string | null;
  old: number | null;
  bicycleType: string | null;
  introduce: string | null;
}

// TODO: 클로저 공부
export const authAPI = (() => {
  // const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const checkIfEmailExists = async (email: string) => {
    const {
      data: { code },
    } = await axios.get('/auth/email', { params: { email } });

    if (code !== 1000) {
      throw new Error(code);
    }
  };

  const checkIfNicknameExists = async (nickname: string) => {
    const {
      data: { code },
    } = await axios.get('/auth/nickname', { params: { nickname } });

    if (code !== 1000) {
      throw new Error(code);
    }
  };

  const signup = async (newUser: NewUser) => {
    const {
      data: { code },
    } = await axios.post('/auth/signup', newUser);

    if (code !== 1000) {
      throw new Error(code);
    }
  };

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

  // const silentRefresh = async (setIsLoggedIn: SetIsLoggedIn) => {
  //   try {
  //     const {
  //       data: { code, result },
  //     } = await axios.post('/auth/jwt');

  //     if (code !== 1000) {
  //       // TODO: 로그아웃
  //       delete axios.defaults.headers.common.Authorization;
  //       setIsLoggedIn(false);
  //       return;
  //     }

  //     handleLoginSuccess(result.accessToken, setIsLoggedIn);
  //   } catch (e) {
  //     // refresh cookie X
  //   }
  // };

  // const handleLoginSuccess = (
  //   accessToken: string,
  //   setIsLoggedIn: SetIsLoggedIn
  // ) => {
  //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  //   setIsLoggedIn(true);

  //   const JWT_EXPIRY_TIME_IN_SECONDS = 2 * 3600;
  //   setTimeout(
  //     () => silentRefresh(setIsLoggedIn),
  //     (JWT_EXPIRY_TIME_IN_SECONDS - 30) * 1000
  //   );
  // };

  return { checkIfEmailExists, checkIfNicknameExists, signup };
})();
