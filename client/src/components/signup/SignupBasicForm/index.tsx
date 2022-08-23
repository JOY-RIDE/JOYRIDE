import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { authAPI } from 'apis/authAPI';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { signupFormDataState, useSignupStepControls } from 'routes/Signup';
import AuthFormInputWithErrorMessageWrapper from 'components/common/AuthFormInputWithErrorMessageWrapper';
import AuthFormInput from 'components/common/AuthFormInput';
import { REGEX } from 'utils/constants';
import ErrorMessage from 'components/common/ErrorMessage';
import { getSignupFormFieldErrorMessage } from 'utils/getErrorMessage';
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
    } catch (e) {
      if (e instanceof AxiosError) {
        setError('email', { type: 'etc' });
      } else if (e instanceof Error) {
        setError('email', {
          type: e.message === '2017' ? 'duplicated' : 'etc',
        });
      }
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
              pattern: REGEX.email,
            }}
            render={({ field }) => (
              <AuthFormInputWithErrorMessageWrapper>
                <AuthFormInput
                  placeholder="이메일"
                  hasError={Boolean(errors.email)}
                  {...field}
                />
                {errors.email && (
                  <ErrorMessage
                    content={getSignupFormFieldErrorMessage(
                      'email',
                      errors.email.type
                    )}
                  />
                )}
              </AuthFormInputWithErrorMessageWrapper>
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
              <AuthFormInputWithErrorMessageWrapper>
                <AuthFormInput
                  type="password"
                  placeholder="비밀번호"
                  helpcontent={!isSubmitted && '비밀번호 조건'}
                  hasError={Boolean(errors.password)}
                  {...field}
                />
                {errors.password && (
                  <ErrorMessage
                    content={getSignupFormFieldErrorMessage(
                      'password',
                      errors.password.type
                    )}
                  />
                )}
              </AuthFormInputWithErrorMessageWrapper>
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
              <AuthFormInputWithErrorMessageWrapper>
                <AuthFormInput
                  type="password"
                  placeholder="비밀번호 확인"
                  hasError={Boolean(errors.passwordConfirm)}
                  {...field}
                />
                {errors.passwordConfirm && (
                  <ErrorMessage
                    content={getSignupFormFieldErrorMessage(
                      'passwordConfirm',
                      errors.passwordConfirm.type
                    )}
                  />
                )}
              </AuthFormInputWithErrorMessageWrapper>
            )}
          />
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
        <Button color="main" size="md" content="계속" />
      </div>
    </form>
  );
};

export default SignupBasicForm;
