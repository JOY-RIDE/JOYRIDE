import { atom } from 'recoil';
import { SignupFormData } from 'types/authentication';

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

export const signupFormDataState = atom<SignupFormData>({
  key: 'signupFormData',
  default: { email: '', password: '', nickname: '' },
});

// export const userDataState = selector({
//   key: 'userData',
//   get: async ({ get }) => {
//     // TODO: 캐싱 확인
//     const isLoggedIn = get(isLoggedInState);
//     if (!isLoggedIn) return null;

//     return await true;
//   },
// });
