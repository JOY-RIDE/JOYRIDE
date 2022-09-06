export type CourseLevel = 1 | 2 | 3;
export type CourseName = string;
export type CourseDifficulty = '1' | '2' | '3';

export interface IRoad {
  crsIdx: string;
  crsKorNm: string;
  crsDstnc: number;
  crsTotlRqrmHour: number;
  crsLevel: CourseDifficulty;
  crsContents: string;
  crsSummary: string;
  crsTourInfo: string;
  travelerinfo: string;
  sigun: string;
  brdDiv: string;
  cycle: string;
  createdtime: number;
  modifiedtime: number;
}

export type CourseFiltersKey = 'location' | 'pathDifficulty' | 'isCycle';
export interface CourseFiltersState {
  location?: any;
  pathDifficulty?: any;
  isCycle?: any;
}

export type CourseOrderName =
  | 'abc'
  | '-hour'
  | 'hour'
  | '-distance'
  | 'distance'
  | 'like'
  | 'rating';
