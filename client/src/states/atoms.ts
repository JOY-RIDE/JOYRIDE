import { atom } from 'recoil';
import AuthAPI from 'apis/AuthAPI';

const authAPI = new AuthAPI();
export const authAPIState = atom({ key: 'authAPI', default: authAPI });

export const toastState = atom<string | null>({
  key: 'toast',
  default: null,
});
