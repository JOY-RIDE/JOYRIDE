import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FirstSignupForm from '../FirstSignupForm';

// Interfaces
interface SignupFormControllerProps {
  currentStep: number;
  goNext: () => void;
  goPrevious: () => void;
}
interface FirstForm {
  id: string;
  password: string;
  passwordConfirm: string;
}

const SignupFormController = ({
  currentStep,
  goNext,
  goPrevious,
}: SignupFormControllerProps) => {
  // FIRST FORM
  const firstFormMethods = useForm<FirstForm>({
    defaultValues: {
      id: '',
      password: '',
      passwordConfirm: '',
    },
    // reValidateMode: 'onBlur',
  });

  // TODO: useWatch
  const id = firstFormMethods.watch('id');
  const password = firstFormMethods.watch('password');
  const passwordConfirm = firstFormMethods.watch('passwordConfirm');
  const handleFirstFormSubmit: SubmitHandler<FirstForm> = () => {
    // if () {
    //   // 아이디 중복 확인 요청
    //   return;
    // }

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

  return currentStep === 1 ? (
    <FormProvider {...firstFormMethods}>
      <FirstSignupForm {...firstFormProps} />
    </FormProvider>
  ) : null;
};

export default SignupFormController;
