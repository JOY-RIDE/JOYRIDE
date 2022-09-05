import { SetterOrUpdater } from 'recoil';
import { joyrideAxios as axios } from './axios';

type SetIsLoggedIn = SetterOrUpdater<boolean>;

export const userAPI = {
  async logout(setIsLoggedIn: SetIsLoggedIn) {
    const {
      data: { code },
    } = await axios.post('/users/signout');

    console.log(code);

    if (code === 1000) {
      delete axios.defaults.headers.common.Authorization;
      setIsLoggedIn(false);
    }
  },
};
