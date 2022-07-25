import { Controller, useFormContext } from 'react-hook-form';
import FormInputWrapper from 'components/common/FormInputWrapper';
import FormInput from 'components/common/FormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import Button from 'components/common/Button';
import styles from './SecondSignupForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SecondSignupFormProps {
  nickname: string;
  gender: number;
  age: number;
  bicycleType: string;
  introduce: string;
  onSubmit: any;
  goPrevious: () => void;
}

function getErrorMessage(currentError: any) {
  if (typeof currentError !== 'string') return;
  switch (currentError) {
    case 'required':
      return '닉네임을 입력하세요';
    case 'maxLength':
      return '10자를 초과하였습니다';
    case 'validate':
      return '이미 존재하는 닉네임입니다';
    default:
      new Error();
  }
}

const SecondSignupForm = (props: SecondSignupFormProps) => {
  const {
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useFormContext();

  const {
    nickname,
    gender,
    age,
    bicycleType,
    introduce,
    onSubmit,
    goPrevious,
  } = props;

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('field')}>
        <Controller
          name="nickname"
          rules={{
            required: true,
            maxLength: 10,
            validate: async () => true,
          }}
          render={({ field: { value, ...others } }) => (
            <FormInputWrapper>
              <FormInput
                {...others}
                value={nickname}
                placeholder="닉네임"
                helpText={!isSubmitted && '최대 10자'}
                hasError={errors.nickname}
              />
              {errors.nickname && (
                <ErrorMessage>
                  {getErrorMessage(errors.nickname.type)}
                </ErrorMessage>
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('btns')}>
        <Button
          type="button"
          color="white"
          size="md"
          text="이전"
          onClick={goPrevious}
        />
        <Button color="main" size="md" text="회원가입하기" />
      </div>
    </form>
  );
};

export default SecondSignupForm;
