import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FirstSignupForm from '../FirstSignupForm';
import SocialLogin from 'components/login/SocialLogin';
import { Link } from 'react-router-dom';
import SecondSignupForm from '../SecondSignupForm';
import styles from './SignupPageController.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// Interfaces
interface SignupPageControllerProps {
  currentPage: number;
  goNext: () => void;
  goPrevious: () => void;
}
interface FirstForm {
  id: string;
  password: string;
  passwordConfirm: string;
}

const SignupPageController = ({
  currentPage,
  goNext,
  goPrevious,
}: SignupPageControllerProps) => {
  // FIRST FORM
  const firstFormMethods = useForm<FirstForm>({
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
    },
    // reValidateMode: 'onBlur',
  });

  const id = firstFormMethods.watch('id');
  const password = firstFormMethods.watch('password');
  const passwordConfirm = firstFormMethods.watch('passwordConfirm');
  const handleFirstFormSubmit: SubmitHandler<FirstForm> = () => {
    goNext();
    console.log(id, password, passwordConfirm);
  };

  const firstFormProps = {
    id,
    password,
    passwordConfirm,
    onSubmit: handleFirstFormSubmit,
  };

  // SECOND FORM

  return currentPage === 1 ? (
    <>
      <FormProvider {...firstFormMethods}>
        <FirstSignupForm {...firstFormProps} />
      </FormProvider>
      <div className={cn('link')}>
        <Link to="/login" className={cn('login')}>
          아이디가 있으신가요?
        </Link>
      </div>
      <SocialLogin />
    </>
  ) : (
    <SecondSignupForm />
  );
};

export default SignupPageController;
