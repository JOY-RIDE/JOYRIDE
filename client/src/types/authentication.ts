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
