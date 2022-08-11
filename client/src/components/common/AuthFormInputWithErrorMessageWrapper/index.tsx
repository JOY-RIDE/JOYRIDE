import { PropsWithChildren } from 'react';
import styles from './AuthFormInputWithErrorMessageWrapper.module.scss';

const AuthFormInputWithErrorMessageWrapper = ({
  children,
}: PropsWithChildren) => <div className={styles.wrapper}>{children}</div>;

export default AuthFormInputWithErrorMessageWrapper;
