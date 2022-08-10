import { PropsWithChildren } from 'react';
import styles from './FormInputWrapper.module.scss';

// TODO
const FormInputWrapper = ({ children }: PropsWithChildren) => (
  <div className={styles.wrapper}>{children}</div>
);

export default FormInputWrapper;
