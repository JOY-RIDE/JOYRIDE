import { memo } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface TextArea {
  defaultText?: string;
  readOnly?: boolean;
}

const TextArea = memo(({ defaultText, readOnly }: TextArea) => (
  <textarea
    className={cn('textarea', { readOnly })}
    defaultValue={defaultText}
    readOnly={readOnly}
    rows={4}
  />
));

export default TextArea;
