import { forwardRef } from 'react';
import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CheckBoxProps {
  isChecked: boolean;
  [key: string]: any;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
  const { isChecked, ...others } = props;
  return (
    <Checkbox
      checked={isChecked}
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{
        color: '#e0e0e0',
        paddingRight: 0,
        marginRight: '0.5rem',
        '& svg': { fontSize: '2rem' },
      }}
      disableRipple
      inputRef={ref}
      {...others}
    />
  );
});

export default CheckBox;
