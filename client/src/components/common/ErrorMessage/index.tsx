import { memo } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProp {
  content: string;
}

const ErrorMessage = memo(({ content }: ErrorMessageProp) => (
  <div className={styles.wrapper} role="alert">
    <HiExclamationCircle />
    <p>{content}</p>
  </div>
));

export default ErrorMessage;
