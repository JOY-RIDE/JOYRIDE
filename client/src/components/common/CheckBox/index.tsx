import { forwardRef } from 'react';
import { Checkbox } from '@mui/material';

interface CheckBoxProps {
  checked: boolean;
  [key: string]: any;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
  const { checked = false, ...others } = props;
  return (
    <Checkbox
      sx={{ paddingRight: '0.5rem' }}
      inputRef={ref}
      checked={checked}
      {...others}
      disableRipple
    />
  );
});

export default CheckBox;
