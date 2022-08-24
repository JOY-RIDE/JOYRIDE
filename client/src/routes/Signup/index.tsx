import { createContext, useContext, useState } from 'react';
import { SignupStepControls } from 'types/authentication';
import { atom, useRecoilValue } from 'recoil';
import PageTitle from 'components/common/PageTitle';
import SignupForms from 'components/signup/SignupForms';
import SignupCompleted from 'components/signup/SignupCompleted';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// Interfaces
interface SignupBasicFormData {
  email: string;
  password: string;
}
interface SignupDetailFormData {
  nickname: string;
}
type SignupFormData = SignupBasicFormData & SignupDetailFormData;

// State/context
export const signupFormDataState = atom<SignupFormData>({
  key: 'signupFormData',
  default: { email: '', password: '', nickname: '' },
});

const SignupStepControlsContext = createContext<SignupStepControls>({
  decreaseStep: () => {},
  increaseStep: () => {},
});
export const useSignupStepControls = () =>
  useContext(SignupStepControlsContext);

const TOTAL_STEPS = 3;

const Signup = () => {
  // TODO: recoil
  const [step, setStep] = useState<number>(1);
  const decreaseStep = () => setStep(step => step - 1);
  const increaseStep = () => setStep(step => step + 1);

  const { email, nickname } = useRecoilValue(signupFormDataState);
  if (step > TOTAL_STEPS) {
    return <SignupCompleted email={email} nickname={nickname} />;
  }

  return (
    <SignupStepControlsContext.Provider
      value={{
        decreaseStep,
        increaseStep,
      }}
    >
      <section className={cn('page')}>
        <header className={cn('header')}>
          <PageTitle size="lg">회원가입</PageTitle>
          <div className={cn('steps')}>
            <span className={cn('current')}>{step}</span>
            <span className={cn('total')}>/{TOTAL_STEPS}</span>
          </div>
        </header>

        <SignupForms step={step} totalSteps={TOTAL_STEPS} />
      </section>
    </SignupStepControlsContext.Provider>
  );
};

export default Signup;
