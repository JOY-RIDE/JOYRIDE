import { SetterOrUpdater } from 'recoil';
import { joyrideAxios as axios } from './axios';

type SetUserID = SetterOrUpdater<number | null>;

export const userAPI = {
  async getProfile(userID: number) {
    const {
      data: { code, result },
    } = await axios.get(`/users/${userID}`);

    if (code !== 1000) {
      // TODO
      throw new Error(code);
    }

    return {
      ...result,
      image: result.profileImgUrl,
      ridingSkill: result.bicycleCareer,
    };
  },

  async logout(setUserID: SetUserID) {
    const {
      data: { code, result },
    } = await axios.post('/users/signout');

    // TODO
    console.log(code, result);
    if (code === 1000) {
      this.handleLogout(setUserID);
    }
  },

  handleLogout(setUserID: SetUserID) {
    delete axios.defaults.headers.common.Authorization;
    setUserID(null);
  },
};
