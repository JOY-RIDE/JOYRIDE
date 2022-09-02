import { forwardRef, memo } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface TextAreaProps {
  defaultText?: string;
  placeholder?: string;
  readOnly?: boolean;
  [key: string]: any;
}

// TODO: props
const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ defaultText, placeholder, readOnly, ...others }, ref) => (
      <textarea
        className={cn('textarea', { readOnly })}
        defaultValue={defaultText}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={6}
        ref={ref}
        {...others}
      />
    )
  )
);

export default TextArea;
