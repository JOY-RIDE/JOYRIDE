import { forwardRef } from 'react';
import { Select, MenuItem } from '@mui/material';

interface Option {
  value: string;
  content: string;
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
        inputProps={{ 'aria-label': label }}
        sx={{
          fontSize: '2rem',
          '& .MuiSelect-select': {
            padding: '1rem 1.6rem',
          },
        }}
        displayEmpty
        inputRef={ref}
        {...others}
      >
        <MenuItem value="">
          <em>선택</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.content}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

export default SelectList;
