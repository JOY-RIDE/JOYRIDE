import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { signupFormDataState, useSignupStepControls } from 'routes/Signup';
import { useSignup } from 'hooks/useSignup';
import FormInputWithErrorMessageWrapper from 'components/common/FormInputWithErrorMessageWrapper';
import FormInput from 'components/common/FormInput';
import { REGEX } from 'utils/constants';
import { getSignupFormErrorMessage } from 'utils/getErrorMessage';
import ErrorMessage from 'components/common/ErrorMessage';
import Button from 'components/common/Button';
import styles from './SignupBasicForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SignupBasicForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignupBasicForm = () => {
  const {
    control,
    formState: { isSubmitted, errors },
    watch,
    handleSubmit,
  } = useForm<SignupBasicForm>({
    // TODO: yup
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    reValidateMode: 'onBlur',
  });
  const password = watch('password');

  const { validateEmail } = useSignup();
  const setSignupFormData = useSetRecoilState(signupFormDataState);
  const { decreaseStep, increaseStep } = useSignupStepControls();

  const onSubmit: SubmitHandler<SignupBasicForm> = async ({
    email,
    password,
  }) => {
    setSignupFormData(data => ({ ...data, email, password }));
    increaseStep();
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('field')}>
        <label className={cn('label')}>
          <h4 className={cn('title')}>이메일</h4>
        </label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: REGEX.email,
            validate: email => validateEmail(email),
          }}
          render={({ field }) => (
            <FormInputWithErrorMessageWrapper>
              <FormInput
                placeholder="이메일"
                hasError={Boolean(errors.email)}
                {...field}
              />
              {errors.email && (
                <ErrorMessage
                  text={getSignupFormErrorMessage('email', errors.email.type)}
                />
              )}
            </FormInputWithErrorMessageWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <label className={cn('label')}>
          <h4 className={cn('title')}>비밀번호</h4>
        </label>
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
            minLength: 8,
            pattern: REGEX.password,
          }}
          render={({ field }) => (
            <FormInputWithErrorMessageWrapper>
              <FormInput
                type="password"
                placeholder="비밀번호"
                helpText={!isSubmitted && '비밀번호 조건'}
                hasError={Boolean(errors.password)}
                {...field}
              />
              {errors.password && (
                <ErrorMessage
                  text={getSignupFormErrorMessage(
                    'password',
                    errors.password.type
                  )}
                />
              )}
            </FormInputWithErrorMessageWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <label className={cn('label')}>
          <h4 className={cn('title')}>비밀번호 확인</h4>
        </label>
        <Controller
          control={control}
          name="passwordConfirm"
          rules={{
            required: true,
            validate: passwordConfirm => passwordConfirm === password,
          }}
          render={({ field }) => (
            <FormInputWithErrorMessageWrapper>
              <FormInput
                type="password"
                placeholder="비밀번호 확인"
                hasError={Boolean(errors.passwordConfirm)}
                {...field}
              />
              {errors.passwordConfirm && (
                <ErrorMessage
                  text={getSignupFormErrorMessage(
                    'passwordConfirm',
                    errors.passwordConfirm.type
                  )}
                />
              )}
            </FormInputWithErrorMessageWrapper>
          )}
        />
      </div>

      <div className={cn('btns')}>
        <Button
          type="button"
          color="white"
          size="md"
          text="이전"
          onClick={decreaseStep}
        />
        <Button color="main" size="md" text="계속" />
      </div>
    </form>
  );
};

export default SignupBasicForm;
