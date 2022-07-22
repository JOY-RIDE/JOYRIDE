import { forwardRef } from 'react';
import ErrorMessage from '../ErrorMessage';
import styles from './TextInput.module.scss';
import classNames from 'classnames/bind';

interface TextInput {
  placeholder: string;
  errorMessage?: string | undefined;
  [key: string]: any;
}

const cn = classNames.bind(styles);

const TextInput = forwardRef<HTMLInputElement, TextInput>((props, ref) => {
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
