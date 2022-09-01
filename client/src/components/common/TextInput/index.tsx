import { forwardRef, memo } from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  placeholder?: string;
  [key: string]: any;
}

const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>(({ placeholder, ...others }) => (
    <input className={styles.input} placeholder={placeholder} {...others} />
  ))
);

export default TextInput;
