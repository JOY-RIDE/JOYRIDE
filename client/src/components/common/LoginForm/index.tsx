import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextField from '../TextField';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';

interface Form {
  id: string;
  password: string;
}

const cn = classNames.bind(styles);

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Form> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="id"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField {...field} placeholder="아이디" />}
      />
      {errors.id && <p>Required</p>}

      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField {...field} type="password" placeholder="비밀번호" />
        )}
      />
      {errors.password && <p>Required</p>}

      <button>로그인</button>
    </form>
  );
};

export default LoginForm;
