import { joyrideAxios as axios } from 'apis/axios';
import { userAPI } from 'apis/userAPI';
import useSetUserId from './useSetUserId';

const JWT_EXPIRY_TIME_IN_SECONDS = 20 * 60;

const useAuthAPI = () => {
  const setUserId = useSetUserId();

  const silentlyRefreshAccessTokenAfterInterval = () =>
    setTimeout(
      silentlyRefreshAccessToken,
      (JWT_EXPIRY_TIME_IN_SECONDS - 5) * 1000
    );

  const handleAuthenticationSuccess = (accessToken: string, userId: number) => {
    axios.defaults.headers.common.Authorization = accessToken;
    setUserId(userId);
    silentlyRefreshAccessTokenAfterInterval();
  };

  const login = async (email: string, password: string, isAuto: boolean) => {
    const {
      data: { code, result },
    } = await axios.post('/auth/signin' + (isAuto ? '/auto' : ''), {
      email,
      password,
    });

    if (code !== 1000) {
      throw new Error(code);
    }
    handleAuthenticationSuccess(result.accessToken, result.userId);
  };

  const silentlyRefreshAccessToken = async () => {
    const {
      data: { code, result },
    } = await axios.post('/auth/jwt');

    // 유효한 로그인 상태일 때 (유효한 refresh token)
    if (code === 1000) {
      handleAuthenticationSuccess(result.accessToken, result.userId);
      return;
    }

    if (code === 2003) {
      window.alert('로그인 유지 토큰이 만료되어 로그아웃됩니다.');
    }
    userAPI.handleLogout(setUserId);
  };

  return {
    login,
    silentlyRefreshAccessToken,
  };
};

export default useAuthAPI;
