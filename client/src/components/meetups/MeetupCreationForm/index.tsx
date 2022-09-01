import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  CreatedMeetup,
  MeetupGender,
  MeetupPathDifficulty,
} from 'types/meetup';
import styles from './MeetupCreationForm.module.scss';
import classNames from 'classnames/bind';
import {
  BICYCLE_TYPE_OPTIONS,
  BIRTH_YEAR_OPTIONS,
  LOCATIONS,
  MEETUP_GENDER_OPTIONS,
  MEETUP_PATH_DIFFICULTY_OPTIONS,
  RIDING_SKILL_OPTIONS,
} from 'utils/constants';
import { BicycleType, Location, Option, RidingSkill } from 'types/common';
import SelectButton from 'components/common/SelectButton';
import { useEffect } from 'react';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import PlusMinusButton from 'components/common/PlusMinusButton';
import { getMeetupCreationFormFieldErrorMessage } from 'utils/getErrorMessage';
import SelectList from 'components/common/SelectList';

const cn = classNames.bind(styles);

interface MeetupCreationFormProp {
  close: () => void;
}

const MeetupCreationForm = ({ close }: MeetupCreationFormProp) => {
  const {
    register,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreatedMeetup>({
    defaultValues: {
      location: '서울',
      pathDifficulty: 1,
      bicycleTypes: ['따릉이'],
      ridingSkill: 1,
      gender: 'mixed',
      minBirthYear: 1940,
      maxBirthYear: new Date().getFullYear(),
      maxNumOfParticipants: 2,
      participationFee: 0,
    },
  });
  const minBirthYear = Number(watch('minBirthYear'));
  const maxNumOfParticipants = Number(watch('maxNumOfParticipants'));
  const participationFee = Number(watch('participationFee'));

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    close();
    return reset;
  }, [isSubmitSuccessful]);

  const handleMaxNumOfParticipantsDecrease = () =>
    setValue(
      'maxNumOfParticipants',
      maxNumOfParticipants <= 2 ? 2 : maxNumOfParticipants - 1,
      {
        shouldValidate: true,
      }
    );
  const handleMaxNumOfParticipantsIncrease = () => {
    if (99 <= maxNumOfParticipants) return;
    setValue('maxNumOfParticipants', maxNumOfParticipants + 1, {
      shouldValidate: true,
    });
  };

  const handleParticipationFeeDecrease = () =>
    setValue(
      'participationFee',
      participationFee < 5000 ? 0 : participationFee - 5000,
      {
        shouldValidate: true,
      }
    );
  const handleParticipationFeeIncrease = () =>
    setValue('participationFee', participationFee + 5000, {
      shouldValidate: true,
    });

  const onSubmit: SubmitHandler<CreatedMeetup> = data => {
    console.log(data);
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('fields')}>
        <div className={cn('field')}>
          <input
            className={cn('title')}
            placeholder="제목을 입력해 주세요"
            {...register('title', { required: true })}
          />
          {errors.title && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'title',
                errors.title.type
              )}
            />
          )}
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>지역</h4>
          </label>
          <ul className={cn('options')}>
            <Controller
              control={control}
              name="location"
              render={({ field: { value, ...others } }) => (
                <>
                  {LOCATIONS.map((location: Location) => (
                    <li key={location} className={cn('col')}>
                      <SelectButton
                        type="radio"
                        value={location}
                        content={location}
                        isSelected={value === location}
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
            <h4>코스 난이도</h4>
          </label>
          <ul className={cn('options')}>
            <Controller
              control={control}
              name="pathDifficulty"
              render={({ field: { value, ...others } }) => (
                <>
                  {MEETUP_PATH_DIFFICULTY_OPTIONS.map(
                    (option: Option<MeetupPathDifficulty>) => (
                      <li key={option.value} className={cn('col')}>
                        <SelectButton
                          type="radio"
                          value={option.value}
                          content={option.content}
                          isSelected={Number(value) === option.value}
                          {...others}
                        />
                      </li>
                    )
                  )}
                </>
              )}
            />
          </ul>
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>자전거 종류</h4>
          </label>
          <ul className={cn('options')}>
            <Controller
              control={control}
              name="bicycleTypes"
              rules={{
                validate: bicycleTypes => bicycleTypes.length > 0,
              }}
              render={({ field: { value: values, onChange, ...others } }) => (
                <>
                  {BICYCLE_TYPE_OPTIONS.map((option: Option<BicycleType>) => (
                    <li key={option.value} className={cn('col')}>
                      <SelectButton
                        type="checkbox"
                        value={option.value}
                        content={option.content}
                        isSelected={values.indexOf(option.value) !== -1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onChange(
                            e.target.checked
                              ? [...values, option.value]
                              : values.filter(value => value !== option.value)
                          )
                        }
                        {...others}
                      />
                    </li>
                  ))}
                </>
              )}
            />
          </ul>
          {errors.bicycleTypes && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'bicycleTypes',
                'validate'
              )}
            />
          )}
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>라이딩 실력</h4>
          </label>
          <ul className={cn('options')}>
            <Controller
              control={control}
              name="ridingSkill"
              render={({ field: { value, ...others } }) => (
                <>
                  {RIDING_SKILL_OPTIONS.map((option: Option<RidingSkill>) => (
                    <li key={option.value} className={cn('col')}>
                      <SelectButton
                        type="radio"
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
            <h4>성별</h4>
          </label>
          <ul className={cn('options')}>
            <Controller
              control={control}
              name="gender"
              render={({ field: { value, ...others } }) => (
                <>
                  {MEETUP_GENDER_OPTIONS.map((option: Option<MeetupGender>) => (
                    <li key={option.value} className={cn('col')}>
                      <SelectButton
                        type="radio"
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

        <div className={cn('field', 'birthYear')}>
          <label className={cn('label')}>
            <h4>연령대</h4>
          </label>
          <div className={cn('option')}>
            <div className={cn('select')}>
              <Controller
                control={control}
                name="minBirthYear"
                rules={{ required: true }}
                render={({ field }) => (
                  <SelectList
                    options={BIRTH_YEAR_OPTIONS}
                    label="최소 출생년도"
                    defaultText="최소 출생년도"
                    size="sm"
                    {...field}
                  />
                )}
              />
              <span>년생</span>
            </div>

            <span className={cn('tilde')}>~</span>

            <div className={cn('select')}>
              <Controller
                control={control}
                name="maxBirthYear"
                rules={{
                  required: true,
                  min: minBirthYear,
                }}
                render={({ field }) => (
                  <SelectList
                    options={BIRTH_YEAR_OPTIONS}
                    label="최대 출생년도"
                    defaultText="최대 출생년도"
                    size="sm"
                    {...field}
                  />
                )}
              />
              <span>년생</span>
            </div>
          </div>
          {(errors.minBirthYear?.type === 'required' ||
            errors.maxBirthYear?.type === 'required') && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'birthYear',
                'required'
              )}
            />
          )}
          {errors.maxBirthYear?.type === 'min' && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'birthYear',
                'min'
              )}
            />
          )}
        </div>

        <div className={cn('field', 'maxNumOfParticipants')}>
          <label className={cn('label')}>
            <h4>인원</h4>
          </label>
          <div className={cn('option')}>
            <div className={cn('regulator')}>
              <PlusMinusButton
                color="white"
                size="md"
                action="decrease"
                onDecrease={handleMaxNumOfParticipantsDecrease}
              />
              <Controller
                control={control}
                name="maxNumOfParticipants"
                rules={{ min: 2 }}
                render={({ field: { onChange, ...others } }) => (
                  <input
                    type="number"
                    className={cn('number')}
                    onChange={e => {
                      const input = Number(e.target.value);
                      if (input <= 0) return onChange(0);
                      e.target.value = '';
                      return onChange(input > 99 ? 99 : input);
                    }}
                    {...others}
                  />
                )}
              />
              <PlusMinusButton
                color="white"
                size="md"
                action="increase"
                onIncrease={handleMaxNumOfParticipantsIncrease}
              />
            </div>
            <span>명</span>
          </div>
          {errors.maxNumOfParticipants && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'maxNumOfParticipants',
                errors.maxNumOfParticipants.type
              )}
            />
          )}
        </div>

        <div className={cn('field', 'participationFee')}>
          <label className={cn('label')}>
            <h4>참가비</h4>
          </label>
          <div className={cn('option')}>
            <div className={cn('regulator')}>
              <PlusMinusButton
                color="white"
                size="md"
                action="decrease"
                onDecrease={handleParticipationFeeDecrease}
              />
              <input
                type="number"
                className={cn('number')}
                {...register('participationFee', {
                  required: true,
                  min: 0,
                })}
              />
              <PlusMinusButton
                color="white"
                size="md"
                action="increase"
                onIncrease={handleParticipationFeeIncrease}
              />
            </div>
            <span>원</span>
          </div>
          {errors.participationFee && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'participationFee',
                errors.participationFee.type
              )}
            />
          )}
        </div>

        <div className={cn('field', 'content')}>
          <label className={cn('label')}>
            <h4>모임 소개</h4>
          </label>
          <Controller
            control={control}
            name="content"
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea placeholder="모임을 소개해 주세요." {...field} />
            )}
          />
          {errors.content && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'content',
                errors.content.type
              )}
            />
          )}
        </div>
      </div>

      <div className={cn('btn')}>
        <Button type="submit" color="main" size="lg" content="모임 만들기" />
      </div>
    </form>
  );
};

export default MeetupCreationForm;
