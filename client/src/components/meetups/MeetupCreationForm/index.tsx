import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  CreatedMeetup,
  MeetupGender,
  MeetupPathDifficulty,
} from 'types/meetup';
import styles from './MeetupCreationForm.module.scss';
import classNames from 'classnames/bind';
import {
  AGES,
  LOCATIONS,
  MEETUP_GENDER_OPTIONS,
  MEETUP_PATH_DIFFICULTY_OPTIONS,
  RIDING_SKILL_OPTIONS,
} from 'utils/constants';
import { Age, Location, Option, RidingSkill } from 'types/common';
import SelectButton from 'components/common/SelectButton';
import { useEffect } from 'react';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import FormInputWithErrorMessageWrapper from 'components/common/FormInputWithErrorMessageWrapper';
import { stringifyAge } from 'utils/stringify';

const cn = classNames.bind(styles);

interface MeetupCreationFormProp {
  close: () => void;
}

const MeetupCreationForm = ({ close }: MeetupCreationFormProp) => {
  const {
    register,
    control,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreatedMeetup>({
    defaultValues: {
      location: '서울',
      pathDifficulty: 1,
      ridingSkill: 1,
      gender: 'mixed',
      ages: [1],
      maxNumOfParticipants: 2,
      participationFee: 0,
    },
  });

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    close();
    return reset;
  }, [isSubmitSuccessful]);

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
            {...register('title', {
              required: true,
            })}
          />
          {errors.title && <ErrorMessage message="필수 항목입니다" />}
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>지역</h4>
          </label>
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="location"
              rules={{ required: true }}
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
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="pathDifficulty"
              rules={{ required: true }}
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
            <h4>라이딩 실력</h4>
          </label>
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="ridingSkill"
              rules={{ required: true }}
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
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="gender"
              rules={{ required: true }}
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

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>연령대</h4>
          </label>
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="ages"
              rules={{ required: true, validate: ages => ages.length > 0 }}
              render={({ field: { value: values, onChange, ...others } }) => (
                <>
                  {AGES.map((age: Age) => (
                    <li key={age} className={cn('col')}>
                      <SelectButton
                        type="checkbox"
                        value={age}
                        content={stringifyAge(age)}
                        isSelected={values.indexOf(age) !== -1}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onChange(
                            e.target.checked
                              ? [...values, age]
                              : values.filter(value => value !== age)
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
          {errors.ages && <ErrorMessage message="필수 항목입니다" />}
        </div>

        <div className={cn('field', 'content')}>
          <label className={cn('label')}>
            <h4>모임 소개</h4>
            <span className={cn('optional')}>(선택)</span>
          </label>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <TextArea placeholder="모임을 소개해 주세요." {...field} />
            )}
          />
        </div>
      </div>

      <div className={cn('btn')}>
        <Button type="submit" color="main" size="lg" content="모임 만들기" />
      </div>
    </form>
  );
};

export default MeetupCreationForm;
