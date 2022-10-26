import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { CourseOrderState, CourseFiltersState } from 'types/course';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
});

export const CoursePageState = atom({
  key: 'course-page',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const COURSE_FILTERS_INITIAL_STATE = {
  // location: { value: '전체', content: '전체' },
};

export const courseFiltersState = atom<CourseFiltersState>({
  key: 'courseFilters',
  default: COURSE_FILTERS_INITIAL_STATE,
});
export const courseBoardFiltersState = atom<CourseFiltersState>({
  key: 'courseFilterBoard',
  default: COURSE_FILTERS_INITIAL_STATE,
});

export const courseOrderState = atom<CourseOrderState>({
  key: 'courseOrder',
  default: { name: 'crsKorNm', content: '가나다순' },
});

export const reviewFilterState = atom({
  key: 'reviewFilter',
  default: '전체',
});
