import { CourseLevel } from './course';

export type RidingLevel = 1 | 2 | 3;
export type BicycleType = '따릉이' | 'MTB' | '로드바이크' | 'E' | 'T' | 'C';
export type CourseName = null | string;
export type RidingPath = string[];

export interface Meetup {
  id: number;
  title: string;
  image: string;
  meetingDate: Date;
  dueDate: Date;
  courseLevel: CourseLevel;
  ridingLevels: RidingLevel[];
  bicycleTypes: BicycleType[];
  currentParticipants: {}[]; // TODO
  maxNumOfParticipants: number;
  courseName: CourseName;
  ridingPath: RidingPath;
  location: string;
  gender: string;
  ages: number[];
  participationFee: number;
}
