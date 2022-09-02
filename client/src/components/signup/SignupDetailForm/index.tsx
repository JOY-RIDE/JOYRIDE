import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toastMessageState } from 'states/common';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useSignupStepControls } from 'routes/Signup';
import { authAPI } from 'apis/authAPI';
import { AxiosError } from 'axios';
import FormInputWithErrorMessageWrapper from 'components/common/FormInputWithErrorMessageWrapper';
import AuthFormInput from 'components/common/AuthFormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import { getSignupFormFieldErrorMessage } from 'utils/getErrorMessage';
import SelectButton from 'components/common/SelectButton';
import SelectList from 'components/common/SelectList';
import Button from 'components/common/Button';
import styles from './SignupDetailForm.module.scss';
import classNames from 'classnames/bind';
import { signupFormDataState } from 'states/auth';
import { BICYCLE_TYPE_OPTIONS } from 'utils/constants';

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
  content: string;
  contentEng: string;
}

// Variables
const genderOptions: SelectButtonProps[] = [
  { value: 'm', content: '남성', contentEng: 'male' },
  { value: 'f', content: '여성', contentEng: 'female' },
];
const ageOptions: SelectButtonProps[] = [
  { value: '1', content: '10대', contentEng: 'ten' },
  { value: '2', content: '20대', contentEng: 'twenty' },
  { value: '3', content: '30대', contentEng: 'thirty' },
  { value: '4', content: '40대', contentEng: 'forty' },
  { value: '5', content: '50대 이상', contentEng: 'fifty' },
];

const SignupDetailForm = () => {
  const {
    control,
    formState: { isSubmitted, errors },
    handleSubmit,
    setError,
  } = useForm<SignupDetailForm>({
    defaultValues: {
      // nickname: '',
      // gender: '',
      // age: '',
      // bicycleType: '',
    },
    // reValidateMode: 'onBlur',
  });

  const validateNickname = async (nickname: string) => {
    try {
      await authAPI.checkIfNicknameExists(nickname);
      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        setError('nickname', { type: 'etc' });
      } else if (e instanceof Error) {
        setError('nickname', {
          type: e.message === '2032' ? 'duplicated' : 'etc',
        });
      }
      return false;
    }
  };

  const [{ email, password }, setSignupFormData] =
    useRecoilState(signupFormDataState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { decreaseStep, increaseStep } = useSignupStepControls();

  const onSubmit: SubmitHandler<SignupDetailForm> = async ({
    nickname,
    gender,
    age,
    bicycleType,
    message,
  }) => {
    const isNicknameValid = await validateNickname(nickname);
    if (!isNicknameValid) return;

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

    try {
      await authAPI.signup(newUser);
      setSignupFormData(data => ({ ...data, nickname }));
      increaseStep();
    } catch (e) {
      showToastMessage('회원가입 중 문제가 발생했습니다');
    }
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
            }}
            render={({ field }) => (
              <FormInputWithErrorMessageWrapper>
                <AuthFormInput
                  placeholder="닉네임"
                  helpText={!isSubmitted && '닉네임 조건'}
                  hasError={Boolean(errors.nickname)}
                  {...field}
                />
                {errors.nickname && (
                  <ErrorMessage
                    message={getSignupFormFieldErrorMessage(
                      'nickname',
                      errors.nickname.type
                    )}
                  />
                )}
              </FormInputWithErrorMessageWrapper>
            )}
          />
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4 className={cn('title')}>성별</h4>
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
                        content={option.content}
                        contentEng={option.contentEng}
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
                        content={option.content}
                        contentEng={option.contentEng}
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
          </label>
          <Controller
            control={control}
            name="bicycleType"
            render={({ field }) => (
              <SelectList
                options={BICYCLE_TYPE_OPTIONS}
                label="자전거 종류"
                {...field}
              />
            )}
          />
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4 className={cn('title')}>상태 메세지</h4>
            <span className={cn('guide')}>(선택)</span>
          </label>
          <Controller
            control={control}
            name="message"
            rules={{
              maxLength: 30,
            }}
            render={({ field }) => (
              <FormInputWithErrorMessageWrapper>
                <AuthFormInput
                  placeholder="상태 메세지"
                  helpText={!isSubmitted && '상태 메세지 조건'}
                  hasError={errors.message}
                  {...field}
                />
                {errors.message && (
                  <ErrorMessage
                    message={getSignupFormFieldErrorMessage(
                      'message',
                      errors.message.type
                    )}
                  />
                )}
              </FormInputWithErrorMessageWrapper>
            )}
          />
        </div>
      </div>

      <div className={cn('btns')}>
        <Button
          type="button"
          color="whiteGrey"
          size="md"
          content="이전"
          onClick={decreaseStep}
        />
        <Button type="submit" color="main" size="md" content="회원가입하기" />
      </div>
    </form>
  );
};

export default SignupDetailForm;
