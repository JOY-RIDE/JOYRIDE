import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FormInputWrapper from 'components/common/FormInputWrapper';
import FormInput from 'components/common/FormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import Button from 'components/common/Button';
import styles from './FirstSignupForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// Types/interfaces
type Field = 'email' | 'password' | 'passwordConfirm';
interface FirstSignupFormProps {
  goNext: () => void;
}
interface FirstSignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

function getErrorMessage(field: Field, error: string) {
  switch (field) {
    case 'email': {
      switch (error) {
        case 'required':
          return '이메일을 입력하세요';
        case 'validate':
          return '이미 등록된 이메일입니다';
        default:
          throw new Error();
      }
    }

    case 'password': {
      switch (error) {
        case 'required':
          return '비밀번호를 입력하세요';
        case 'pattern':
          return '~를 포함해야 합니다';
        default:
          throw new Error();
      }
    }

    case 'passwordConfirm': {
      switch (error) {
        case 'required':
          return '비밀번호를 확인해 주세요';
        case 'validate':
          return '동일한 비밀번호를 입력해 주세요';
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}

const FirstSignupForm = ({ goNext }: FirstSignupFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted, errors },
    watch,
  } = useForm<FirstSignupForm>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const password = watch('password');

  // TODO: 데이터들 state로 저장
  const onSubmit: SubmitHandler<FirstSignupForm> = async data => {
    console.log(data);
    goNext();
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: 아이디 + 이메일 회사 */}
      <div className={cn('field')}>
        {/* TODO: label 추가 */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            validate: async () => false,
          }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                type="email"
                placeholder="이메일"
                hasError={errors.email}
                {...field}
              />
              {errors.email && (
                <ErrorMessage
                  text={getErrorMessage('email', errors.email.type)}
                />
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: true,
            pattern: /0/,
          }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                type="password"
                placeholder="비밀번호"
                helpText={!isSubmitted && '비밀번호 조건'}
                hasError={errors.password}
                {...field}
              />
              {errors.password && (
                <ErrorMessage
                  text={getErrorMessage('password', errors.password.type)}
                />
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          control={control}
          name="passwordConfirm"
          rules={{ required: true, validate: value => value === password }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                type="password"
                placeholder="비밀번호 확인"
                hasError={errors.passwordConfirm}
                {...field}
              />
              {errors.passwordConfirm && (
                <ErrorMessage
                  text={getErrorMessage(
                    'passwordConfirm',
                    errors.passwordConfirm.type
                  )}
                />
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('btn')}>
        <Button color="main" size="lg" text="계속" />
      </div>
    </form>
  );
};

export default FirstSignupForm;
