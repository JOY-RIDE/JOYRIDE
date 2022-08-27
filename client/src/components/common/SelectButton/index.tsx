import { forwardRef, memo } from 'react';
import styles from './SelectButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectButtonProps {
  name: string;
  value: number | string;
  content: string;
  isSelected: boolean;
  [key: string]: any;
}

const SelectButton = memo(
  forwardRef<HTMLInputElement, SelectButtonProps>((props, ref) => {
    const { name, content, isSelected, ...others } = props;
    return (
      <>
        <input
          type="checkbox"
          checked={isSelected}
          name={name}
          id={cn(name)}
          className={cn('input')}
          ref={ref}
          {...others}
        />
        <label htmlFor={cn(name)} className={cn('btn')}>
          {content}
        </label>
      </>
    );
  })
);

export default SelectButton;
