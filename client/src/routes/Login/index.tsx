import { Link } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import LoginForm from 'components/login/LoginForm';
import SocialLoginButton from 'components/common/SocialLoginButton';
import naver_circle from 'assets/images/naver_circle.svg';
import kakao_circle from 'assets/images/kakao_circle.svg';
import google_circle from 'assets/images/google_circle.svg';
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

    <div className={cn('divider')}>
      <span>또는</span>
    </div>

    <ul className={cn('providers')}>
      <li className={cn('provider')}>
        <SocialLoginButton
          provider="네이버"
          imageURL={naver_circle}
          // TODO: 로그인 API 연결
          onClick={() => {}}
        />
      </li>
      <li className={cn('provider')}>
        <SocialLoginButton
          provider="카카오"
          imageURL={kakao_circle}
          onClick={() => {}}
        />
      </li>
      <li className={cn('provider')}>
        <SocialLoginButton
          provider="구글"
          imageURL={google_circle}
          onClick={() => {}}
        />
      </li>
    </ul>
  </section>
);

export default Login;
