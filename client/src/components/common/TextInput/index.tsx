import { forwardRef } from 'react';
import styles from './TextInput.module.scss';
import classNames from 'classnames/bind';

interface TextInput {
  placeholder: string;
  [key: string]: any;
}

const cn = classNames.bind(styles);

const TextInput = forwardRef<HTMLInputElement, TextInput>((props, ref) => (
  <input className={cn('input')} ref={ref} {...props} />
));

export default TextInput;
