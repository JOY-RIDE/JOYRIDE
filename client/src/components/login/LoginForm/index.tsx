import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'states/atoms';
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
    // reValidateMode: 'onBlur',
  });

  // Variables
  const previousPage = useSearchParams()[0].get('next');
  const navigate = useNavigate();

  // Callbacks
  const openToast = useSetRecoilState(toastState);
  const onSubmit: SubmitHandler<LoginForm> = async data => {
    console.log(data);

    if (true) {
      openToast('이메일 또는 비밀번호가 잘못 입력되었습니다.');
      return;
    }

    // if (data.autoLogin) {
    // }

    // navigate(previousPage || '/');
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
