import styles from './ReviewForm.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import Button from 'components/common/Button';
import TextArea from 'components/common/TextArea';
import ErrorMessage from 'components/common/ErrorMessage';
import ReviewTitle from '../ReviewTitle';
import { getReviewFormFieldErrorMessage } from 'utils/getErrorMessage';
import { Rating } from '@mui/material';
import { userIdState } from 'states/auth';

const cn = classNames.bind(styles);

interface ReviewForm {
  title: string | undefined;
  user_id: number | null;
  total_review: string;
  scene_review: string;
  facilities_review: string;
  accessibility_review: string;
  safety_review: string;
  scene_rate: number;
  facilities_rate: number;
  accessibility_rate: number;
  safety_rate: number;
}
interface ReviewFormProp {
  createReview: (newReview: string) => void;
}

const ReviewForm = ({ createReview }: ReviewFormProp) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ReviewForm>();
  const showToastMessage = useSetRecoilState(toastMessageState);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);
  const { roadId: crsNm } = useParams();

  const onSubmit: SubmitHandler<ReviewForm> = data => {
    // radio 숫자들 string으로 들어옴
    // const newReview =JSON.stringify(data);
    data.user_id = loggedInUser;
    data.title = crsNm;
    createReview(JSON.stringify(data));
  };

  return (
    <form className={cn('form')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('fields')}>
        <div className={cn('field')}>
          <ReviewTitle content={'총평'}></ReviewTitle>
          <Controller
            control={control}
            name="total_review"
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                placeholder="코스에 대한 후기를 자유롭게 작성해주세요(필수)"
                {...field}
              />
            )}
          />
          {errors.total_review && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'total',
                errors.total_review.type
              )}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'경관'}></ReviewTitle>
          <Controller
            name="scene_rate"
            control={control}
            defaultValue={0}
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
          {errors.scene_rate && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'view',
                errors.scene_rate.type
              )}
            />
          )}
          <Controller
            control={control}
            name="scene_review"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea placeholder="코스의 경관은 어땠나요?" {...field} />
            )}
          />
          {errors.scene_review && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'view',
                errors.scene_review.type
              )}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'편의시설'}></ReviewTitle>
          <Controller
            name="facilities_rate"
            control={control}
            defaultValue={0}
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
          {errors.facilities_rate && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'facilityRating',
                errors.facilities_rate.type
              )}
            />
          )}
          <Controller
            control={control}
            name="facilities_review"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea
                placeholder="코스 주변의 편의 시설은 어땠나요?"
                {...field}
              />
            )}
          />
          {errors.facilities_review && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'facility',
                errors.facilities_review.type
              )}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'접근성'}></ReviewTitle>
          <Controller
            name="accessibility_rate"
            control={control}
            defaultValue={0}
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
          {errors.accessibility_rate && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'accessibilityRating',
                errors.accessibility_rate.type
              )}
            />
          )}
          <Controller
            control={control}
            name="accessibility_review"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea placeholder="코스의 접근성은 어땠나요?" {...field} />
            )}
          />
          {errors.accessibility_review && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'accessibility',
                errors.accessibility_review.type
              )}
            />
          )}
        </div>
        <div className={cn('field')}>
          <ReviewTitle content={'안전'}></ReviewTitle>
          <Controller
            name="safety_rate"
            control={control}
            defaultValue={0}
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
          {errors.safety_rate && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'safetyRating',
                errors.safety_rate.type
              )}
            />
          )}
          <Controller
            control={control}
            name="safety_review"
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea placeholder="코스의 안전은 어땠나요?" {...field} />
            )}
          />
          {errors.safety_review && (
            <ErrorMessage
              message={getReviewFormFieldErrorMessage(
                'safety',
                errors.safety_review.type
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
