import { useContext } from 'react';
import { SignupStepActionsContext } from 'routes/Auth/Signup';

const useSignupStepActions = () => useContext(SignupStepActionsContext);

export default useSignupStepActions;
