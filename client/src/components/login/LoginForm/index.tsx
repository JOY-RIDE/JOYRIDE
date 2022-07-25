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
  id: string;
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
      id: '',
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
      openToast('아이디 또는 비밀번호가 잘못 입력되었습니다.');
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
          name="id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput {...field} placeholder="아이디" hasError={errors.id} />
              {errors.id && <ErrorMessage>아이디를 입력하세요</ErrorMessage>}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                {...field}
                type="password"
                placeholder="비밀번호"
                hasError={errors.password}
              />
              {errors.password && (
                <ErrorMessage>비밀번호를 입력하세요</ErrorMessage>
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('auto-login')}>
        <Controller
          name="autoLogin"
          control={control}
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