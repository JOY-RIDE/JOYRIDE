import { forwardRef } from 'react';
import styles from './RadioButton.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface RadioButtonProps {
  isChecked: boolean;
  name: string;
  text: string;
  textEng: string;
  [key: string]: any;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => {
    const { isChecked, text, textEng, ...others } = props;
    return (
      <div>
        <input
          ref={ref}
          type="radio"
          checked={isChecked}
          id={cn('textEng')}
          className={cn('input')}
          {...others}
        />
        <label htmlFor={cn('textEng')} className={cn('btn')}>
          {text}
        </label>
      </div>
    );
  }
);

export default RadioButton;
