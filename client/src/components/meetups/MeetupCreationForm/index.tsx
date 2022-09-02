import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  CreatedMeetup,
  MeetupDueDate,
  MeetupGender,
  MeetupMeetingDate,
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
import { forwardRef, KeyboardEvent, ReactNode, useEffect } from 'react';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import PlusMinusButton from 'components/common/PlusMinusButton';
import { getMeetupCreationFormFieldErrorMessage } from 'utils/getErrorMessage';
import SelectList from 'components/common/SelectList';
import DateTimePicker from 'components/common/DateTimePicker';
import { AiOutlineCalendar } from 'react-icons/ai';
import FilterOptionChip from 'components/common/Chip';

const cn = classNames.bind(styles);

interface DateInputProps {
  icon: ReactNode;
  [key: string]: any;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, icon, onClick, ...others }, ref) => (
    <div className={cn('date-input')} onClick={onClick}>
      <input ref={ref} {...others} />
      <button type="button">{icon}</button>
    </div>
  )
);

interface MeetupCreationForm
  extends Omit<CreatedMeetup, 'meetingDate' | 'dueDate'> {
  dueDate: null | MeetupDueDate;
  meetingDate: null | MeetupMeetingDate;
}
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
  } = useForm<MeetupCreationForm>({
    defaultValues: {
      location: '서울',
      path: [],
      pathDifficulty: 1,
      bicycleTypes: ['따릉이'],
      ridingSkill: 1,
      gender: 'mixed',
      minBirthYear: 1940,
      maxBirthYear: new Date().getFullYear(),
      maxNumOfParticipants: 2,
      dueDate: null,
      meetingDate: null,
      participationFee: 0,
    },
  });
  const path = watch('path');
  console.log(path);
  const minBirthYear = watch('minBirthYear');
  const maxNumOfParticipants = watch('maxNumOfParticipants');
  const participationFee = watch('participationFee');
  const dueDate = watch('dueDate');

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    close();
    return reset;
  }, [isSubmitSuccessful]);

  const handlePathKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== ',') return;
    if (!(e.target instanceof HTMLTextAreaElement)) return;
    e.preventDefault();
    setValue('path', [...path, e.target.value], {
      shouldValidate: true,
    });
    e.target.value = '';
  };

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

  const onSubmit: SubmitHandler<MeetupCreationForm> = data => {
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

        <div className={cn('field', 'path')}>
          <label className={cn('label')}>
            <h4>코스</h4>
          </label>
          <ul className={cn('stops')}>
            {/* {path.map(stop => (
              <FilterOptionChip type="removeOnly" content={stop} isActive />
            ))} */}
          </ul>

          <TextArea
            rows={2}
            placeholder="경유지 입력 후 쉼표(,) 키를 눌러 등록하세요.&#13;(ex: 잠수교,)"
            onKeyDown={handlePathKeyDown}
          />
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>관련 자전거길</h4>
            <span className={cn('guide')}>(선택 사항)</span>
          </label>
        </div>

        <div className={cn('field')}>
          <label className={cn('label')}>
            <h4>코스 난이도</h4>
          </label>
          <ul className={cn('options')}>
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
            <h4>자전거 종류</h4>
            <span className={cn('guide')}>(다중 선택 가능)</span>
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
          <ul className={cn('options')}>
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

        <div className={cn('field', 'birthYear')}>
          <label className={cn('label')}>
            <h4>나이</h4>
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
                rules={{ required: true, min: 2, max: 99 }}
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
              <Controller
                control={control}
                name="participationFee"
                rules={{ required: true, min: 0 }}
                render={({ field: { onChange, ...others } }) => (
                  <input
                    type="number"
                    className={cn('number')}
                    step={5000}
                    onChange={e => {
                      const input = Number(e.target.value);
                      if (input <= 0) return onChange(0);
                      e.target.value = '';
                      return onChange(input);
                    }}
                    {...others}
                  />
                )}
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

        <div className={cn('field', 'date')}>
          <label className={cn('label')}>
            <h4>모집 마감 일시</h4>
          </label>
          <Controller
            control={control}
            name="dueDate"
            rules={{ required: true }}
            render={({ field: { value: selectedDate, ...others } }) => (
              <DateTimePicker
                selectedDate={selectedDate ? new Date(selectedDate) : null}
                CustomInput={<DateInput icon={<AiOutlineCalendar />} />}
                placeholder="모집 마감 일시를 선택하세요."
                {...others}
              />
            )}
          />
          {errors.dueDate && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'dueDate',
                errors.dueDate.type
              )}
            />
          )}
        </div>

        <div className={cn('field', 'date')}>
          <label className={cn('label')}>
            <h4>모임 일시</h4>
          </label>
          <Controller
            control={control}
            name="meetingDate"
            rules={{
              required: true,
              validate: meetingDate =>
                (dueDate as Date).getTime() <= (meetingDate as Date).getTime(),
            }}
            render={({ field: { value: selectedDate, ...others } }) => (
              <DateTimePicker
                selectedDate={selectedDate ? new Date(selectedDate) : null}
                CustomInput={<DateInput icon={<AiOutlineCalendar />} />}
                minDate={dueDate ? dueDate : undefined}
                placeholder="모임 일시를 선택하세요."
                {...others}
              />
            )}
          />
          {errors.meetingDate && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'meetingDate',
                errors.meetingDate.type
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
