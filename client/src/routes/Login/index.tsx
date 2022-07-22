import PageTitle from 'components/common/PageTitle';
import LoginForm from 'components/login/LoginForm';
import styles from './Login.module.scss';

const Login = () => (
  <section className={styles.login}>
    <PageTitle size="lg">로그인</PageTitle>
    <LoginForm />
  </section>
);

export default Login;
