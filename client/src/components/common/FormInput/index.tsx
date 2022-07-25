import { forwardRef } from 'react';
import styles from './FormInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface FormInputProps {
  placeholder: string;
  hasError: boolean;
  [key: string]: any;
}

// TODO: memo
const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { hasError, ...others } = props;
  return (
    <input className={cn('input', { error: hasError })} ref={ref} {...others} />
  );
});

export default FormInput;
