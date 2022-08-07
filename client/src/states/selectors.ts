import { selector } from 'recoil';
import { userState } from './atoms';

export const userDataState = selector({
  key: 'userData',
  get: async ({ get }) => {
    // TODO: 캐싱 확인
    const user = get(userState);
    if (!user) return null;

    return await { image: 'src' };
  },
});
