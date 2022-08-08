import { atom } from 'recoil';
import AuthAPI from 'apis/AuthAPI';

const authAPI = new AuthAPI();
export const authAPIState = atom({ key: 'authAPI', default: authAPI });

interface User {
  email: string;
}
export const userState = atom<User | null>({
  key: 'user',
  default: null,
});

export const toastState = atom<string | null>({
  key: 'toast',
  default: null,
});
