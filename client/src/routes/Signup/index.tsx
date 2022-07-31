import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { firstSignupFormState } from 'components/signup/FirstSignupForm';
import { secondSignupFormState } from 'components/signup/SecondSignupForm';
import PageTitle from 'components/common/PageTitle';
import SignupCompleted from 'components/signup/SignupCompleted';
import SignupPageController from 'components/signup/SignupPageController';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const TOTAL_STEPS = 3;

const Signup = () => {
  const [currentStep, setcurrentStep] = useState<number>(1);
  const goNext = () => setcurrentStep(step => step + 1);
  const goPrevious = () => setcurrentStep(step => step - 1);

  const { email } = useRecoilValue(firstSignupFormState);
  const { nickname } = useRecoilValue(secondSignupFormState);
  if (currentStep === TOTAL_STEPS) {
    return <SignupCompleted email={email} nickname={nickname} />;
  }

  return (
    <div className={cn('wrapper')}>
      <header className={cn('header')}>
        <PageTitle size="lg">회원가입</PageTitle>
        <div className={cn('steps')}>
          <span className={cn('current')}>{currentStep}</span>
          <span className={cn('total')}>/{TOTAL_STEPS}</span>
        </div>
      </header>

      <SignupPageController
        currentStep={currentStep}
        goNext={goNext}
        goPrevious={goPrevious}
      />
    </div>
  );
};

export default Signup;
