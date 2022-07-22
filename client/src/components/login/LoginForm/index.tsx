import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import TextInput from 'components/common/TextInput';
import { FormControlLabel } from '@mui/material';
import CheckBox from 'components/common/CheckBox';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
// import ErrorMessage from 'components/common/ErrorMessage';
import { useState } from 'react';

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
    // reValidateMode: 'onBlur',
  });

  const [hasFailed, setHasFailed] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const previousPage = state as null | string;

  const login: SubmitHandler<LoginForm> = data => {
    // setHasFailed(true);
    navigate(previousPage || '/');
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

      {/* {hasFailed && (
        <div className={cn('fail')}>
          <ErrorMessage>
            아이디 또는 비밀번호가 잘못 입력되었습니다.
          </ErrorMessage>
        </div> // TODO: 팝오버
      )} */}

      <div className={cn('auto-login')}>
        <FormControlLabel control={<CheckBox />} label="자동 로그인" />
      </div>

      <button>로그인하기</button>
    </form>
  );
};

export default LoginForm;
