import { userAPI } from 'apis/userAPI';
import { atom, selector } from 'recoil';
import { SignupFormData, UserDataState } from 'types/auth';

export const userIDState = atom<number | null>({
  key: 'userID',
  default: null,
});
export const userDataState = selector<UserDataState>({
  key: 'userData',
  get: async ({ get }) => {
    // TODO: 캐싱 확인
    const userID = get(userIDState);
    if (!userID) return null;
    return await userAPI.getUserData(userID);
  },
});

export const signupFormDataState = atom<SignupFormData>({
  key: 'signupFormData',
  default: { email: '', password: '', nickname: '' },
});
