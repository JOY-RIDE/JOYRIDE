import { memo } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface TextAreaProps {
  defaultText?: string;
  readOnly?: boolean;
}

const TextArea = memo(({ defaultText, readOnly }: TextAreaProps) => (
  <textarea
    className={cn('textarea', { readOnly })}
    defaultValue={defaultText}
    readOnly={readOnly}
    rows={6}
  />
));

export default TextArea;
