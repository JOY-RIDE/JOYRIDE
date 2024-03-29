export interface Option<V> {
  value: V;
  content: string;
}

export type Location =
  | '서울'
  | '부산'
  | '대구'
  | '인천'
  | '광주'
  | '대전'
  | '울산'
  | '세종'
  | '경기'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주';
export type Gender = 'm' | 'f' | 'mixed';
export type Age = 1 | 2 | 3 | 4 | 5;
export type BicycleType =
  | '따릉이'
  | 'MTB'
  | '로드바이크'
  | '그래블'
  | '하이브리드'
  | '미니벨로'
  | '기타';
export type RidingSkill = 1 | 2 | 3 | 4 | 5;

export interface FiltersReducerPayload {
  key: string;
  value?: number | string | boolean;
  content?: string;
}
export interface FilterOptionData {
  value: number | string | boolean;
  content: string;
}
export type FiltersReducer<S> = (state: S, payload: FiltersReducerPayload) => S;
export type FiltersDispatch = (payload: FiltersReducerPayload) => void;

export interface OrderState {
  name: string;
  content: string;
}
export interface OrderOption extends OrderState {
  sign?: string;
}

export interface Comment {
  id: number;
  userId: number;
  nickname: string;
  profileImgUrl: string;
  content: string;
  createdAt: string;
}
