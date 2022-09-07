import styles from './PasswordResetForm.module.scss';
import classNames from 'classnames/bind';
import TextInput from 'components/common/TextInput';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessage from 'components/common/ErrorMessage';
import Button from 'components/common/Button';

const cn = classNames.bind(styles);

interface PasswordResetForm {
  email: string;
}

const PasswordResetForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordResetForm>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordResetForm> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className={cn('fields')}> */}
      <div className={cn('field')}>
        <label className={cn('label')}>
          <h4>이메일</h4>
        </label>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              type="email"
              placeholder="이메일을 입력하세요"
              {...field}
            />
          )}
        />
        {errors.email && <ErrorMessage message="필수 항목입니다" />}
      </div>
      {/* </div> */}

      <div className={cn('btn')}>
        <Button
          type="submit"
          color="main"
          size="lg"
          content="비밀번호 재설정"
        />
      </div>
    </form>
  );
};

export default PasswordResetForm;
