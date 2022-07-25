import { useState } from 'react';
import PageTitle from 'components/common/PageTitle';
import SignupFormController from 'components/signup/SignupFormController';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const TOTAL_STEPS = 2;

const Signup = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const goNext = () => setCurrentStep(step => step + 1);
  const goPrevious = () => setCurrentStep(step => step - 1);
  const formControllerProps = { currentStep, goNext, goPrevious };

  return (
    <section className={cn('signup')}>
      <header className={cn('header')}>
        <PageTitle size="lg">회원가입</PageTitle>

        <div className={cn('steps')}>
          <span className={cn('current')}>{currentStep}</span>
          <span className={cn('total')}>/{TOTAL_STEPS}</span>
        </div>
      </header>

      <SignupFormController {...formControllerProps} />
    </section>
  );
};

export default Signup;
