import { Dialog } from '@mui/material';
import { VscChromeClose } from 'react-icons/vsc';
import { BiPlusCircle } from 'react-icons/bi';
import PopupSlide from 'components/transitions/PopupSlide';
import styles from './MeetupCreator.module.scss';
import classNames from 'classnames/bind';
import MeetupCreationForm from '../MeetupCreationForm';
import useResponsivePopup from 'hooks/useResponsivePopup';

const cn = classNames.bind(styles);

const MeetupCreator = () => {
  const { isOpen, handlePopupOpen, handlePopupClose, isFullScreen } =
    useResponsivePopup();
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
            boxShadow: 'none',
            width: 'min(100%, 60rem)',
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
        <MeetupCreationForm close={handlePopupClose} />
      </Dialog>
    </>
  );
};

export default MeetupCreator;
