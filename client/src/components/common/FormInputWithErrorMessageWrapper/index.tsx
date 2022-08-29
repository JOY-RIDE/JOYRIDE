import { PropsWithChildren } from 'react';
import styles from './FormInputWithErrorMessageWrapper.module.scss';

const FormInputWithErrorMessageWrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.wrapper}>{children}</div>
);

export default FormInputWithErrorMessageWrapper;
