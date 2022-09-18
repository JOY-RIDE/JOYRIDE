import { Link } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import LoginForm from 'components/login/LoginForm';
import SocialLogin from 'components/login/SocialLogin';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Login = () => (
  <>
    <PageTitle size="lg">로그인</PageTitle>
    <LoginForm />
    <div className={cn('links')}>
      <Link to="/auth/signup" className={cn('signup')}>
        회원가입
      </Link>
      <div className={cn('find')}>
        <Link to="/auth/find_email" className={cn('email')}>
          이메일
        </Link>
        <Link to="/auth/reset_password" className={cn('password')}>
          비밀번호 찾기
        </Link>
      </div>
    </div>
    {/* <SocialLogin /> */}
  </>
);

export default Login;
