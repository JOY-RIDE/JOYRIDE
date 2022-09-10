import { useState, forwardRef, ReactElement, Ref } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styles from './ReviewWriter.module.scss';
import classNames from 'classnames/bind';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/Button';
import ReviewForm from '../ReviewForm';
import { toastMessageState } from 'states/common';
import { useTheme } from '@emotion/react';
import { Slide, Dialog, useMediaQuery } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { HiX } from 'react-icons/hi';
import { userIdState } from 'states/auth';

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
  const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);

  const showToastMessage = useSetRecoilState(toastMessageState);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const handleClickOpen = () => {
    if (loggedInUser === null) {
      showToastMessage('로그인이 필요한 서비스입니다.');
      setTimeout(function () {
        navigate(`/auth/login?next=${currentPath}`);
      }, 1000);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        className={cn('review-writer')}
        fullScreen={isFullScreen}
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
        TransitionComponent={isFullScreen ? Transition : undefined}
      >
        <div className={cn('review-header')}>
          <PageTitle size="md">후기 쓰기</PageTitle>
          <button onClick={handleClose}>
            <HiX />
          </button>
        </div>
        <div className={cn('review-main')}>
          <ReviewForm close={handleClose} />
        </div>
      </Dialog>
    </>
  );
};

export default ReviewWriter;
