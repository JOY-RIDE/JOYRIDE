import { createContext, useContext, useState } from 'react';
import { SignupFormData, SignupStepControls } from 'types/auth';
import PageTitle from 'components/common/PageTitle';
import SignupForms from 'components/signup/SignupForms';
import SignupCompleted from 'components/signup/SignupCompleted';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const SignupStepControlsContext = createContext({});
export const useSignupStepControls = () =>
  useContext(SignupStepControlsContext);

const SignupFormDataContext = createContext({});
export const useSignupFormDataContext = () => useContext(SignupFormDataContext);

const TOTAL_STEPS = 3;
const INITIAL_SIGNUP_FORM_DATA = { email: '', password: '', nickname: '' };

const Signup = () => {
  const [step, setStep] = useState<number>(1);
  const decreaseStep = () => setStep(step => step - 1);
  const increaseStep = () => setStep(step => step + 1);

  const [signupFormData, setSignupFormData] = useState<SignupFormData>(
    INITIAL_SIGNUP_FORM_DATA
  );

  return (
    <SignupStepControlsContext.Provider
      value={{
        decreaseStep,
        increaseStep,
      }}
    >
      <SignupFormDataContext.Provider
        value={{ data: signupFormData, setData: setSignupFormData }}
      >
        {step <= TOTAL_STEPS ? (
          <>
            <header className={cn('header')}>
              <PageTitle size="lg">회원가입</PageTitle>
              <div className={cn('steps')}>
                <span className={cn('current')}>{step}</span>
                <span className={cn('total')}>/{TOTAL_STEPS}</span>
              </div>
            </header>
            <SignupForms step={step} totalSteps={TOTAL_STEPS} />
          </>
        ) : (
          <SignupCompleted />
        )}
      </SignupFormDataContext.Provider>
    </SignupStepControlsContext.Provider>
  );
};

export default Signup;
