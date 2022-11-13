import { createContext, useState } from 'react';
import PageTitle from 'components/common/PageTitle';
import SignupForms from 'components/signup/SignupForms';
import SignupCompleted from 'components/signup/SignupCompleted';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';
import SignupFormDataProvider from 'components/signup/SignupFormDataProvider';

const cn = classNames.bind(styles);
const TOTAL_STEPS = 3;

export const SignupStepActionsContext = createContext({
  increaseStep: () => {},
  decreaseStep: () => {},
});

// TODO: refactor
const Signup = () => {
  const [step, setStep] = useState<number>(1);
  const decreaseStep = () => setStep(step => step - 1);
  const increaseStep = () => setStep(step => step + 1);

  return (
    // 따로 분리한 step provider 쓰려면 하위 컴포넌트 구조 수정 필요
    <SignupStepActionsContext.Provider value={{ decreaseStep, increaseStep }}>
      {/* TODO: SignupForms에서 그냥 prop으로..? */}
      <SignupFormDataProvider>
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
      </SignupFormDataProvider>
    </SignupStepActionsContext.Provider>
  );
};

export default Signup;
