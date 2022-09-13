import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  MeetupGender,
  MeetupPathDifficulty,
  MeetupLocation,
  MeetupMaxNumOfParticipants,
  NewMeetup,
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
import { ChangeEvent, forwardRef, KeyboardEvent, ReactNode } from 'react';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import PlusMinusButton from 'components/common/PlusMinusButton';
import { getMeetupCreationFormFieldErrorMessage } from 'utils/getErrorMessage';
import SelectList from 'components/common/SelectList';
import DateTimePicker from 'components/common/DateTimePicker';
import { AiOutlineCalendar } from 'react-icons/ai';
import TextInput from 'components/common/TextInput';
import Chip from 'components/common/Chip';
import { BsArrowRight } from 'react-icons/bs';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import { MEETUP_DEFAULT_IMAGE } from 'utils/urls';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { CourseName } from 'types/course';
import { Autocomplete } from '@mui/material';
import { getCourseNames } from 'apis/coursesAPI';

const cn = classNames.bind(styles);

const SET_VALUE_OPTION = {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true,
};

interface DateInputProps {
  icon: ReactNode;
  [key: string]: any;
}
const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, icon, onClick, ...others }, ref) => (
    <div className={cn('date-input')} onClick={onClick}>
      <input {...others} />
      <button type="button" aria-label="날짜 선택 버튼">
        {icon}
      </button>
    </div>
  )
);

interface MeetupCreationForm
  extends Omit<
    NewMeetup,
    'dueDate' | 'meetingDate' | 'localLocation' | 'path' | 'maxPeople'
  > {
  dueDate: Date | null;
  meetingDate: Date | null;
  location: MeetupLocation;
  path: string[];
  maxNumOfParticipants: MeetupMaxNumOfParticipants;
}

interface MeetupCreationFormProp {
  createMeetup: (newMeetup: FormData) => void;
}

// TODO: 다른 필드 수정 시 상대 필드에 영향을 X, setValue Error 타이밍
const MeetupCreationForm = ({ createMeetup }: MeetupCreationFormProp) => {
  const {
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<MeetupCreationForm>({
    defaultValues: {
      location: '서울',
      gatheringPlace: '',
      courseName: null,
      path: [],
      pathDifficulty: 1,
      bicycleTypes: ['따릉이'],
      ridingSkill: 1,
      gender: 'mixed',
      minBirthYear: 1920,
      maxBirthYear: new Date().getFullYear(),
      maxNumOfParticipants: 1,
      dueDate: null,
      meetingDate: null,
      participationFee: 0,
      content: '',
    },
  });

  const showToastMessage = useSetRecoilState(toastMessageState);
  const {
    data: courseNames,
    // refetch,
    isLoading,
  } = useQuery<CourseName[]>(['courseNames'], getCourseNames, {
    // enabled: false,
    staleTime: 12 * 60 * 60 * 1000,
    cacheTime: 12 * 60 * 60 * 1000,
    onError: () =>
      showToastMessage('자전거길 목록 로딩 중 문제가 발생했습니다.'),
  });

  const imgFile = watch('meetingImgUrl');
  const dueDate = watch('dueDate');
  const path = watch('path');
  const minBirthYear = watch('minBirthYear');

  const imgURL = imgFile?.length
    ? URL.createObjectURL(imgFile[0])
    : MEETUP_DEFAULT_IMAGE;
  const imgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(255,255,255,0.9)), url(${imgURL})`,
  };

  // Callbacks

  const handlePathAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== ',') return;
    if (!(e.target instanceof HTMLInputElement)) return;
    e.preventDefault();
    const input = e.target.value.trim();
    if (!input) return;

    setValue('path', [...path, input], SET_VALUE_OPTION);
    e.target.value = '';
  };
  const handlePathDelete = (stopIndex: number) => () =>
    setValue(
      'path',
      path.filter((_, valueIndex) => valueIndex !== stopIndex),
      SET_VALUE_OPTION
    );

  const handleMaxNumOfParticipantsDecrease = () => {
    const oldValue = getValues('maxNumOfParticipants');
    setValue(
      'maxNumOfParticipants',
      oldValue <= 1 ? 1 : oldValue - 1,
      SET_VALUE_OPTION
    );
  };
  const handleMaxNumOfParticipantsIncrease = () => {
    const oldValue = getValues('maxNumOfParticipants');
    if (99 <= oldValue) return;
    setValue('maxNumOfParticipants', oldValue + 1, SET_VALUE_OPTION);
  };

  const handleParticipationFeeDecrease = () => {
    const oldValue = getValues('participationFee');
    setValue(
      'participationFee',
      oldValue < 5000 ? 0 : oldValue - 5000,
      SET_VALUE_OPTION
    );
  };
  const handleParticipationFeeIncrease = () =>
    setValue(
      'participationFee',
      getValues('participationFee') + 5000,
      SET_VALUE_OPTION
    );

  const onSubmit: SubmitHandler<MeetupCreationForm> = data => {
    // radio 숫자들 string으로 들어옴
    const newMeetup = {
      ...data,
      localLocation: data.location,
      dueDate: dayjs(data.dueDate).format('YYYY-MM-DD HH:mm:ss'),
      meetingDate: dayjs(data.meetingDate).format('YYYY-MM-DD HH:mm:ss'),
      path: data.path.join(','),
      maxPeople: data.maxNumOfParticipants,
    };
    // @ts-ignore
    delete newMeetup.location;
    // @ts-ignore
    delete newMeetup.maxNumOfParticipants;

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(newMeetup)], {
      type: 'application/json',
    });
    formData.append('meetCreateReq', blob);
    if (imgFile?.length) {
      formData.append('meeting-img', imgFile[0]);
    }

    createMeetup(formData);
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('img-wrapper')} style={imgStyle} />
      <input
        type="file"
        id={cn('img')}
        accept="image/*"
        {...register('meetingImgUrl')}
      />
      <label htmlFor={cn('img')}>
        <AddPhotoAlternateIcon />
        사진 {imgFile?.length ? '변경' : '추가'}하기
      </label>

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
            <h4>집결지</h4>
          </label>
          <Controller
            control={control}
            name="gatheringPlace"
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput placeholder="집결지를 입력하세요." {...field} />
            )}
          />
          {errors.gatheringPlace && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'gatheringPlace',
                errors.gatheringPlace.type
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
            render={({ field: { value, ...others } }) => (
              <DateTimePicker
                selectedDate={value || null}
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
            render={({ field: { value, ...others } }) => (
              <DateTimePicker
                selectedDate={value || null}
                CustomInput={<DateInput icon={<AiOutlineCalendar />} />}
                minDate={dueDate || undefined}
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

        <div className={cn('field', 'maxNumOfParticipants')}>
          <label className={cn('label')}>
            <h4>인원</h4>
          </label>
          <div className={cn('option')}>
            <div className={cn('regulator')}>
              <PlusMinusButton
                color="white"
                size="md"
                label="인원 감소 버튼"
                action="decrease"
                onDecrease={handleMaxNumOfParticipantsDecrease}
              />
              <Controller
                control={control}
                name="maxNumOfParticipants"
                rules={{ min: 1, max: 99 }}
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
                label="인원 증가 버튼"
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

        <div className={cn('field', 'path')}>
          <label className={cn('label')}>
            <h4>코스</h4>
          </label>
          <ul className={cn('stops')}>
            {path.map((stop, index) => (
              <Fragment key={stop + index}>
                {index > 0 && <BsArrowRight />}
                <li>
                  <Chip
                    size="sm"
                    content={stop}
                    isActive
                    isDeletable
                    onXClick={handlePathDelete(index)}
                  />
                </li>
              </Fragment>
            ))}
          </ul>
          {/* TODO: 모바일 폰트 크기 설정 */}
          <Controller
            control={control}
            name="path"
            rules={{ validate: path => path.length >= 2 }}
            render={({ field: { value, onChange, ...others } }) => (
              <TextInput
                placeholder="장소 입력 후 쉼표(,) 키를 눌러 등록하세요. (ex: 잠수교,)"
                onKeyDown={handlePathAdd}
                {...others}
              />
            )}
          />
          {errors.path && (
            <ErrorMessage
              message={getMeetupCreationFormFieldErrorMessage(
                'path',
                errors.path.type as string
              )}
            />
          )}
        </div>

        <div className={cn('field', 'course')}>
          <label className={cn('label')}>
            <h4>관련 자전거길</h4>
            <span className={cn('guide')}>(선택 사항)</span>
          </label>
          <Controller
            control={control}
            name="courseName"
            render={({ field: { onChange, ...others } }) => (
              <Autocomplete
                loading={isLoading}
                loadingText="목록을 불러오고 있습니다"
                noOptionsText="데이터가 존재하지 않습니다."
                options={courseNames || []}
                // onOpen={() => refetch()}
                onChange={(_, value) => onChange(value)}
                renderInput={params => (
                  <div ref={params.InputProps.ref}>
                    <TextInput
                      {...params.inputProps}
                      placeholder="자전거길을 선택하세요."
                    />
                  </div>
                )}
                handleHomeEndKeys
                sx={{
                  '& input': {
                    width: '100%',
                  },
                }}
                {...others}
              />
            )}
          />
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                errors.bicycleTypes.type as string
              )}
            />
          )}
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

        <div className={cn('field', 'participationFee')}>
          <label className={cn('label')}>
            <h4>참가비</h4>
          </label>
          <div className={cn('option')}>
            <div className={cn('regulator')}>
              <PlusMinusButton
                color="white"
                size="md"
                label="참가비 감소 버튼"
                action="decrease"
                onDecrease={handleParticipationFeeDecrease}
              />
              <Controller
                control={control}
                name="participationFee"
                rules={{ min: 0 }}
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
                label="참가비 증가 버튼"
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
