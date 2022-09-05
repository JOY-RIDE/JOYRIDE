import { atom, selector } from 'recoil';
import { SignupFormData } from 'types/auth';

export const userIDState = atom<number | null>({
  key: 'userID',
  default: null,
});
export const userDataState = selector({
  key: 'userData',
  get: async ({ get }) => {
    // TODO: 캐싱 확인
    const userID = get(userIDState);
    if (!userID) return null;
    return await true;
  },
});

export const signupFormDataState = atom<SignupFormData>({
  key: 'signupFormData',
  default: { email: '', password: '', nickname: '' },
});
