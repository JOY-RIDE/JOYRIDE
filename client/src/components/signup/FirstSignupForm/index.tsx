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
function getPatternInfo(field: Field) {
  switch (field) {
    case 'id':
      return { pattern: /0/, helpText: '아이디 조건' };
    case 'password':
      return { pattern: /0/, helpText: '비밀번호 조건' };
  }
}

function chooseErrorMessage(field: Field, error: string) {
  switch (field) {
    case 'id': {
      if (error === REQUIRED) {
        return '아이디를 입력하세요';
      } else if (error === PATTERN) {
        return '~를 포함해야 합니다';
      } else if (error === VALIDATE) {
        return '이미 존재하는 아이디입니다';
      }
      throw new Error();
    }

    case 'password': {
      if (error === REQUIRED) {
        return '비밀번호를 입력하세요';
      } else if (error === PATTERN) {
        return '~를 포함해야 합니다';
      }
      throw new Error();
    }

    case 'passwordConfirm': {
      if (error === REQUIRED) {
        return '비밀번호를 확인해 주세요';
      } else if (error === VALIDATE) {
        return '동일한 비밀번호를 입력해 주세요';
      }
      throw new Error();
    }
  }
}

// 필드 에러 있을 경우에만 실행됨
function getErrormessage(
  field: Field,
  possibleErrors: string[],
  currentError: any
): string | undefined {
  if (typeof currentError !== 'string') return;
  for (const error of possibleErrors) {
    if (error === currentError) {
      return chooseErrorMessage(field, error);
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
    formState: { isSubmitted, errors },
  } = useFormContext();

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('field')}>
        <Controller
          name="id"
          rules={{
            required: true,
            pattern: getPatternInfo('id')?.pattern,
            validate: async () => true,
          }}
          render={({ field: { value, ...others } }) => (
            <FormInputWrapper>
              <FormInput
                {...others}
                value={id}
                placeholder="아이디"
                helpText={!isSubmitted && getPatternInfo('id')?.helpText}
                hasError={errors.id}
              />
              {errors.id && (
                <ErrorMessage>
                  {getErrormessage(
                    'id',
                    [REQUIRED, PATTERN, VALIDATE],
                    errors.id.type
                  )}
                </ErrorMessage>
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <Controller
          name="password"
          rules={{
            required: true,
            pattern: getPatternInfo('password')?.pattern,
          }}
          render={({ field: { value, ...others } }) => (
            <FormInputWrapper>
              <FormInput
                {...others}
                type="password"
                value={password}
                placeholder="비밀번호"
                helpText={!isSubmitted && getPatternInfo('password')?.helpText}
                hasError={errors.password}
              />
              {errors.password && (
                <ErrorMessage>
                  {getErrormessage(
                    'password',
                    [REQUIRED, PATTERN],
                    errors.password.type
                  )}
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
                    errors.passwordConfirm.type
                  )}
                </ErrorMessage>
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
