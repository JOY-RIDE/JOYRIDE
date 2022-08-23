import { Age, BicycleType, Gender, Location, RidingSkill } from './common';
import { CourseName } from './course';

export type MeetupID = number;
export type MeetupTitle = string;
export type MeetupImage = string;
export type MeetupMeetingDate = Date;
export type MeetupDueDate = Date;
export type MeetupCourseName = null | CourseName;
export type MeetupPath = string[];
export type MeetupPathDifficulty = 1 | 2 | 3;
export type MeetupBicycleType = BicycleType;
export type MeetupMinRidingSkill = RidingSkill;
export type MeetupMinNumOfParticipants = number;
export type MeetupMaxNumOfParticipants = number;
export type MeetupParticipants = {}[];
export type MeetupLocation = Location;
export type MeetupGender = 'all' | Gender;
export type MeetupAge = Age;
export type MeetupParticipationFee = number;

export interface Meetup {
  id: MeetupID;
  title: MeetupTitle;
  image: MeetupImage;
  meetingDate: MeetupMeetingDate;
  dueDate: MeetupDueDate;
  courseName: MeetupCourseName;
  path: MeetupPath;
  pathDifficulty: MeetupPathDifficulty;
  bicycleTypes: MeetupBicycleType[];
  minRidingSkill: MeetupMinRidingSkill;
  minNumOfParticipants: MeetupMinNumOfParticipants;
  maxNumOfParticipants: MeetupMaxNumOfParticipants;
  participants: MeetupParticipants;
  location: MeetupLocation;
  gender: MeetupGender;
  ages: MeetupAge[];
  participationFee: MeetupParticipationFee;
}

export type MeetupFilterOption =
  | 'location'
  | 'pathDifficulty'
  | 'bicycleType'
  | 'ridingSkill'
  | 'minNumOfParticipants'
  | 'maxNumOfParticipants'
  | 'gender'
  | 'age'
  | 'hasParticipationFee';
export interface MeetupFilterState {
  location?: any;
  pathDifficulty?: any;
  bicycleType?: any;
  ridingSkill?: any;
  minNumOfParticipants?: any;
  maxNumOfParticipants?: any;
  gender?: any;
  age?: any;
  hasParticipationFee?: any;
}
// export interface MeetupFilterState {
//   location?: MeetupLocation;
//   pathDifficulty?: MeetupPathDifficulty;
//   bicycleType?: MeetupBicycleType[];
//   ridingSkill?: MeetupMinRidingSkill;
//   minNumOfParticipants?: MeetupMinNumOfParticipants;
//   maxNumOfParticipants?: MeetupMaxNumOfParticipants;
//   gender?: MeetupGender;
//   age?: MeetupAge[];
//   hasParticipationFee?: boolean;
// }
export type MeetupOrderOption = '-createdAt' | 'meetingDate';
