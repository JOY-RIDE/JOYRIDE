import { forwardRef, memo } from 'react';
import styles from './SelectButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectButtonProps {
  size?: 'md' | 'lg';
  type: 'checkbox' | 'radio';
  value: number | string;
  content: string;
  isSelected: boolean;
  [key: string]: any;
}

const SelectButton = memo(
  forwardRef<HTMLInputElement, SelectButtonProps>((props, ref) => {
    const { size = 'md', type, value, content, isSelected, ...others } = props;
    return (
      <>
        <input
          type={type}
          checked={isSelected}
          value={value}
          id={cn(content)}
          className={cn('input')}
          ref={ref}
          {...others}
        />
        <label htmlFor={cn(content)} className={cn('btn', size)}>
          {content}
        </label>
      </>
    );
  })
);

export default SelectButton;
