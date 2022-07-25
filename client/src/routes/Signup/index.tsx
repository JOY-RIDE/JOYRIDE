import { useState } from 'react';
import PageTitle from 'components/common/PageTitle';
import SignupPageController from 'components/signup/SignupPageController';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const TOTAL_STEPS = 2;

const Signup = () => {
  const [currentPage, setcurrentPage] = useState<number>(1);
  const goNext = () => setcurrentPage(step => step + 1);
  const goPrevious = () => setcurrentPage(step => step - 1);
  const pageControllerProps = { currentPage, goNext, goPrevious };

  return (
    <section className={cn('signup')}>
      <header className={cn('header')}>
        <PageTitle size="lg">회원가입</PageTitle>

        <div className={cn('steps')}>
          <span className={cn('current')}>{currentPage}</span>
          <span className={cn('total')}>/{TOTAL_STEPS}</span>
        </div>
      </header>

      <SignupPageController {...pageControllerProps} />
    </section>
  );
};

export default Signup;
