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

// interface SecondForm {
//   nickname: string;
//   gender: number | null;
//   age: number | null;
//   bicycleType: number | string;
//   introduce: string;
// }

const SignupPageController = ({
  currentStep,
  totalSteps,
  goNext,
  goPrevious,
}: SignupPageControllerProps) => {
  // // SECOND FORM
  // const secondFormMethods = useForm<SecondForm>({
  //   defaultValues: {
  //     nickname: '',
  //     gender: null,
  //     age: null,
  //     bicycleType: '',
  //     introduce: '',
  //   },
  //   // reValidateMode: 'onBlur',
  // });

  // const handleSecondFormSubmit: SubmitHandler<SecondForm> = async data => {
  //   goNext();
  // };

  // const secondFormProps = {
  //   nickname,
  //   gender,
  //   age,
  //   bicycleType,
  //   introduce,
  //   onSubmit: handleSecondFormSubmit,
  //   goPrevious,
  // };

  return (
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
        {/* <SecondSignupForm goNext={goNext} goPrevious={goPrevious} /> */}
      </div>

      <div className={cn('page', { expand: currentStep === totalSteps })}></div>
    </>
  );
};

export default SignupPageController;
