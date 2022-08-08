import { selector } from 'recoil';
import { loggedInState } from './atoms';

export const userDataState = selector({
  key: 'userData',
  get: async ({ get }) => {
    // TODO: 캐싱 확인
    const loggedIn = get(loggedInState);
    if (!loggedIn) return null;

    return await { image: 'src' };
  },
});
