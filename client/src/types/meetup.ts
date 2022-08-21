import { CourseLevel } from './course';

export type RidingLevel = 1 | 2 | 3;

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
  courseName: null | string;
  ridingPath: string;
  location: string;
  gender: string;
  ages: number[];
  participationFee: number;
}
