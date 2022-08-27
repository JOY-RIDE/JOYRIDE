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
export type MeetupRidingSkill = RidingSkill;
export type MeetupMinNumOfParticipants = number;
export type MeetupMaxNumOfParticipants = number;
export type MeetupParticipants = {}[];
export type MeetupLocation = Location;
export type MeetupGender = Gender;
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
  ridingSkill: MeetupRidingSkill;
  minNumOfParticipants: MeetupMinNumOfParticipants;
  maxNumOfParticipants: MeetupMaxNumOfParticipants;
  participants: MeetupParticipants;
  location: MeetupLocation;
  gender: MeetupGender;
  ages: MeetupAge[];
  participationFee: MeetupParticipationFee;
}

// export type MeetupFiltersKey =
//   | 'location'
//   | 'pathDifficulty'
//   | 'bicycleTypes'
//   | 'ridingSkill'
//   | 'minNumOfParticipants'
//   | 'maxNumOfParticipants'
//   | 'gender'
//   | 'ages'
//   | 'isParticipationFree';
// TODO: refactor
export interface MeetupFiltersState {
  location?: any;
  pathDifficulty?: any;
  bicycleTypes?: any;
  ridingSkill?: any;
  minNumOfParticipants?: any;
  maxNumOfParticipants?: any;
  gender?: any;
  ages?: any;
  isParticipationFree?: any;
}
// export interface MeetupFiltersState {
//   location?: string;
//   pathDifficulty?: number;
//   bicycleTypes?: string[];
//   ridingSkill?: number;
//   minNumOfParticipants?: number;
//   maxNumOfParticipants?: number;
//   gender?: string;
//   ages?: number[];
//   isParticipationFree?: boolean;
// }

export type MeetupOrderName =
  | '-createdAt'
  | 'meetingDate'
  | 'pathDifficulty'
  | '-pathDifficulty'
  | 'ridingSkill'
  | '-ridingSkill'
  | 'maxNumOfParticipants'
  | '-maxNumOfParticipants'
  | 'participationFee';
export interface MeetupOrderState {
  name: MeetupOrderName;
  content: string;
}
