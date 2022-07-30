import { forwardRef } from 'react';
import { Select, MenuItem } from '@mui/material';
import styles from './SelectList.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

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
        className={cn('select')}
        inputProps={{ 'aria-label': label }}
        {...others}
        displayEmpty
      >
        <MenuItem value="" className={cn('item')}>
          <em>선택</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem
            key={option.value}
            value={option.value}
            className={cn('item')}
          >
            {option.text}
          </MenuItem>
        ))}
      </Select>
    );
  }
);

export default SelectList;
