import { forwardRef, memo } from 'react';
import styles from './SelectButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectButtonProps {
  name: string;
  value: number | string;
  content: string;
  isSelected: boolean;
  // size:
  [key: string]: any;
}

const SelectButton = memo(
  forwardRef<HTMLInputElement, SelectButtonProps>((props, ref) => {
    const { name, value, content, isSelected, size = 'sm', ...others } = props;
    return (
      <>
        <input
          type="radio"
          checked={isSelected}
          name={name}
          value={value}
          id={cn(value)}
          className={cn('input')}
          ref={ref}
          {...others}
        />
        <label htmlFor={cn(value)} className={cn('btn', size)}>
          {content}
        </label>
      </>
    );
  })
);

export default SelectButton;
