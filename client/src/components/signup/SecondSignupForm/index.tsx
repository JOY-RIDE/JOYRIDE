import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { authAPIState, toastState } from 'states/atoms';
import { firstSignupFormState } from '../FirstSignupForm';
import FormInputWrapper from 'components/common/FormInputWrapper';
import FormInput from 'components/common/FormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import SelectButton from 'components/common/SelectButton';
import SelectList from 'components/common/SelectList';
import Button from 'components/common/Button';
import styles from './SecondSignupForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// Type/interfaces
type Field = 'nickname' | 'message';
interface SecondSignupFormProps {
  goNext: () => void;
  goPrevious: () => void;
}
interface SecondSignupForm {
  nickname: string;
  gender: string;
  age: string;
  bicycleType: string;
  message: string;
}
interface SelectButtonProps {
  value: string;
  text: string;
  textEng: string;
}
interface SelectListOption {
  value: string;
  text: string;
}

// State
export const secondSignupFormState = atom<{ nickname: string }>({
  key: 'secondSignupForm',
  default: { nickname: '' },
});

// Function
function getErrorMessage(field: Field, error: string) {
  switch (field) {
    case 'nickname': {
      switch (error) {
        case 'required':
          return '닉네임을 입력하세요';
        case 'maxLength':
          return '10자를 초과하였습니다';
        case 'validate':
          return '이미 존재하는 닉네임입니다';
        default:
          throw new Error();
      }
    }

    case 'message': {
      switch (error) {
        case 'maxLength':
          return '30자를 초과하였습니다';
        default:
          throw new Error();
      }
    }

    default:
      throw new Error();
  }
}

// Variables
const genderOptions: SelectButtonProps[] = [
  { value: 'm', text: '남성', textEng: 'male' },
  { value: 'f', text: '여성', textEng: 'female' },
];
const ageOptions: SelectButtonProps[] = [
  { value: '0', text: '10대', textEng: 'ten' },
  { value: '1', text: '20대', textEng: 'twenty' },
  { value: '2', text: '30대', textEng: 'thirty' },
  { value: '3', text: '40대', textEng: 'forty' },
  { value: '4', text: '50대 이상', textEng: 'fifty' },
];
const bicycleTypeOptions: SelectListOption[] = [
  { value: 'MTB', text: 'MTB' },
  { value: '로드 바이크', text: '로드 바이크' },
  // TODO: 옵션 추가
];

const SecondSignupForm = ({ goNext, goPrevious }: SecondSignupFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm<SecondSignupForm>({
    defaultValues: {
      nickname: '',
      gender: '',
      age: '',
      bicycleType: '',
      message: '',
    },
    reValidateMode: 'onBlur',
  });

  const { email, password } = useRecoilValue(firstSignupFormState);
  const authAPI = useRecoilValue(authAPIState);
  const openToast = useSetRecoilState(toastState);
  const setSecondSignupFormState = useSetRecoilState(secondSignupFormState);

  const onSubmit: SubmitHandler<SecondSignupForm> = async ({
    nickname,
    gender: genderInput,
    age: ageInput,
    bicycleType: bicycleTypeInput,
    message: messageInput,
  }) => {
    const gender = genderInput || null;
    const age = ageInput ? Number(ageInput) : null;
    const bicycleType = bicycleTypeInput || null;
    const message = messageInput || null;

    const newUser = {
      isTermsEnable: true,
      email,
      password,
      nickname,
      gender,
      old: age,
      bicycleType,
      message,
    };

    try {
      await authAPI.signup(newUser);
      setSecondSignupFormState({ nickname });
      goNext();
    } catch (e) {
      if (!(e instanceof Error)) return;
      openToast(
        `회원가입 중 에러가 발생했습니다. ${
          e.message === '4000'
            ? '관리자에게 문의해 주세요'
            : '다시 시도해 주세요'
        }`
      );
    }
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('field')}>
        <label className={cn('label')}>
          <h4 className={cn('title')}>닉네임</h4>
        </label>
        <Controller
          control={control}
          name="nickname"
          rules={{
            required: true,
            maxLength: 10,
            validate: async nickname => await authAPI.checkNickname(nickname),
          }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                placeholder="닉네임"
                helpText={!isSubmitted && '최대 10자'}
                hasError={errors.nickname}
                {...field}
              />
              {errors.nickname && (
                <ErrorMessage
                  text={getErrorMessage('nickname', errors.nickname.type)}
                />
              )}
            </FormInputWrapper>
          )}
        />
      </div>

      <div className={cn('field')}>
        <label className={cn('label')}>
          <h4 className={cn('title')}>성별</h4>
          {/* TODO: 디자인 */}
          <span className={cn('optional')}>(선택 사항)</span>
        </label>
        <ul className={cn('row')}>
          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange, ...others } }) => (
              <>
                {genderOptions.map((option: SelectButtonProps) => (
                  <li key={option.value} className={cn('col')}>
                    <SelectButton
                      isSelected={value === option.value ? true : false}
                      value={option.value}
                      text={option.text}
                      textEng={option.textEng}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.checked ? option.value : '')
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
          <h4 className={cn('title')}>나이</h4>
          <span className={cn('optional')}>(선택 사항)</span>
        </label>
        <ul className={cn('row')}>
          <Controller
            control={control}
            name="age"
            render={({ field: { value, onChange, ...others } }) => (
              <>
                {ageOptions.map((option: SelectButtonProps) => (
                  <li key={option.value} className={cn('col')}>
                    <SelectButton
                      isSelected={value === option.value ? true : false}
                      value={option.value}
                      text={option.text}
                      textEng={option.textEng}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(e.target.checked ? option.value : '')
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

      <div className={cn('field', 'bicycle-type')}>
        <label className={cn('label')}>
          <h4 className={cn('title')}>자전거 종류</h4>
          <span className={cn('optional')}>(선택 사항)</span>
        </label>
        <Controller
          control={control}
          name="bicycleType"
          render={({ field }) => (
            <SelectList
              options={bicycleTypeOptions}
              label="자전거 종류"
              {...field}
            />
          )}
        />
      </div>

      <div className={cn('field')}>
        <label className={cn('label')}>
          <h4 className={cn('title')}>상태 메세지</h4>
          <span className={cn('optional')}>(선택 사항)</span>
        </label>
        <Controller
          control={control}
          name="message"
          rules={{
            maxLength: 30,
          }}
          render={({ field }) => (
            <FormInputWrapper>
              <FormInput
                placeholder="상태 메세지"
                helpText={!isSubmitted && '최대 30자'}
                hasError={errors.message}
                {...field}
              />
              {errors.message && (
                <ErrorMessage
                  text={getErrorMessage('message', errors.message.type)}
                />
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
