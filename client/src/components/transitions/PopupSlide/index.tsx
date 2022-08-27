import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref } from 'react';

const PopupSlide = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
  ) => <Slide direction="up" timeout={1500} ref={ref} {...props} />
);

export default PopupSlide;
