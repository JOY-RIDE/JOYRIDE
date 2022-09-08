import { BicycleType, Gender, Location, RidingSkill } from './common';
import { CourseName } from './course';

// Response 기준
export type MeetupID = number;
export type MeetupTitle = string;
export type MeetupImage = string;
export type MeetupMeetingDate = string;
export type MeetupDueDate = string;
export type MeetupGatheringPlace = string;
export type MeetupCourseName = null | CourseName;
export type MeetupPath = string[];
export type MeetupPathDifficulty = 1 | 2 | 3;
export type MeetupBicycleTypes = BicycleType[];
export type MeetupRidingSkill = RidingSkill;
export type MeetupMaxNumOfParticipants = number;
// export type MeetupParticipants = {}[]; // TODO
export type MeetupLocation = Location;
export type MeetupGender = Gender;
export type MeetupMinBirthYear = number;
export type MeetupMaxBirthYear = number;
export type MeetupParticipationFee = number;
export type MeetupContent = string;

// Request formData 내부
export interface NewMeetup {
  title: MeetupTitle;
  meetingImgUrl?: MeetupImage;
  meetingDate: Date;
  dueDate: Date;
  gatheringPlace: MeetupGatheringPlace;
  courseName: MeetupCourseName;
  path: string;
  pathDifficulty: MeetupPathDifficulty;
  bicycleTypes: MeetupBicycleTypes;
  ridingSkill: MeetupRidingSkill;
  maxPeople: MeetupMaxNumOfParticipants;
  localLocation: MeetupLocation;
  gender: MeetupGender;
  minBirthYear: MeetupMinBirthYear;
  maxBirthYear: MeetupMaxBirthYear;
  participationFee: MeetupParticipationFee;
  content: MeetupContent;
}

// Response
export interface Meetup
  extends Omit<NewMeetup, 'dueDate' | 'meetingDate' | 'path'> {
  id: MeetupID;
  dueDate: MeetupDueDate;
  meetingDate: MeetupMeetingDate;
  path: MeetupPath;
  joinPeople: number;
}

// export type MeetupFiltersKey =
//   | 'location'
//   | 'pathDifficulty'
//   | 'bicycleTypes'
//   | 'ridingSkill'
//   | 'minNumOfParticipants'
//   | 'maxNumOfParticipants'
//   | 'gender'
//   | 'age'
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
  age?: any;
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
//   age?: number[];
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
