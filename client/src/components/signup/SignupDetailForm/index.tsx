import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toastMessageState } from 'states/common';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useSignupStepControls } from 'routes/Auth/Signup';
import { authAPI } from 'apis/authAPI';
import AuthFormInput from 'components/common/AuthFormInput';
import ErrorMessage from 'components/common/ErrorMessage';
import { getSignupFormFieldErrorMessage } from 'utils/getErrorMessage';
import SelectButton from 'components/common/SelectButton';
import SelectList from 'components/common/SelectList';
import Button from 'components/common/Button';
import styles from './SignupDetailForm.module.scss';
import classNames from 'classnames/bind';
import { signupFormDataState } from 'states/auth';
import {
  BICYCLE_TYPE_OPTIONS,
  GENDER_OPTIONS,
  RIDING_SKILL_OPTIONS,
} from 'utils/constants';
import { BicycleType, Gender, Option, RidingSkill } from 'types/common';
import { ChangeEvent } from 'react';

const cn = classNames.bind(styles);

interface SignupDetailForm {
  nickname: string;
  gender: Gender;
  birthYear: string;
  bicycleType: BicycleType;
  ridingSkill: RidingSkill;
  introduce: string;
}

const SignupDetailForm = () => {
  const {
    control,
    formState: { isSubmitted, errors },
    handleSubmit,
    setError,
  } = useForm<SignupDetailForm>({
    defaultValues: {
      nickname: '',
      gender: 'm',
      birthYear: '',
      bicycleType: '따릉이',
      ridingSkill: 1,
      introduce: '',
    },
    // reValidateMode: 'onBlur',
  });

  const validateNickname = async (nickname: string) => {
    try {
      await authAPI.checkIfNicknameExists(nickname);
      return true;
    } catch (e: any) {
      setError('nickname', {
        type: e.message === '2032' ? 'duplicated' : 'etc',
      });
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
    birthYear,
    bicycleType,
    ridingSkill,
    introduce,
  }) => {
    const isNicknameValid = await validateNickname(nickname);
    if (!isNicknameValid) return;

    const newUser = {
      email,
      password,
      nickname,
      gender,
      birthYear: Number(birthYear),
      bicycleType,
      bicycleCareer: Number(ridingSkill),
      introduce: introduce || null,
      isTermsEnable: true,
    };

    try {
      await authAPI.signup(newUser);
      setSignupFormData(data => ({ ...data, nickname }));
      increaseStep();
    } catch (e) {
      showToastMessage('회원가입 중 문제가 발생했습니다.');
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
              <AuthFormInput
                placeholder="닉네임"
                helpText={!isSubmitted && '닉네임 조건'}
                hasError={!!errors.nickname}
                {...field}
              />
            )}
          />
          {errors.nickname && (
            <ErrorMessage
              message={getSignupFormFieldErrorMessage(
                'nickname',
                errors.nickname.type
              )}
            />
          )}
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4 className={cn('title')}>성별</h4>
          </label>
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, ...others } }) => (
                <>
                  {GENDER_OPTIONS.map((option: Option<Gender>) => (
                    <li key={option.value} className={cn('col')}>
                      <SelectButton
                        type="radio"
                        size="lg"
                        value={option.value}
                        content={option.content}
                        isSelected={value === option.value}
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
            <h4 className={cn('title')}>출생년도</h4>
          </label>
          <Controller
            control={control}
            name="birthYear"
            rules={{
              required: true,
              min: 1920,
              max: new Date().getFullYear(),
            }}
            render={({ field: { onChange, ...others } }) => (
              <AuthFormInput
                type="number"
                placeholder="출생년도"
                helpText={!isSubmitted && '출생년도 네자리'}
                hasError={!!errors.birthYear}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const input = e.target.value;
                  if (Number(input) < 0) {
                    return onChange('');
                  }
                  return onChange(input);
                }}
                {...others}
              />
            )}
          />
          {errors.birthYear && (
            <ErrorMessage
              message={getSignupFormFieldErrorMessage(
                'birthYear',
                errors.birthYear.type
              )}
            />
          )}
        </div>

        <div className={cn('field', 'bicycle-type')}>
          <label className={cn('label')}>
            <h4 className={cn('title')}>자전거 종류</h4>
          </label>
          <Controller
            control={control}
            name="bicycleType"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <SelectList
                size="lg"
                options={BICYCLE_TYPE_OPTIONS}
                label="자전거 종류"
                {...field}
              />
            )}
          />
          {errors.bicycleType && (
            <ErrorMessage
              message={getSignupFormFieldErrorMessage(
                'bicycleType',
                errors.bicycleType.type
              )}
            />
          )}
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4 className={cn('title')}>라이딩 실력</h4>
          </label>
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="ridingSkill"
              render={({ field: { value, ...others } }) => (
                <>
                  {RIDING_SKILL_OPTIONS.map((option: Option<RidingSkill>) => (
                    <li key={option.value} className={cn('col')}>
                      <SelectButton
                        type="radio"
                        size="lg"
                        value={option.value}
                        content={option.content}
                        isSelected={Number(value) === option.value}
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
            <h4 className={cn('title')}>상태 메세지</h4>
            <span className={cn('guide')}>(선택)</span>
          </label>
          <Controller
            control={control}
            name="introduce"
            rules={{
              maxLength: 30,
            }}
            render={({ field }) => (
              <AuthFormInput
                placeholder="상태 메세지"
                helpText={!isSubmitted && '상태 메세지 조건'}
                hasError={!!errors.introduce}
                {...field}
              />
            )}
          />
          {errors.introduce && (
            <ErrorMessage
              message={getSignupFormFieldErrorMessage(
                'introduce',
                errors.introduce.type
              )}
            />
          )}
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
