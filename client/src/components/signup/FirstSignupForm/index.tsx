import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import FormInputWrapper from 'components/common/FormInputWrapper';
import FormInput from 'components/common/FormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import Button from 'components/common/Button';
import styles from './FirstSignupForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// Types/interfaces
type Field = 'id' | 'password' | 'passwordConfirm';
interface FirstSignupFormProps {
  goNext: () => void;
}
interface FirstSignupForm {
  id: string;
  password: string;
  passwordConfirm: string;
}

// Variables
const REQUIRED = 'required';
const PATTERN = 'pattern';
const VALIDATE = 'validate';

// Functions
function getPatternInfo(field: Field) {
  switch (field) {
    case 'id':
      return { pattern: /0/, helpText: '아이디 조건' };
    case 'password':
      return { pattern: /0/, helpText: '비밀번호 조건' };
    default:
      throw new Error();
  }
}

function getErrorMessage(field: Field, error: string) {
  switch (field) {
    case 'id': {
      switch (error) {
        case REQUIRED:
          return '아이디를 입력하세요';
        case PATTERN:
          return '~를 포함해야 합니다';
        case VALIDATE:
          return '이미 존재하는 아이디입니다';
        default:
          throw new Error();
      }
    }

    case 'password': {
      switch (error) {
        case REQUIRED:
          return '비밀번호를 입력하세요';
        case PATTERN:
          return '~를 포함해야 합니다';
        default:
          throw new Error();
      }
    }

    case 'passwordConfirm': {
      switch (error) {
        case REQUIRED:
          return '비밀번호를 확인해 주세요';
        case VALIDATE:
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
      id: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const password = watch('password');

  // TODO: 데이터들 state로 저장
  const onSubmit: SubmitHandler<FirstSignupForm> = async data => {
    console.log(data);
    // goNext()
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('field')}>
        <Controller
          control={control}
          name="id"
          rules={{
            required: true,
            pattern: getPatternInfo('id').pattern,
            validate: async () => true,
          }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                placeholder="아이디"
                helpText={!isSubmitted && getPatternInfo('id').helpText}
                hasError={errors.id}
                {...field}
              />
              {errors.id && (
                <ErrorMessage text={getErrorMessage('id', errors.id.type)} />
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
            pattern: getPatternInfo('password').pattern,
          }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                type="password"
                placeholder="비밀번호"
                helpText={!isSubmitted && getPatternInfo('password').helpText}
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
