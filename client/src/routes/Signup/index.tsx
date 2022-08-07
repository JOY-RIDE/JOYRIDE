import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { firstSignupFormState } from 'components/signup/FirstSignupForm';
import { secondSignupFormState } from 'components/signup/SecondSignupForm';
import PageTitle from 'components/common/PageTitle';
import SignupCompleted from 'components/signup/SignupCompleted';
import SignupFormController from 'components/signup/SignupFormController';
import SignupTerms from 'components/signup/SignupTerms';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const TOTAL_STEPS = 2;

const Signup = () => {
  const [currentStep, setcurrentStep] = useState<number>(0);
  const goNext = () => setcurrentStep(step => step + 1);
  const goPrevious = () => setcurrentStep(step => step - 1);

  const { email } = useRecoilValue(firstSignupFormState);
  const { nickname } = useRecoilValue(secondSignupFormState);

  if (currentStep > TOTAL_STEPS) {
    return <SignupCompleted email={email} nickname={nickname} />;
  }

  return (
    <div className={cn('wrapper')}>
      <header className={cn('header')}>
        <PageTitle size="lg">회원가입</PageTitle>
        {currentStep ? (
          <div className={cn('steps')}>
            <span className={cn('current')}>{currentStep}</span>
            <span className={cn('total')}>/{TOTAL_STEPS}</span>
          </div>
        ) : null}
      </header>

      {currentStep ? (
        <SignupFormController
          currentStep={currentStep}
          goNext={goNext}
          goPrevious={goPrevious}
        />
      ) : (
        <SignupTerms goNext={goNext} />
      )}
    </div>
  );
};

export default Signup;
