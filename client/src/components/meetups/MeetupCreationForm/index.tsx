import { Controller, useForm } from 'react-hook-form';
import { CreatedMeetup } from 'types/meetup';
import styles from './MeetupCreationForm.module.scss';
import classNames from 'classnames/bind';
import { RIDING_SKILL_OPTIONS } from 'utils/constants';
import { Option, RidingSkill } from 'types/common';
import SelectButton from 'components/common/SelectButton';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

interface MeetupCreationFormProp {
  close: () => void;
}

const MeetupCreationForm = ({ close }: MeetupCreationFormProp) => {
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
    watch,
  } = useForm<CreatedMeetup>({
    defaultValues: {
      pathDifficulty: 1,
      ridingSkill: 1,
      gender: null,
      ages: null,
      maxNumOfParticipants: 0,
      participationFee: 0,
    },
  });

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    close();
    return reset;
  }, [isSubmitSuccessful]);

  return (
    <form className={cn('form')}>
      <div className={cn('fields')}>
        <div className={cn('field')}>
          <input className={cn('title')} placeholder="제목을 입력해 주세요" />
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
      </div>
    </form>
  );
};

export default MeetupCreationForm;
