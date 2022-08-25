export type Location =
  | '서울'
  | '인천'
  | '경기'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주';
export type Gender = 'm' | 'f';
export type Age = 1 | 2 | 3 | 4 | 5;
export type BicycleType =
  | '따릉이'
  | 'MTB'
  | '로드바이크'
  | '하이브리드'
  | '미니벨로'
  | '기타';
export type RidingSkill = 1 | 2 | 3;

export interface FiltersDispatchPayload {
  key: string;
  value: number | string | boolean;
  content?: string;
}
export interface FilterOptionData {
  value: number | string | boolean;
  content: string;
}
export type FiltersDispatch<S> = (
  state: S,
  payload: FiltersDispatchPayload
) => S;
export type FilterClickHandler = (payload: FiltersDispatchPayload) => void;
