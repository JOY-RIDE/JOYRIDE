import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/atoms';
import { authAPI, NewUser } from 'apis/authAPI';

export const useSignup = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);

  const validateEmail = async (email: string) => {
    try {
      await authAPI.checkIfEmailExists(email);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === '2017') return false;
        showToastMessage('이메일 중복 확인 중 에러가 발생했습니다');
      }
    }
  };

  const validateNickname = async (nickname: string) => {
    try {
      await authAPI.checkIfNicknameExists(nickname);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === '2032') return false;
        showToastMessage('닉네임 중복 확인 중 에러가 발생했습니다');
      }
    }
  };

  const signup = async (newUser: NewUser) => {
    try {
      await authAPI.signup(newUser);
    } catch (e) {
      if (e instanceof Error) {
        showToastMessage('회원가입 중 에러가 발생했습니다');
      }
    }
  };

  return { validateEmail, validateNickname, signup };
};
