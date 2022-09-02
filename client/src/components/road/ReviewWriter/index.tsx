import { useState, forwardRef, ReactElement, Ref } from 'react';
import styles from './ReviewWriter.module.scss';
import classNames from 'classnames/bind';
import { isMapOpenedState } from 'states/course';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/Button';
import ReviewTitle from '../ReviewTitle';
import ReviewStar from '../ReviewStar';
import ReviewForm from '../ReviewForm';
import { useTheme } from '@emotion/react';
import { Slide, Dialog, useMediaQuery } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { HiX } from 'react-icons/hi';

const cn = classNames.bind(styles);

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewWriter = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const onMouseEnter = (index: number) => setHoverRating(index);
  // 마우스가 별 위에 올라가면 스테이트를 변경.
  const onMouseLeave = () => setHoverRating(0);
  //   // 마우스가 별 밖으로 나가면 스테이트를 0으로 변경.
  const onSaveRating = (index: number) => setRating(index);
  // 클릭시, 별 인덱스를 스테이트에 저장.

  return (
    <>
      <Button
        type="button"
        color="whiteMain"
        size="lg"
        content="후기 쓰기"
        onClick={handleClickOpen}
      ></Button>
      <Dialog
        fullScreen={isFullScreen}
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
        TransitionComponent={isFullScreen ? Transition : undefined}
      >
        <div className={cn('review')}>
          <div className={cn('review-header')}>
            <PageTitle size="md">후기 쓰기</PageTitle>
            <button onClick={handleClose}>
              <HiX />
            </button>
          </div>
          <div className={cn('review-main')}>
            <ReviewTitle content={'총평'}></ReviewTitle>
            <div className={cn('stars')}>
              {[1, 2, 3, 4, 5].map(idx => {
                return (
                  <ReviewStar
                    index={idx}
                    rating={rating}
                    hoverRating={hoverRating}
                    onMouseEnter={onMouseEnter}
                    onSaveRating={onSaveRating}
                  />
                );
              })}
            </div>
            <ReviewForm />
            <ReviewTitle content={'경관'}></ReviewTitle>
            <ReviewTitle content={'편의시설'}></ReviewTitle>
            <ReviewTitle content={'접근성'}></ReviewTitle>
            <ReviewTitle content={'안전'}></ReviewTitle>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ReviewWriter;
