import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
});

export const isLoggedInState = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

export const toastMessageState = atom<string>({
  key: 'toastMessage',
  default: '',
});

export const isCourseSortActiveState = atom<boolean>({
  key: 'isCourseSortActive',
  default: false,
});

export const CoursePageState = atom({
  key: 'course-page',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
