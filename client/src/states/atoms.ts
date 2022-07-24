import { atom } from 'recoil';

export const toastState = atom<string | null>({
  key: 'toast',
  default: null,
});
