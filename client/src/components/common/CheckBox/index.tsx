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
      checked={isChecked}
      sx={{ paddingRight: 0, marginRight: '0.5rem' }}
      disableRipple
      inputRef={ref}
      {...others}
    />
  );
});

export default CheckBox;
