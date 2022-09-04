import styles from './ReviewForm.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import ReviewTitle from '../ReviewTitle';
import { getReviewFormFieldErrorMessage } from 'utils/getErrorMessage';
import { Rating } from '@mui/material';

const cn = classNames.bind(styles);

interface ReviewForm {
  total: string;
  view: string;
  facility: string;
  accessibility: string;
  safety: string;
  totalRating: number;
  viewRating: number;
  facilityRating: number;
  accessibilityRating: number;
  safetyRating: number;
}
interface ReviewFormProp {
  close: () => void;
}

const ReviewForm = ({ close }: ReviewFormProp) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ReviewForm>();
  const showToastMessage = useSetRecoilState(toastMessageState);
  const onSubmit: SubmitHandler<ReviewForm> = data => {
    // radio 숫자들 string으로 들어옴
    console.log(data);
    close();
    showToastMessage('후기가 등록되었습니다');
  };

  //   const [hoverRating, setHoverRating] = useState(0);
  //   const onMouseEnter = (index: number) => setHoverRating(index);
  //   // 마우스가 별 위에 올라가면 스테이트를 변경.
  const [totalRating, setTotalRating] = useState(0);
  const onSaveTotalRating = (index: number) => setTotalRating(index);
  // 클릭시, 별 인덱스를 스테이트에 저장.

  const [viewRating, setViewRating] = useState(0);
  const onSaveViewRating = (index: number) => setViewRating(index);

  const [facilityRating, setFacilityRating] = useState(0);
  const onSaveFacilityRating = (index: number) => setFacilityRating(index);

  const [accessibilityRating, setAccessibilityRating] = useState(0);
  const onSaveAccessibilityRating = (index: number) =>
    setAccessibilityRating(index);

  const [safetyRating, setSafetyRating] = useState(0);
  const onSaveSafetyRating = (index: number) => setSafetyRating(index);

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('fields')}>
        <div className={cn('field')}>
          <ReviewTitle content={'총평'}></ReviewTitle>
          <Controller
            name="totalRating"
            control={control}
            defaultValue={5}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Rating
                name="half-rating"
                precision={0.5}
                size="large"
                onChange={onChange}
                value={Number(value)}
                sx={{
                  fontSize: '4.5rem',
                  margin: '0 0.5rem',
                }}
                // icon={<StarIcon fontSize="inherit" />}
              />
            )}
          />
          {errors.totalRating && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'totalRating',
                errors.totalRating.type
              )}
            />
          )}
          <Controller
            control={control}
            name="total"
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                placeholder="코스에 대한 후기를 자유롭게 작성해주세요(필수)"
                {...field}
              />
            )}
          />
          {errors.total && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'total',
                errors.total.type
              )}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'경관'}></ReviewTitle>
          <Controller
            name="viewRating"
            control={control}
            defaultValue={5}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Rating
                name="half-rating"
                precision={0.5}
                size="large"
                onChange={onChange}
                value={Number(value)}
                sx={{
                  fontSize: '4.5rem',
                  margin: '0 0.5rem',
                }}
                // icon={<StarIcon fontSize="inherit" />}
              />
            )}
          />
          {errors.viewRating && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'viewRating',
                errors.viewRating.type
              )}
            />
          )}
          <Controller
            control={control}
            name="view"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea placeholder="코스의 경관은 어땠나요?" {...field} />
            )}
          />
          {errors.view && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage('view', errors.view.type)}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'편의시설'}></ReviewTitle>
          <Controller
            name="facilityRating"
            control={control}
            defaultValue={5}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Rating
                name="half-rating"
                precision={0.5}
                size="large"
                onChange={onChange}
                value={Number(value)}
                sx={{
                  fontSize: '4.5rem',
                  margin: '0 0.5rem',
                }}
                // icon={<StarIcon fontSize="inherit" />}
              />
            )}
          />
          {errors.facilityRating && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'facilityRating',
                errors.facilityRating.type
              )}
            />
          )}
          <Controller
            control={control}
            name="facility"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea
                placeholder="코스 주변의 편의 시설은 어땠나요?"
                {...field}
              />
            )}
          />
          {errors.facility && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'facility',
                errors.facility.type
              )}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'접근성'}></ReviewTitle>
          <Controller
            name="accessibilityRating"
            control={control}
            defaultValue={5}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Rating
                name="half-rating"
                precision={0.5}
                size="large"
                onChange={onChange}
                value={Number(value)}
                sx={{
                  fontSize: '4.5rem',
                  margin: '0 0.5rem',
                }}
                // icon={<StarIcon fontSize="inherit" />}
              />
            )}
          />
          {errors.accessibilityRating && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'accessibilityRating',
                errors.accessibilityRating.type
              )}
            />
          )}
          <Controller
            control={control}
            name="accessibility"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea placeholder="코스의 접근성은 어땠나요?" {...field} />
            )}
          />
          {errors.accessibility && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'accessibility',
                errors.accessibility.type
              )}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'안전'}></ReviewTitle>
          <Controller
            name="safetyRating"
            control={control}
            defaultValue={5}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Rating
                name="half-rating"
                precision={0.5}
                size="large"
                onChange={onChange}
                value={Number(value)}
                sx={{
                  fontSize: '4.5rem',
                  margin: '0 0.5rem',
                }}
                // icon={<StarIcon fontSize="inherit" />}
              />
            )}
          />
          {errors.safetyRating && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'safetyRating',
                errors.safetyRating.type
              )}
            />
          )}
          <Controller
            control={control}
            name="safety"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea placeholder="코스의 안전은 어땠나요?" {...field} />
            )}
          />
          {errors.safety && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'safety',
                errors.safety.type
              )}
            />
          )}
        </div>
      </div>

      <div className={cn('btn')}>
        <Button
          type="submit"
          color="main"
          size="lg"
          content="작성 완료"
        ></Button>
      </div>
    </form>
  );
};

export default ReviewForm;
