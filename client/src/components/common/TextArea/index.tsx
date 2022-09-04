import { forwardRef, memo } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);
interface TextAreaProps {
  defaultText?: string;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  [key: string]: any;
}

const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ defaultText, placeholder, readOnly, rows = 6, ...others }, ref) => (
      <textarea
        className={cn('textarea', { readOnly })}
        defaultValue={defaultText}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        ref={ref}
        {...others}
      />
    )
  )
);
export default TextArea;
