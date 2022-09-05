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
  gender: string;
  birthYear: number;
  bicycleType: string;
  bicycleCareer: number;
  introduce: string | null;
  isTermsEnable: boolean;
}

export interface UserDataState {
  nickname: string;
  image: string;
}
