import SignupTerms from '../SignupTerms';
import SignupBasicForm from '../SignupBasicForm';
import SocialLogin from 'components/login/SocialLogin';
import { Link } from 'react-router-dom';
import SignupDetailForm from '../SignupDetailForm';
import styles from './SignupFormController.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SignupFormsProps {
  step: number;
  totalSteps: number;
}

const SignupForms = ({ step, totalSteps }: SignupFormsProps) => (
  <>
    <div className={cn('page', { expand: step === 1 })}>
      <SignupTerms />
    </div>
    <div className={cn('page', { expand: step === 2 })}>
      <SignupBasicForm />
      <div className={cn('link')}>
        <Link to="/login" className={cn('login')}>
          이미 계정이 있으신가요?
        </Link>
      </div>
      <SocialLogin />
    </div>
    <div className={cn('page', { expand: step === totalSteps })}>
      <SignupDetailForm />
    </div>
  </>
);

export default SignupForms;
