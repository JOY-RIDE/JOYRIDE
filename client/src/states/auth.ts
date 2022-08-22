import { atom } from 'recoil';

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
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
