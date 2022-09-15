import { BicycleType, Gender, RidingSkill } from './common';

export interface SignupStepControls {
  decreaseStep: () => void;
  increaseStep: () => void;
}
export interface SignupBasicFormData {
  email: string;
  password: string;
}
export interface SignupDetailFormData {
  nickname: string;
}
export type SignupFormData = SignupBasicFormData & SignupDetailFormData;
export interface NewUser {
  email: string;
  password: string;
  nickname: string;
  gender: Gender;
  birthYear: number;
  bicycleType: BicycleType;
  bicycleCareer: number;
  // introduce: string | null;
  isTermsEnable: boolean;
}

export interface UserProfile {
  nickname: string;
  image: string;
  profileImgUrl: string;
  gender: Gender;
  birthYear: number;
  bicycleType: BicycleType;
  ridingSkill: RidingSkill;
  introduce: string | null;
  manner: number;
}
