import { useRecoilValue, useResetRecoilState } from 'recoil';
import { modalContentState } from 'states/common';
import { Dialog } from '@mui/material';

const Modal = () => {
  const content = useRecoilValue(modalContentState);
  const close = useResetRecoilState(modalContentState);
  return (
    <Dialog
      open={Boolean(content)}
      BackdropProps={{ style: { background: 'none' } }}
      PaperProps={{
        style: {
          borderRadius: '0.5rem',
          boxShadow: 'none',
        },
      }}
      onBackdropClick={close}
    >
      {content}
    </Dialog>
  );
};

export default Modal;
