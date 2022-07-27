import { forwardRef } from 'react';
import styles from './SelectButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectButtonProps {
  isSelected: boolean;
  name: string;
  value: string;
  text: string;
  textEng: string;
  [key: string]: any;
}

const SelectButton = forwardRef<HTMLInputElement, SelectButtonProps>(
  (props, ref) => {
    const { isSelected, text, textEng, ...others } = props;
    return (
      <>
        <input
          ref={ref}
          type="checkbox"
          checked={isSelected}
          id={cn(textEng)}
          className={cn('input')}
          {...others}
        />
        <label htmlFor={cn(textEng)} className={cn('btn')}>
          {text}
        </label>
      </>
    );
  }
);

export default SelectButton;
