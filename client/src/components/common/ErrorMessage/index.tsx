import { memo } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProp {
  message: string;
}

const ErrorMessage = memo(({ message }: ErrorMessageProp) => (
  <div className={styles.wrapper} role="alert">
    <HiExclamationCircle />
    <p>{message}</p>
  </div>
));

export default ErrorMessage;
