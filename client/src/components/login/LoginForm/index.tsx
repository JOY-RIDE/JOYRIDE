import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'states/atoms';
import TextInput from 'components/common/TextInput';
import { FormControlLabel } from '@mui/material';
import CheckBox from 'components/common/CheckBox';
import Button from 'components/common/Button';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
// import ErrorMessage from 'components/common/ErrorMessage';

interface LoginForm {
  id: string;
  password: string;
  autoLogin: boolean;
}

const cn = classNames.bind(styles);

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      id: '',
      password: '',
    },
    // reValidateMode: 'onBlur',
  });

  // Variables
  const navigate = useNavigate();
  const { state } = useLocation();
  const previousPage = state as null | string;

  // Callbacks
  const openToast = useSetRecoilState(toastState);
  const login: SubmitHandler<LoginForm> = data => {
    console.log(data);

    if (true) {
      openToast('아이디 또는 비밀번호가 잘못 입력되었습니다.');
      return;
    }
    //
    // if (data.autoLogin) {
    // }
    // navigate(previousPage || '/');
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(login)}>
      <div className={cn('field')}>
        <Controller
          name="id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="아이디"
              errorMessage={errors.id && '아이디를 입력하세요'}
            />
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              {...field}
              type="password"
              placeholder="비밀번호"
              errorMessage={errors.password && '비밀번호를 입력하세요'}
            />
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
