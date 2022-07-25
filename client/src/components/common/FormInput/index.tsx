import { forwardRef } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface FormInputProps {
  placeholder: string;
  helpText?: string;
  hasError?: boolean;
  [key: string]: any;
}

// TODO: memo
const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { helpText, hasError, ...others } = props;
  return (
    <>
      <input
        className={cn('input', { error: hasError })}
        ref={ref}
        {...others}
      />
      {helpText && <p className={cn('help')}>{helpText}</p>}
    </>
  );
});

export default FormInput;
