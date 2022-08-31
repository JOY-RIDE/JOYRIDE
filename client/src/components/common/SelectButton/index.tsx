import { forwardRef, memo } from 'react';
import styles from './SelectButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectButtonProps {
  type: 'checkbox' | 'radio';
  name: string;
  value: number | string;
  content: string;
  isSelected: boolean;
  // size:
  [key: string]: any;
}

const SelectButton = memo(
  forwardRef<HTMLInputElement, SelectButtonProps>((props, ref) => {
    const {
      type,
      name,
      value,
      content,
      isSelected,
      size = 'sm',
      ...others
    } = props;
    return (
      <>
        <input
          type={type}
          checked={isSelected}
          name={name}
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
