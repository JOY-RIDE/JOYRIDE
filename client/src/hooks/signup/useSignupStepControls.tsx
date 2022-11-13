import { createContext, useContext } from 'react';

export const SignupStepControlsContext = createContext({});
export const useSignupStepControls = () =>
  useContext(SignupStepControlsContext);
