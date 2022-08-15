import { selector } from 'recoil';
import { isLoggedInState } from './atoms';

export const userDataState = selector({
  key: 'userData',
  get: async ({ get }) => {
    // TODO: 캐싱 확인
    const isLoggedIn = get(isLoggedInState);
    if (!isLoggedIn) return null;

    return await true;
  },
});
