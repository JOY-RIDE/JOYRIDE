import { createContext, PropsWithChildren, useState } from 'react';
import { SignupFormData } from 'types/auth';

const INITIAL_SIGNUP_FORM_DATA = { email: '', password: '', nickname: '' };
export const SignupFormDataContext = createContext<[SignupFormData, any]>([
  INITIAL_SIGNUP_FORM_DATA,
  () => {},
]);

// step 변화 시 === data 변화 시
const SignupFormDataProvider = ({ children }: PropsWithChildren) => {
  const value = useState<SignupFormData>(INITIAL_SIGNUP_FORM_DATA);
  return (
    <SignupFormDataContext.Provider value={value}>
      {children}
    </SignupFormDataContext.Provider>
  );
};

export default SignupFormDataProvider;
