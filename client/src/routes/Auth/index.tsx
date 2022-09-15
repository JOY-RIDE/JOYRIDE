import { Outlet } from 'react-router-dom';
import styles from './Auth.module.scss';

const Auth = () => (
  <section className={styles.auth}>
    <Outlet />
  </section>
);

export default Auth;
