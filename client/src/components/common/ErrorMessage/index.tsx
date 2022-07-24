import { PropsWithChildren } from 'react';
import { HiExclamationCircle } from 'react-icons/hi';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ children }: PropsWithChildren) => (
  <div className={styles.wrapper}>
    <HiExclamationCircle />
    <p>{children}</p>
  </div>
);

export default ErrorMessage;
