export type CourseLevel = 1 | 2 | 3;

export interface IRoad {
  id: number;
  crsContents: string;
  crsDstnc: number;
  crsKorNm: string;
  crsLevel: CourseLevel;
  crsSummary: string;
  crsTotlRqrmHour: number;
  crsTourInfo: string;
  sigun: string;
  image: null;
  travelerinfo: number;
  created_at: string;
  updated_at: string;
  required_at: number;
}
