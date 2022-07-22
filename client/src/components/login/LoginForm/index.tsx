import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from 'components/common/TextInput';
import { FormControlLabel } from '@mui/material';
import CheckBox from 'components/common/CheckBox';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';

interface LoginForm {
  id: string;
  password: string;
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
    reValidateMode: undefined,
  });

  const navigate = useNavigate();
  const { state } = useLocation();
  const previousPage = state as null | string;

  const login: SubmitHandler<LoginForm> = data => {
    navigate(previousPage || '/');
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(login)}>
      <div className={cn('field')}>
        <Controller
          name="id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <TextInput {...field} placeholder="아이디" />}
        />
        {errors.id && <p>Required</p>}
      </div>

      <div className={cn('field')}>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput {...field} type="password" placeholder="비밀번호" />
          )}
        />
        {errors.password && <p>Required</p>}
      </div>

      <FormControlLabel control={<CheckBox />} label="자동 로그인" />

      <button>로그인하기</button>
    </form>
  );
};

export default LoginForm;
