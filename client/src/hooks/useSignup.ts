import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/atoms';
import { authAPI } from 'apis/authAPI';
import { AxiosError } from 'axios';

export const useSignup = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);

  const validateEmail = async (email: string) => {
    try {
      await authAPI.checkIfEmailExists(email);
      return true;
    } catch (e) {
      let toastMessage = '';
      if (e instanceof Error) {
        if (e.message === '2017') return false;
        toastMessage = '이메일 중복 확인 중 에러가 발생했습니다';
        // TODO: AxiosError
      } else if (e instanceof AxiosError) {
        toastMessage = '네트워크 연결을 확인해 주세요';
      }
      showToastMessage(toastMessage);
    }
  };

  const validateNickname = async (nickname: string) => {
    try {
      await authAPI.checkIfNicknameExists(nickname);
      return true;
    } catch (e) {
      let toastMessage = '';
      if (e instanceof Error) {
        if (e.message === '2032') return false;
        toastMessage = '닉네임 중복 확인 중 에러가 발생했습니다';
      } else if (e instanceof AxiosError) {
        toastMessage = '네트워크 연결을 확인해 주세요';
      }
      showToastMessage(toastMessage);
    }
  };

  return { validateEmail, validateNickname };
};
