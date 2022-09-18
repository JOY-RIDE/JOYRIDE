import SignupTermsForm from '../SignupTermsForm';
import SignupBasicForm from '../SignupBasicForm';
import SocialLogin from 'components/login/SocialLogin';
import { Link } from 'react-router-dom';
import SignupDetailForm from '../SignupDetailForm';
import styles from './SignupForms.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SignupFormsProps {
  step: number;
  totalSteps: number;
}

const SignupForms = ({ step, totalSteps }: SignupFormsProps) => (
  <>
    <div className={cn('form-wrapper', { expand: step === 1 })}>
      <SignupTermsForm />
      <div className={cn('login-wrapper')}>
        <Link to="/auth/login" className={cn('login')}>
          이미 계정이 있으신가요?
        </Link>
      </div>
      {/* <SocialLogin /> */}
    </div>
    <div className={cn('form-wrapper', { expand: step === 2 })}>
      <SignupBasicForm />
    </div>
    <div className={cn('form-wrapper', { expand: step === totalSteps })}>
      <SignupDetailForm />
    </div>
  </>
);

export default SignupForms;
