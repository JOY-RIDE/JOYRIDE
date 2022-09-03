import { forwardRef } from 'react';
import { Select, MenuItem } from '@mui/material';

interface Option {
  value: string;
  content: string;
}
interface SelectListProps {
  size?: 'md' | 'lg';
  options: Option[];
  label: string;
  defaultText?: string;
  [key: string]: any;
}

const SelectList = forwardRef<HTMLSelectElement, SelectListProps>(
  (props, ref) => {
    const { size = 'md', options, label, defaultText, ...others } = props;
    return (
      <Select
        inputProps={{ 'aria-label': label }}
        sx={{
          fontSize: size === 'md' ? '1.6rem' : '2rem',
          '& .MuiSelect-select': {
            padding: '1rem 1.6rem',
          },
        }}
        displayEmpty
        inputRef={ref}
        {...others}
      >
        <MenuItem value="">
          <em>{defaultText || '선택'}</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              justifyContent: 'center',
            }}
          >
            {option.content}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

export default SelectList;
