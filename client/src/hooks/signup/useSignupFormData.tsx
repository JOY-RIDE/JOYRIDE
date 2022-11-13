import { SignupFormDataContext } from 'components/signup/SignupFormDataProvider';
import { useContext } from 'react';

const useSignupFormData = () => useContext(SignupFormDataContext);

export default useSignupFormData;
