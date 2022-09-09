import { useRecoilValue, useResetRecoilState } from 'recoil';
import { modalContentState } from 'states/common';
import { Dialog } from '@mui/material';

const Modal = () => {
  const content = useRecoilValue(modalContentState);
  const close = useResetRecoilState(modalContentState);
  return (
    <Dialog
      open={Boolean(content)}
      BackdropProps={{ style: { background: 'rgba(0,0,0,0.2)' } }}
      PaperProps={{
        style: {
          borderRadius: '1rem',
          boxShadow:
            'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        },
      }}
      onBackdropClick={close}
    >
      {content}
    </Dialog>
  );
};

export default Modal;
