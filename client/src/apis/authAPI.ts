import { joyrideAxios as axios } from './axios';
import { SetterOrUpdater } from 'recoil';
import { NewUser } from 'types/auth';
import { userAPI } from './userAPI';

type SetUserId = SetterOrUpdater<number | null>;

// TODO: 클로저 공부
export const authAPI = (() => {
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

  const login = async (
    email: string,
    password: string,
    isAuto: boolean,
    setUserId: SetUserId
  ) => {
    const {
      data: { code, result },
    } = await axios.post(`/auth/signin${isAuto ? '/auto' : ''}`, {
      email,
      password,
    });

    if (code !== 1000) {
      throw new Error(code);
    }

    handleLogin(result.accessToken, setUserId, result.userId);
  };

  const silentRefresh = async (setUserId: SetUserId) => {
    const {
      data: { code, result },
    } = await axios.post('/auth/jwt');

    console.log(code, result);
    // TODO: 자동 로그인 refresh token 중간에 만료됐을 때?
    if (code !== 1000) {
      userAPI.handleLogout(setUserId);
      return;
    }

    // refresh token 유효할 때
    handleLogin(result.accessToken, setUserId, result.userId);
  };

  const handleLogin = (
    accessToken: string,
    setUserId: SetUserId,
    userId: number
  ) => {
    axios.defaults.headers.common.Authorization = accessToken;
    setUserId(userId);
    // TODO: localStorage

    const JWT_EXPIRY_TIME_IN_SECONDS = 20 * 60;
    setTimeout(
      () => silentRefresh(setUserId),
      (JWT_EXPIRY_TIME_IN_SECONDS - 10) * 1000
    );
  };

  return {
    checkIfEmailExists,
    checkIfNicknameExists,
    signup,
    login,
    silentRefresh,
  };
})();
