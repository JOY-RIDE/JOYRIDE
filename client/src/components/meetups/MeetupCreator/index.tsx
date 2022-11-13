import { Dialog } from '@mui/material';
import { VscChromeClose } from 'react-icons/vsc';
import { BiPlusCircle } from 'react-icons/bi';
import PopupSlide from 'components/transitions/PopupSlide';
import styles from './MeetupCreator.module.scss';
import classNames from 'classnames/bind';
import MeetupCreationForm from '../MeetupCreationForm';
import useDialog from 'hooks/common/useDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';

const cn = classNames.bind(styles);

const MeetupCreator = () => {
  const { isOpen, handlePopupOpen, handlePopupClose, isFullScreen } =
    useDialog();
  const showToastMessage = useSetRecoilState(toastMessageState);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(meetupAPI.createMeetup, {
    onSuccess: () => {
      showToastMessage('모임이 등록되었습니다.');
      handlePopupClose();
      queryClient.invalidateQueries(['meetups']);
    },
    onError: (e: any) => {
      if (e.message === '5003') {
        showToastMessage('이미지 파일을 다시 확인해 주세요.');
        return;
      }
      showToastMessage('모임 등록 중 문제가 발생했습니다.');
    },
  });

  const createMeetup = (newMeetup: FormData) => mutate(newMeetup);

  return (
    <>
      <button className={cn('open-btn')} onClick={handlePopupOpen}>
        <BiPlusCircle />
        <span>모임 만들기</span>
      </button>

      <Dialog
        open={isOpen}
        fullScreen={isFullScreen}
        aria-labelledby="모임 만들기"
        BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } }}
        PaperProps={{
          style: {
            borderRadius: 0,
            boxShadow: 'none',
            width: 'min(100%, 60rem)',
            overflowY: 'hidden',
          },
        }}
        TransitionComponent={isFullScreen ? PopupSlide : undefined}
      >
        <header className={cn('header')}>
          <h2 className={cn('title')}>모임 만들기</h2>
          <button className={cn('close-btn')} onClick={handlePopupClose}>
            <VscChromeClose />
          </button>
        </header>
        <MeetupCreationForm createMeetup={createMeetup} />
      </Dialog>
    </>
  );
};

export default MeetupCreator;
