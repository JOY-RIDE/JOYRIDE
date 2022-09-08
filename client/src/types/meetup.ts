import { BicycleType, Gender, Location, RidingSkill } from './common';
import { CourseName } from './course';

export type MeetupID = number;
export type MeetupTitle = string;
export type MeetupImage = string;
// export type MeetupMeetingDate = Date;
// export type MeetupDueDate = Date;
export type MeetupGatheringPlace = string;
export type MeetupCourseName = null | CourseName;
export type MeetupPath = string[];
export type MeetupPathDifficulty = 1 | 2 | 3;
export type MeetupBicycleTypes = BicycleType[];
export type MeetupRidingSkill = RidingSkill;
// export type MeetupMaxNumOfParticipants = number;
// export type MeetupParticipants = {}[]; // TODO
export type MeetupLocation = Location;
export type MeetupGender = Gender;
export type MeetupMinBirthYear = number;
export type MeetupMaxBirthYear = number;
export type MeetupParticipationFee = number;
export type MeetupContent = string;

export interface NewMeetup {
  title: MeetupTitle;
  image: MeetupImage | null;
  meetingDate: Date;
  dueDate: Date;
  gatheringPlace: MeetupGatheringPlace;
  courseName: MeetupCourseName;
  path: MeetupPath;
  pathDifficulty: MeetupPathDifficulty;
  bicycleTypes: MeetupBicycleTypes;
  ridingSkill: MeetupRidingSkill;
  maxNumOfParticipants: number;
  location: MeetupLocation;
  gender: MeetupGender;
  minBirthYear: MeetupMinBirthYear;
  maxBirthYear: MeetupMaxBirthYear;
  participationFee: MeetupParticipationFee;
  content: MeetupContent;
}

export interface Meetup
  extends Omit<
    NewMeetup,
    'image' | 'dueDate' | 'meetingDate' | 'maxNumOfParticipants' | 'location'
  > {
  id: MeetupID;
  meetingImgUrl: MeetupImage;
  dueDate: string;
  meetingDate: string;
  localLocation: MeetupLocation;
  maxPeople: number;
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
