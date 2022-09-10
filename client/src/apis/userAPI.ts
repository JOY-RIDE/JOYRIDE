import { SetterOrUpdater } from 'recoil';
import { joyrideAxios as axios } from './axios';

type SetUserId = SetterOrUpdater<number | null>;

export const userAPI = {
  async getProfile(userId: number) {
    const {
      data: { code, result },
    } = await axios.get(`/users/${userId}`);

    if (code !== 1000) {
      throw new Error(code);
    }

    return {
      ...result,
      image: result.profileImgUrl,
      ridingSkill: result.bicycleCareer,
    };
  },

  async logout(setUserId: SetUserId) {
    const {
      data: { code },
    } = await axios.post('/users/signout');

    if (code === 1000) {
      this.handleLogout(setUserId);
    }
  },

  handleLogout(setUserId: SetUserId) {
    delete axios.defaults.headers.common.Authorization;
    setUserId(null);
    localStorage.removeItem('userId');
  },
};
