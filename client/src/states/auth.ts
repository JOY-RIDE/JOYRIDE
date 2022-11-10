import { userAPI } from 'apis/userAPI';
import { atom, selector } from 'recoil';
import { UserProfile } from 'types/auth';

export const userIdState = atom<number | null>({
  key: 'userId',
  default: null,
});
export const userProfileState = selector<UserProfile | null>({
  key: 'userProfile',
  get: async ({ get }) => {
    const userId = get(userIdState);
    if (!userId) return null;
    return await userAPI.getProfile(userId);
  },
});
