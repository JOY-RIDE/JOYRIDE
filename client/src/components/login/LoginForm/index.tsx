import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userIdState } from 'states/auth';
import { toastMessageState } from 'states/common';
import { authAPI } from 'apis/authAPI';
import { AxiosError } from 'axios';
import AuthFormInput from 'components/common/AuthFormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import CheckBox from 'components/common/CheckBox';
import Button from 'components/common/Button';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface LoginForm {
  email: string;
  password: string;
  isAuto: boolean;
}

function getLoginFailErrorMessage(code: string) {
  switch (code) {
    case '2011':
      return '등록되지 않은 이메일입니다';
    case '2012':
      return '탈퇴한 회원입니다.';
    case '2112':
      return '비밀번호를 다시 확인해 주세요';
    default:
      return '로그인 중 문제가 발생했습니다.';
  }
}

const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
      isAuto: false,
    },
  });

  // Variables
  const nextURL = useSearchParams()[0].get('next');
  const navigate = useNavigate();

  // Callbacks
  const setUserId = useSetRecoilState(userIdState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const onSubmit: SubmitHandler<LoginForm> = async ({
    email,
    password,
    isAuto,
  }) => {
    try {
      await authAPI.login(email, password, isAuto, setUserId);
      // TODO
      // navigate(nextURL || '/');
    } catch (e) {
      if (e instanceof AxiosError) {
        showToastMessage(getLoginFailErrorMessage(e.message));
      } else if (e instanceof Error) {
        showToastMessage(getLoginFailErrorMessage(e.message));
      }
    }
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('fields')}>
        <div className={cn('field')}>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field }) => (
              <AuthFormInput
                type="email"
                placeholder="이메일"
                hasError={errors.email}
                {...field}
              />
            )}
          />
          {errors.email && <ErrorMessage message="이메일을 입력하세요" />}
        </div>

        <div className={cn('field')}>
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <AuthFormInput
                type="password"
                placeholder="비밀번호"
                hasError={errors.password}
                {...field}
              />
            )}
          />
          {errors.password && <ErrorMessage message="비밀번호를 입력하세요" />}
        </div>
      </div>

      <div className={cn('auto-login-wrapper')}>
        <Controller
          control={control}
          name="isAuto"
          render={({ field: { value: isChecked, ...others } }) => (
            <CheckBox
              shape="square"
              isChecked={isChecked}
              id={cn('auto-login')}
              {...others}
            />
          )}
        />
        <label htmlFor={cn('auto-login')}>자동 로그인</label>
      </div>

      <Button type="submit" color="main" size="lg" content="로그인하기" />
    </form>
  );
};

export default LoginForm;
