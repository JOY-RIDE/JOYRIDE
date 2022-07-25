import { useState } from 'react';
import PageTitle from 'components/common/PageTitle';
import FirstSignupForm from 'components/signup/FirstSignupForm';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const TOTAL_STEPS = 2;

const Signup = () => {
  const [step, setStep] = useState<number>(1);
  const goNext = () => setStep(step => step + 1);
  const goPrevious = () => setStep(step => step - 1);

  return (
    <section className={cn('signup')}>
      <header className={cn('header')}>
        <PageTitle size="lg">회원가입</PageTitle>

        <div className={cn('steps')}>
          <span className={cn('current')}>{step}</span>
          <span className={cn('total')}>/{TOTAL_STEPS}</span>
        </div>
      </header>

      {step === 1 && <FirstSignupForm goNext={goNext} />}
    </section>
  );
};

export default Signup;
