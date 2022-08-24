import { forwardRef, memo } from 'react';
import styles from './AuthFormInput.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface AuthFormInputProps {
  placeholder: string;
  helpText?: string;
  hasError?: boolean;
  [key: string]: any;
}

const AuthFormInput = memo(
  forwardRef<HTMLInputElement, AuthFormInputProps>((props, ref) => {
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
  })
);

export default AuthFormInput;
