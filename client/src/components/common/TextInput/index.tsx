import { forwardRef, memo } from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  placeholder?: string;
  [key: string]: any;
}

const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(
    ({ className, placeholder, ...others }, ref) => (
      <input
        className={styles.input}
        placeholder={placeholder}
        ref={ref}
        {...others}
      />
    )
  )
);

export default TextInput;
