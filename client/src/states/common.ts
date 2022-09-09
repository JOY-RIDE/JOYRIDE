import { ReactElement } from 'react';
import { atom } from 'recoil';

export const toastMessageState = atom<string>({
  key: 'toastMessage',
  default: '',
});

export const modalContentState = atom<ReactElement | null>({
  key: 'modalContent',
  default: null,
});
