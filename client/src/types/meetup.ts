import { Age, BicycleType, Gender, Location, RidingSkill } from './common';
import { CourseName } from './course';

export type MeetupID = number;
export type MeetupTitle = string;
export type MeetupImage = null | string;
export type MeetupMeetingDate = Date;
export type MeetupDueDate = Date;
export type MeetupCourseName = null | CourseName;
export type MeetupPath = string[];
export type MeetupPathDifficulty = 1 | 2 | 3;
export type MeetupBicycleTypes = BicycleType[];
export type MeetupRidingSkill = RidingSkill; // TODO
export type MeetupMaxNumOfParticipants = number;
export type MeetupParticipants = {}[]; // TODO
export type MeetupLocation = Location;
export type MeetupGender = 'mixed' | Gender;
export type MeetupAges = Age[];
export type MeetupParticipationFee = number;
export type MeetupContent = null | string;

export interface CreatedMeetup {
  title: MeetupTitle;
  image: MeetupImage;
  meetingDate: MeetupMeetingDate;
  dueDate: MeetupDueDate;
  courseName: MeetupCourseName;
  path: MeetupPath;
  pathDifficulty: MeetupPathDifficulty;
  bicycleTypes: MeetupBicycleTypes;
  ridingSkill: MeetupRidingSkill;
  maxNumOfParticipants: MeetupMaxNumOfParticipants;
  location: MeetupLocation;
  gender: MeetupGender;
  ages: MeetupAges;
  participationFee: MeetupParticipationFee;
  content: MeetupContent;
}

export interface Meetup extends CreatedMeetup {
  id: MeetupID;
  participants: MeetupParticipants;
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
