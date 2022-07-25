import { forwardRef } from 'react';
import ErrorMessage from '../ErrorMessage';
import styles from './TextInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface TextInputProps {
  placeholder: string;
  errorMessage?: string;
  [key: string]: any;
}

// TODO: memo
const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { errorMessage, ...others } = props;
  return (
    <div className={cn('wrapper')}>
      <input
        className={cn('input', { error: errorMessage })}
        ref={ref}
        {...others}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
});

export default TextInput;
