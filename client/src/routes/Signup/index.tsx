import { useState } from 'react';
import PageTitle from 'components/common/PageTitle';
import SignupPageController from 'components/signup/SignupPageController';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const TOTAL_STEPS = 3;

const Signup = () => {
  const [currentStep, setcurrentStep] = useState<number>(1);
  const goNext = () => setcurrentStep(step => step + 1);
  const goPrevious = () => setcurrentStep(step => step - 1);

  return (
    <div className={cn('signup')}>
      <header className={cn('header')}>
        <PageTitle size="lg">회원가입</PageTitle>
        <div className={cn('steps')}>
          <span className={cn('current')}>{currentStep}</span>
          <span className={cn('total')}>/{TOTAL_STEPS}</span>
        </div>
      </header>

      <SignupPageController
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        goNext={goNext}
        goPrevious={goPrevious}
      />
    </div>
  );
};

export default Signup;
