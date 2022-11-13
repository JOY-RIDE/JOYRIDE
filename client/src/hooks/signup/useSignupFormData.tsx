import { createContext, useContext } from 'react';

export const SignupFormDataContext = createContext({});
export const useSignupFormData = () => useContext(SignupFormDataContext);
