import { Controller, useForm } from 'react-hook-form';
import { CreatedMeetup, MeetupPathDifficulty } from 'types/meetup';
import styles from './MeetupCreationForm.module.scss';
import classNames from 'classnames/bind';
import {
  MEETUP_PATH_DIFFICULTY_OPTIONS,
  RIDING_SKILL_OPTIONS,
} from 'utils/constants';
import { Option, RidingSkill } from 'types/common';
import SelectButton from 'components/common/SelectButton';
import { useEffect } from 'react';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import FormInputWithErrorMessageWrapper from 'components/common/FormInputWithErrorMessageWrapper';

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

  const onSubmit = () => {};

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('fields')}>
        <div className={cn('field')}>
          <FormInputWithErrorMessageWrapper>
            <input
              className={cn('title')}
              placeholder="제목을 입력해 주세요"
              {...register('title', {
                required: true,
              })}
            />
            {errors.title && <ErrorMessage message="제목을 입력하세요" />}
          </FormInputWithErrorMessageWrapper>
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>코스 난이도</h4>
          </label>
          <ul className={cn('row')}>
            <Controller
              control={control}
              name="pathDifficulty"
              render={({ field: { value, ...others } }) => (
                <>
                  {MEETUP_PATH_DIFFICULTY_OPTIONS.map(
                    (option: Option<MeetupPathDifficulty>) => (
                      <li key={option.value} className={cn('col')}>
                        <SelectButton
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
              render={({ field: { value, ...others } }) => (
                <>
                  {RIDING_SKILL_OPTIONS.map((option: Option<RidingSkill>) => (
                    <li key={option.value} className={cn('col')}>
                      <SelectButton
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
