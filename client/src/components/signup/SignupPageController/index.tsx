import FirstSignupForm from '../FirstSignupForm';
import SocialLogin from 'components/login/SocialLogin';
import { Link } from 'react-router-dom';
import SecondSignupForm from '../SecondSignupForm';
import styles from './SignupPageController.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SignupPageControllerProps {
  currentStep: number;
  totalSteps: number;
  goNext: () => void;
  goPrevious: () => void;
}

const SignupPageController = ({
  currentStep,
  totalSteps,
  goNext,
  goPrevious,
}: SignupPageControllerProps) => (
  <>
    <div className={cn('page', { expand: currentStep === 1 })}>
      <FirstSignupForm goNext={goNext} />
      <div className={cn('link')}>
        <Link to="/login" className={cn('login')}>
          이미 계정이 있으신가요?
        </Link>
      </div>
      <SocialLogin />
    </div>

    <div className={cn('page', { expand: currentStep === 2 })}>
      <SecondSignupForm goNext={goNext} goPrevious={goPrevious} />
    </div>

    <div className={cn('page', { expand: currentStep === totalSteps })}></div>
  </>
);

export default SignupPageController;
