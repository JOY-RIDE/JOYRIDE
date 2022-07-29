import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FirstSignupForm from '../FirstSignupForm';
import SocialLogin from 'components/login/SocialLogin';
import { Link } from 'react-router-dom';
import SecondSignupForm from '../SecondSignupForm';
import styles from './SignupPageController.module.scss';
import classNames from 'classnames/bind';

// TODO: refactor

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

interface SecondForm {
  nickname: string;
  gender: number | null;
  age: number | null;
  bicycleType: string | null;
  introduce: string | null;
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
  const secondFormMethods = useForm<SecondForm>({
    defaultValues: {
      nickname: '',
      gender: null,
      age: null,
      bicycleType: null,
      introduce: null,
    },
    // reValidateMode: 'onBlur',
  });

  const nickname = secondFormMethods.watch('nickname');
  const gender = secondFormMethods.watch('gender');
  const age = secondFormMethods.watch('age');
  const bicycleType = secondFormMethods.watch('bicycleType');
  const introduce = secondFormMethods.watch('introduce');
  const handleSecondFormSubmit: SubmitHandler<SecondForm> = async data => {
    goNext();
  };

  const secondFormProps = {
    nickname,
    gender,
    age,
    bicycleType,
    introduce,
    onSubmit: handleSecondFormSubmit,
    goPrevious,
  };

  if (currentPage === 1) {
    return (
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
    );
  } else if (currentPage === 2) {
    return (
      <FormProvider {...secondFormMethods}>
        <SecondSignupForm {...secondFormProps} />
      </FormProvider>
    );
  } else return null;
};

export default SignupPageController;
