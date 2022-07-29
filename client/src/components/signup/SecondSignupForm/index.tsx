import { Controller, useFormContext } from 'react-hook-form';
import FormInputWrapper from 'components/common/FormInputWrapper';
import FormInput from 'components/common/FormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import SelectButton from 'components/common/SelectButton';
import Button from 'components/common/Button';
import styles from './SecondSignupForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectButtonProps {
  value: number;
  text: string;
  textEng: string;
}

const genderOptions: SelectButtonProps[] = [
  { value: 0, text: '남성', textEng: 'male' },
  { value: 1, text: '여성', textEng: 'female' },
];

const ageOptions: SelectButtonProps[] = [
  { value: 0, text: '10대', textEng: 'ten' },
  { value: 1, text: '20대', textEng: 'twenty' },
  { value: 2, text: '30대', textEng: 'thirty' },
  { value: 3, text: '40대', textEng: 'forty' },
  { value: 4, text: '50대 이상', textEng: 'fifty' },
];

interface SecondSignupFormProps {
  nickname: string;
  gender: number | null;
  age: number | null;
  bicycleType: string | null;
  introduce: string | null;
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
        <label className={cn('label')}>
          <span className={cn('title')}>닉네임</span>
        </label>
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

      <div className={cn('field')}>
        <label className={cn('label')}>
          <span className={cn('title')}>성별</span>
          <span className={cn('optional')}>(선택 입력)</span>
        </label>
        <ul className={cn('row')}>
          <Controller
            name="gender"
            render={({ field: { value: selection, onChange, ...others } }) => (
              <>
                {genderOptions.map((option: SelectButtonProps) => (
                  <li key={option.value} className={cn('col')}>
                    <SelectButton
                      isSelected={
                        selection
                          ? selection.some(
                              (value: number) => value === option.value
                            )
                          : false
                      }
                      value={option.value}
                      text={option.text}
                      textEng={option.textEng}
                      onChange={(e: any) =>
                        onChange(e.target.checked ? [option.value] : null)
                      }
                      {...others}
                    />
                  </li>
                ))}
              </>
            )}
          />
        </ul>
      </div>

      <div className={cn('field')}>
        <label className={cn('label')}>
          <span className={cn('title')}>나이</span>
          <span className={cn('optional')}>(선택 입력)</span>
        </label>
        <ul className={cn('row')}>
          <Controller
            name="age"
            render={({ field: { value: selection, onChange, ...others } }) => (
              <>
                {ageOptions.map((option: SelectButtonProps) => (
                  <li key={option.value} className={cn('col', 'age')}>
                    <SelectButton
                      isSelected={
                        selection
                          ? selection.some(
                              (value: number) => value === option.value
                            )
                          : false
                      }
                      value={option.value}
                      text={option.text}
                      textEng={option.textEng}
                      onChange={(e: any) =>
                        onChange(e.target.checked ? [option.value] : null)
                      }
                      {...others}
                    />
                  </li>
                ))}
              </>
            )}
          />
        </ul>
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
