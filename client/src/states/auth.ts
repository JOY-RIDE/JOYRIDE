import { userAPI } from 'apis/userAPI';
import { atom, selector } from 'recoil';
import { SignupFormData, UserProfile } from 'types/auth';

export const userIDState = atom<number | null>({
  key: 'userID',
  default: null,
});
export const userProfileState = selector<UserProfile | null>({
  key: 'userProfile',
  get: async ({ get }) => {
    // TODO: 캐싱 확인
    const userID = get(userIDState);
    if (!userID) return null;
    return await userAPI.getProfile(userID);
  },
});

export const signupFormDataState = atom<SignupFormData>({
  key: 'signupFormData',
  default: { email: '', password: '', nickname: '' },
});
