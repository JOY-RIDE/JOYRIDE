import { Controller, useFormContext } from 'react-hook-form';
import FormInputWrapper from 'components/common/FormInputWrapper';
import FormInput from 'components/common/FormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import Button from 'components/common/Button';
import styles from './FirstSignupForm.module.scss';
import classNames from 'classnames/bind';
// import ErrorMessage from 'components/common/ErrorMessage';

const cn = classNames.bind(styles);

// Types/interfaces
type Field = 'id' | 'password' | 'passwordConfirm';
interface FirstSignupFormProps {
  id: string;
  password: string;
  passwordConfirm: string;
  onSubmit: any;
}

// Variables
const REQUIRED = 'required';
const PATTERN = 'pattern';
const VALIDATE = 'validate';

// Functions
function chooseErrorMessage(field: Field, errorType: string) {
  switch (field) {
    case 'id':
    case 'password': {
      if (errorType === REQUIRED) {
        return `${field === 'id' ? '아이디' : '비밀번호'}를 입력하세요`;
      } else if (errorType === PATTERN) {
        return '~를 포함해야 합니다';
      }
      throw new Error();
    }

    case 'passwordConfirm': {
      if (errorType === REQUIRED) {
        return '비밀번호를 확인해 주세요';
      } else if (errorType === VALIDATE) {
        return '동일한 비밀번호를 입력해 주세요';
      }
      throw new Error();
    }
  }
}

// 필드 에러 있을 경우에만 실행됨
function getErrormessage(
  field: Field,
  errorTypes: string[],
  errors: any
): string | undefined {
  for (const errorType of errorTypes) {
    if (errors[field]['type'] === errorType) {
      return chooseErrorMessage(field, errorType);
    }
  }
}

const FirstSignupForm = ({
  id,
  password,
  passwordConfirm,
  onSubmit,
}: FirstSignupFormProps) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('field')}>
        <Controller
          name="id"
          rules={{ required: true, pattern: /0/ }}
          render={({ field: { value, ...others } }) => (
            <FormInputWrapper>
              <FormInput
                {...others}
                value={id}
                placeholder="아이디"
                hasError={errors.id}
              />
              {errors.id && (
                <ErrorMessage>
                  {getErrormessage('id', [REQUIRED, PATTERN], errors)}
                </ErrorMessage>
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          name="password"
          rules={{ required: true, pattern: /0/ }}
          render={({ field: { value, ...others } }) => (
            <FormInputWrapper>
              <FormInput
                {...others}
                type="password"
                value={password}
                placeholder="비밀번호"
                hasError={errors.password}
              />
              {errors.password && (
                <ErrorMessage>
                  {getErrormessage('password', [REQUIRED, PATTERN], errors)}
                </ErrorMessage>
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          name="passwordConfirm"
          rules={{ required: true, validate: value => value === password }}
          render={({ field: { value, ...others } }) => (
            <FormInputWrapper>
              <FormInput
                {...others}
                type="password"
                value={passwordConfirm}
                placeholder="비밀번호 확인"
                hasError={errors.passwordConfirm}
              />
              {errors.passwordConfirm && (
                <ErrorMessage>
                  {getErrormessage(
                    'passwordConfirm',
                    [REQUIRED, VALIDATE],
                    errors
                  )}
                </ErrorMessage>
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <Button color="main" size="lg" text="계속" />
    </form>
  );
};

export default FirstSignupForm;
