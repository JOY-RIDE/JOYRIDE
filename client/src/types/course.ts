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

export interface ServerIRoads extends IRoad {
  id: string;
  image: string;
  likeCount: number;
  rating: number;
}

export interface ServerIRoad {
  accessibilityAvg: number;
  created_at: string;
  crsContents: string;
  crsDstnc: number;
  crsKorNm: string;
  crsLevel: number;
  crsSummary: string;
  crsTourInfo: string;
  facilitiesAvg: number;
  getCourseReviewRes: [
    {
      accessibility_rate: number;
      accessibility_review: string;
      created_at: string;
      facilities_rate: number;
      facilities_review: string;
      id: number;
      nickName: string;
      safety_rate: number;
      safety_review: string;
      scene_rate: number;
      scene_review: string;
      title: string;
      total_rate: number;
      total_review: string;
      updated_at: string;
      user_id: number;
    }
  ];
  id: string;
  image: string;
  isLike: number;
  latitude: string;
  longitude: string;
  required_at: number;
  safetyAvg: number;
  sceneAvg: number;
  sigun: string;
  totalAvg: number;
  travelerinfo: string;
  updated_at: string;
}

export type CourseFiltersKey = 'location' | 'pathDifficulty' | 'isCycle';
export interface CourseFiltersState {
  location?: any;
  pathDifficulty?: any;
  isCycle?: any;
}

export type CourseOrderName =
  | 'crsKorNm'
  | '-crsTotlRqrmHour'
  | 'crsTotlRqrmHour'
  | '-crsDstnc'
  | 'crsDstnc'
  | 'likeCount'
  | 'rating';
export interface CourseOrderState {
  name: CourseOrderName;
  content: string;
}
