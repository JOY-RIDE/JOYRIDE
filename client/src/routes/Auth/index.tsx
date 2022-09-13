import { Outlet } from 'react-router-dom';
import styles from './Auth.module.scss';

const AuthPage = () => (
  <section className={styles.auth}>
    <Outlet />
  </section>
);

export default AuthPage;
