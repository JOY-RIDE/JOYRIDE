import { memo } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = memo(({ text }: { text: string }) => (
  <div className={styles.wrapper}>
    <HiExclamationCircle />
    <p>{text}</p>
  </div>
));

export default ErrorMessage;
