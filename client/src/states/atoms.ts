import { atom } from 'recoil';
import AuthAPI from 'apis/AuthAPI';

export const loggedInState = atom<boolean>({
  key: 'loggedIn',
  default: false,
});

const authAPI = new AuthAPI();
export const authAPIState = atom({ key: 'authAPI', default: authAPI });

export const toastState = atom<string | null>({
  key: 'toast',
  default: null,
});
