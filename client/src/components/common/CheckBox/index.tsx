import { forwardRef } from 'react';
import { Checkbox } from '@mui/material';

interface CheckBoxProps {
  isChecked: boolean;
  [key: string]: any;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
  const { isChecked, ...others } = props;
  return (
    <Checkbox
      sx={{ paddingRight: '0.5rem' }}
      inputRef={ref}
      checked={isChecked}
      {...others}
      disableRipple
    />
  );
});

export default CheckBox;
