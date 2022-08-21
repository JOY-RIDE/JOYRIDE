import { CourseLevel } from './course';

export type RidingLevel = 1 | 2 | 3;
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
  bicycleTypes: string[];
  currentParticipants: {}[]; // TODO
  maxNumOfParticipants: number;
  courseName: CourseName;
  ridingPath: RidingPath;
  location: string;
  gender: string;
  ages: number[];
  participationFee: number;
}
