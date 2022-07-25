import { Link } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import LoginForm from 'components/login/LoginForm';
import SocialLogin from 'components/login/SocialLogin';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Login = () => (
  <section className={styles.login}>
    <PageTitle size="lg">로그인</PageTitle>

    <LoginForm />

    <div className={cn('links')}>
      <Link to="/signup" className={cn('signup')}>
        회원가입하기
      </Link>
      <div className={cn('find')}>
        {/* TODO: API 명세서 참조 */}
        <Link to="/" className={cn('id')}>
          아이디
        </Link>
        <Link to="/" className={cn('password')}>
          비밀번호 찾기
        </Link>
      </div>
    </div>

    <SocialLogin />
  </section>
);

export default Login;
