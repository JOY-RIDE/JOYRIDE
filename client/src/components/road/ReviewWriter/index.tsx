import { useState, forwardRef, ReactElement, Ref } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './ReviewWriter.module.scss';
import classNames from 'classnames/bind';
import PopupSlide from 'components/transitions/PopupSlide';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/Button';
import ReviewForm from '../ReviewForm';
import useDialog from 'hooks/useDialog';
import { toastMessageState } from 'states/common';
import { Dialog } from '@mui/material';
import { HiX } from 'react-icons/hi';
import { userIdState } from 'states/auth';
import { courseAPI } from 'apis/courseAPI';

const cn = classNames.bind(styles);

const ReviewWriter = () => {
  const { isOpen, handlePopupOpen, handlePopupClose, isFullScreen } =
    useDialog();
  const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);

  const showToastMessage = useSetRecoilState(toastMessageState);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(courseAPI.createReview, {
    onSuccess: () => {
      showToastMessage('리뷰가 등록되었습니다.');
      handlePopupClose();
      queryClient.invalidateQueries(['serverInfo']);
    },
    onError: (e: any) => {
      showToastMessage('리뷰 등록 중 문제가 발생했습니다.');
    },
  });

  const createReview = (newReview: string) => mutate(newReview);

  return (
    <>
      <div className={cn('wrapper')}>
        <Button
          type="button"
          color="whiteMain"
          size="lg"
          content="후기 쓰기"
          onClick={handlePopupOpen}
        ></Button>
      </div>
      <Dialog
        className={cn('review-writer')}
        fullScreen={isFullScreen}
        open={isOpen}
        aria-labelledby="리뷰 작성"
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
        TransitionComponent={isFullScreen ? PopupSlide : undefined}
      >
        <div className={cn('review-header')}>
          <PageTitle size="md">후기 쓰기</PageTitle>
          <button onClick={handlePopupClose}>
            <HiX />
          </button>
        </div>
        <div className={cn('review-main')}>
          <ReviewForm createReview={createReview} />
        </div>
      </Dialog>
    </>
  );
};

export default ReviewWriter;
