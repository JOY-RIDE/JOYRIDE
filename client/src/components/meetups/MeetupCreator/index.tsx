import { useTheme } from '@emotion/react';
import { Dialog, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { BiPlusCircle } from 'react-icons/bi';
import PopupSlide from 'components/transitions/PopupSlide';
import styles from './MeetupCreator.module.scss';
import classNames from 'classnames/bind';
import MeetupCreationForm from '../MeetupCreationForm';

const cn = classNames.bind(styles);

const MeetupCreator = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <button className={cn('open-btn')} onClick={handleDialogOpen}>
        <BiPlusCircle />
        <span>모임 만들기</span>
      </button>

      <Dialog
        open={open}
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
          <button className={cn('close-btn')} onClick={handleDialogClose}>
            <VscChromeClose />
          </button>
        </header>

        <MeetupCreationForm close={handleDialogClose} />
      </Dialog>
    </>
  );
};

export default MeetupCreator;
