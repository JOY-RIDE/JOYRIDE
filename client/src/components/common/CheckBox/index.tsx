import { forwardRef } from 'react';
import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CheckBoxProps {
  shape: 'square' | 'circle';
  isChecked: boolean;
  [key: string]: any;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ shape, isChecked, ...others }, ref) => (
    <Checkbox
      icon={shape === 'circle' ? <RadioButtonUncheckedIcon /> : undefined}
      checkedIcon={shape === 'circle' ? <CheckCircleIcon /> : undefined}
      checked={isChecked}
      sx={{
        color: '#e0e0e0',
        padding: 0,
        '& svg': { fontSize: '2rem' },
      }}
      disableRipple
      inputRef={ref}
      {...others}
    />
  )
);

export default CheckBox;
