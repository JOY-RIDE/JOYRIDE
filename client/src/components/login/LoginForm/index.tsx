import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from '../../common/TextInput';
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
      <Controller
        name="id"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextInput {...field} placeholder="아이디" />}
      />
      {errors.id && <p>Required</p>}

      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput {...field} type="password" placeholder="비밀번호" />
        )}
      />
      {errors.password && <p>Required</p>}

      <button>로그인하기</button>
    </form>
  );
};

export default LoginForm;
