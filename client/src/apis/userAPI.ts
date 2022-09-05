import { SetterOrUpdater } from 'recoil';
import { joyrideAxios as axios } from './axios';

type SetIsLoggedIn = SetterOrUpdater<boolean>;

export const userAPI = {
  async logout(setIsLoggedIn: SetIsLoggedIn) {
    const {
      data: { code, result },
    } = await axios.post('/users/signout');

    console.log(code, result);
    if (code === 1000) {
      this.handleLogout(setIsLoggedIn);
    }
  },

  handleLogout(setIsLoggedIn: SetIsLoggedIn) {
    delete axios.defaults.headers.common.Authorization;
    setIsLoggedIn(false);
  },
};
