import { forwardRef } from 'react';
import { Select, MenuItem } from '@mui/material';
import { Option } from 'types/common';

interface SelectListProps {
  size?: 'md' | 'lg';
  options: Option<number | string>[];
  label: string;
  [key: string]: any;
}

const SelectList = forwardRef<HTMLSelectElement, SelectListProps>(
  (props, ref) => {
    const { size = 'md', options, label, ...others } = props;
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
        <MenuItem
          value=""
          sx={{
            justifyContent: 'center',
          }}
        >
          <em>{label}</em>
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
