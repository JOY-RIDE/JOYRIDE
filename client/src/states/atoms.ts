import { atom } from 'recoil';

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

export const toastMessageState = atom<string>({
  key: 'toastMessage',
  default: '',
});
