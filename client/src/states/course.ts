import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { CourseOrderName, CourseFiltersState } from 'types/course';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
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

export const COURSE_FILTERS_INITIAL_STATE = {
  location: { value: '전체', content: '전체' },
};

export const courseFiltersState = atom<CourseFiltersState>({
  key: 'meetupFilters',
  default: COURSE_FILTERS_INITIAL_STATE,
});
export const courseBoardFiltersState = atom<CourseFiltersState>({
  key: 'meetupFilterBoard',
  default: COURSE_FILTERS_INITIAL_STATE,
});

export const courseOrderState = atom<CourseOrderName>({
  key: 'courseOrder',
  default: 'abc',
});
