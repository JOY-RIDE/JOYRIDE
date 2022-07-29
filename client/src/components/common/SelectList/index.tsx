import { forwardRef } from 'react';
import { Select, MenuItem } from '@mui/material';

interface Option {
  value: number;
  text: string;
}

interface SelectListProps {
  options: Option[];
  label: string;
  [key: string]: any;
}

const SelectList = forwardRef<HTMLSelectElement, SelectListProps>(
  (props, ref) => {
    const { options, label, ...others } = props;
    return (
      <Select
        inputRef={ref}
        inputProps={{ 'aria-label': label }}
        {...others}
        displayEmpty
      >
        <MenuItem value="">
          <em>선택</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

export default SelectList;
