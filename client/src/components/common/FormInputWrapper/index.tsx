import { PropsWithChildren } from 'react';
import styles from './FormInputWrapper.module.scss';

const FormInputWrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.wrapper}>{children}</div>
);

export default FormInputWrapper;
