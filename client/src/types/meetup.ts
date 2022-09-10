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
export type MeetupLocation = Location;
export type MeetupGender = Gender;
export type MeetupMinBirthYear = number;
export type MeetupMaxBirthYear = number;
export type MeetupParticipationFee = number;
export type MeetupContent = string;
export type MeetupParticipant = {
  id: number;
  nickname: string;
  profile_img_url: string;
  manner: number;
};

// Request formData 내부
export interface NewMeetup {
  title: MeetupTitle;
  meetingImgUrl?: MeetupImage;
  dueDate: MeetupDueDate;
  meetingDate: MeetupMeetingDate;
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
export interface MeetupData extends Omit<NewMeetup, 'path'> {
  id: MeetupID;
  path: MeetupPath;
  joinPeople: number;
}
export interface MeetupDetail extends MeetupData {
  admin: MeetupParticipant;
  participants: MeetupParticipant[];
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
//   | 'participationFee';
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
  participationFee?: any;
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
//   participationFee?: boolean;
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
