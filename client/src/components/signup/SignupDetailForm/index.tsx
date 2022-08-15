import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toastMessageState } from 'states/atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { signupFormDataState, useSignupStepControls } from 'routes/Signup';
import { authAPI, NewUser } from 'apis/authAPI';
import AuthFormInputWithErrorMessageWrapper from 'components/common/AuthFormInputWithErrorMessageWrapper';
import AuthFormInput from 'components/common/AuthFormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import { getSignupFormErrorMessage } from 'utils/getErrorMessage';
import SelectButton from 'components/common/SelectButton';
import SelectList from 'components/common/SelectList';
import Button from 'components/common/Button';
import styles from './SignupDetailForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// Interfaces
interface SignupDetailForm {
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

const SignupDetailForm = () => {
  const {
    control,
    formState: { isSubmitted, errors },
    handleSubmit,
  } = useForm<SignupDetailForm>({
    defaultValues: {
      nickname: '',
      gender: '',
      age: '',
      bicycleType: '',
      message: '',
    },
    reValidateMode: 'onBlur',
  });

  const showToastMessage = useSetRecoilState(toastMessageState);
  const validateNickname = async (nickname: string) => {
    try {
      await authAPI.checkIfNicknameExists(nickname);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === '2032') return false;
        showToastMessage('닉네임 중복 확인 중 에러가 발생했습니다');
      }
    }
  };

  const [{ email, password }, setSignupFormData] =
    useRecoilState(signupFormDataState);
  const signup = async (newUser: NewUser) => {
    try {
      await authAPI.signup(newUser);
    } catch (e) {
      if (e instanceof Error) {
        showToastMessage('회원가입 중 에러가 발생했습니다');
      }
    }
  };
  const { decreaseStep, increaseStep } = useSignupStepControls();

  const onSubmit: SubmitHandler<SignupDetailForm> = async ({
    nickname,
    gender,
    age,
    bicycleType,
    message,
  }) => {
    const newUser = {
      isTermsEnable: true,
      email,
      password,
      nickname,
      gender: gender || null,
      old: age ? Number(age) : null,
      bicycleType: bicycleType || null,
      introduce: message || null,
    };

    await signup(newUser);
    setSignupFormData(data => ({ ...data, nickname }));
    increaseStep();
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('fields')}>
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
              validate: nickname => validateNickname(nickname),
            }}
            render={({ field }) => (
              <AuthFormInputWithErrorMessageWrapper>
                <AuthFormInput
                  placeholder="닉네임"
                  helpText={!isSubmitted && '닉네임 조건'}
                  hasError={Boolean(errors.nickname)}
                  {...field}
                />
                {errors.nickname && (
                  <ErrorMessage
                    text={getSignupFormErrorMessage(
                      'nickname',
                      errors.nickname.type
                    )}
                  />
                )}
              </AuthFormInputWithErrorMessageWrapper>
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
                        isSelected={value === option.value}
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
                        isSelected={value === option.value}
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
              <AuthFormInputWithErrorMessageWrapper>
                <AuthFormInput
                  placeholder="상태 메세지"
                  helpText={!isSubmitted && '상태 메세지 조건'}
                  hasError={errors.message}
                  {...field}
                />
                {errors.message && (
                  <ErrorMessage
                    text={getSignupFormErrorMessage(
                      'message',
                      errors.message.type
                    )}
                  />
                )}
              </AuthFormInputWithErrorMessageWrapper>
            )}
          />
        </div>
      </div>

      <div className={cn('btns')}>
        <Button
          type="button"
          color="white"
          size="md"
          text="이전"
          onClick={decreaseStep}
        />
        <Button color="main" size="md" text="회원가입하기" />
      </div>
    </form>
  );
};

export default SignupDetailForm;
