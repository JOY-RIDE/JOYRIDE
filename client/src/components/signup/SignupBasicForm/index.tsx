import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { authAPI } from 'apis/authAPI';
import { useSetRecoilState } from 'recoil';
import { useSignupStepControls } from 'routes/Auth/Signup';
import AuthFormInput from 'components/common/AuthFormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import { getSignupFormFieldErrorMessage } from 'utils/getErrorMessage';
import Button from 'components/common/Button';
import styles from './SignupBasicForm.module.scss';
import classNames from 'classnames/bind';
import { signupFormDataState } from 'states/auth';
import { REGEX } from 'utils/regex';

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
    setError,
  } = useForm<SignupBasicForm>({
    // TODO: yup
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    // reValidateMode: 'onBlur',
  });
  const password = watch('password');

  const validateEmail = async (email: string) => {
    try {
      await authAPI.checkIfEmailExists(email);
      return true;
    } catch (e: any) {
      setError(
        'email',
        {
          type: e.message === '2017' ? 'duplicated' : 'etc',
        },
        { shouldFocus: true }
      );
      return false;
    }
  };

  const setSignupFormData = useSetRecoilState(signupFormDataState);
  const { decreaseStep, increaseStep } = useSignupStepControls();
  const onSubmit: SubmitHandler<SignupBasicForm> = async ({
    email,
    password,
  }) => {
    const isEmailValid = await validateEmail(email);
    if (!isEmailValid) return;
    setSignupFormData(data => ({ ...data, email, password }));
    increaseStep();
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('fields')}>
        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4 className={cn('title')}>이메일</h4>
          </label>
          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <AuthFormInput
                type="email"
                placeholder="이메일"
                hasError={!!errors.email}
                {...field}
              />
            )}
          />
          {errors.email && (
            <ErrorMessage
              message={getSignupFormFieldErrorMessage(
                'email',
                errors.email.type
              )}
            />
          )}
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
              maxLength: 16,
              pattern: REGEX.password,
            }}
            render={({ field }) => (
              <AuthFormInput
                type="password"
                placeholder="비밀번호"
                helpText={
                  !isSubmitted && '8~16자의 영문 대/소문자+숫자+특수문자'
                }
                hasError={!!errors.password}
                {...field}
              />
            )}
          />
          {errors.password && (
            <ErrorMessage
              message={getSignupFormFieldErrorMessage(
                'password',
                errors.password.type
              )}
            />
          )}
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
              <AuthFormInput
                type="password"
                placeholder="비밀번호 확인"
                hasError={!!errors.passwordConfirm}
                {...field}
              />
            )}
          />
          {errors.passwordConfirm && (
            <ErrorMessage
              message={getSignupFormFieldErrorMessage(
                'passwordConfirm',
                errors.passwordConfirm.type
              )}
            />
          )}
        </div>
      </div>

      <div className={cn('btns')}>
        <Button
          type="button"
          color="whiteGrey"
          size="md"
          content="이전"
          onClick={decreaseStep}
        />
        <Button type="submit" color="main" size="md" content="계속" />
      </div>
    </form>
  );
};

export default SignupBasicForm;
