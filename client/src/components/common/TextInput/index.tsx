import { forwardRef } from 'react';
import styles from './TextInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface TextInputProps {
  placeholder: string;
  hasError: boolean;
  [key: string]: any;
}

// TODO: memo
const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { hasError, ...others } = props;
  return (
    <input className={cn('input', { error: hasError })} ref={ref} {...others} />
  );
});

export default TextInput;
