import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAPIState, toastState, userState } from 'states/atoms';
import FormInputWrapper from 'components/common/FormInputWrapper';
import FormInput from 'components/common/FormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import { FormControlLabel } from '@mui/material';
import CheckBox from 'components/common/CheckBox';
import Button from 'components/common/Button';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface LoginForm {
  email: string;
  password: string;
  autoLogin: boolean;
}

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
      autoLogin: false,
    },
    reValidateMode: 'onBlur',
  });

  // Variables
  const authAPI = useRecoilValue(authAPIState);
  const setUser = useSetRecoilState(userState);
  // TODO: Header에서 Link 설정
  const previousPage = useSearchParams()[0].get('next');
  const navigate = useNavigate();

  // Callbacks
  const openToast = useSetRecoilState(toastState);
  const onSubmit: SubmitHandler<LoginForm> = async ({
    email,
    password,
    autoLogin,
  }) => {
    try {
      const { code, accessToken } = await authAPI.login(email, password);
      // if (autoLogin) {
      // }
      if (code === 1000) {
        setUser({ email, accessToken });
        navigate(previousPage || '/');
        return;
      }

      if (code === 2011) {
        openToast('등록되지 않은 이메일입니다');
      } else if (code === 2112) {
        openToast('비밀번호를 다시 확인해 주세요');
      } else {
        openToast('로그인 중 에러가 발생했습니다. 관리자에게 문의해 주세요');
      }
    } catch (e) {
      openToast('로그인 중 에러가 발생했습니다. 다시 시도해 주세요');
    }
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('field')}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                type="email"
                placeholder="이메일"
                hasError={errors.email}
                {...field}
              />
              {errors.email && <ErrorMessage text="이메일을 입력하세요" />}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                type="password"
                placeholder="비밀번호"
                hasError={errors.password}
                {...field}
              />
              {errors.password && <ErrorMessage text="비밀번호를 입력하세요" />}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('auto-login')}>
        <Controller
          control={control}
          name="autoLogin"
          render={({ field: { value: isChecked, ...others } }) => (
            <FormControlLabel
              control={<CheckBox isChecked={isChecked} {...others} />}
              label="자동 로그인"
            />
          )}
        />
      </div>

      <Button color="main" size="lg" text="로그인하기" />
    </form>
  );
};

export default LoginForm;
