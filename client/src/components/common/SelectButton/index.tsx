import { forwardRef, memo } from 'react';
import styles from './SelectButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SelectButtonProps {
  isSelected: boolean;
  name: string;
  value: string;
  content: string;
  contentEng: string;
  [key: string]: any;
}

const SelectButton = memo(
  forwardRef<HTMLInputElement, SelectButtonProps>((props, ref) => {
    const { isSelected, content, contentEng, ...others } = props;
    return (
      <>
        <input
          type="checkbox"
          checked={isSelected}
          id={cn(contentEng)}
          className={cn('input')}
          ref={ref}
          {...others}
        />
        <label htmlFor={cn(contentEng)} className={cn('btn')}>
          {content}
        </label>
      </>
    );
  })
);

export default SelectButton;
