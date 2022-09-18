import styles from './AskLogin.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { Link, useLocation } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { modalContentState } from 'states/common';
import SocialLoginButton from 'components/login/SocialLoginButton';
import socialLogin_naver from 'assets/images/socialLogin_naver.svg';
import socialLogin_kakao from 'assets/images/socialLogin_kakao.svg';
import socialLogin_google from 'assets/images/socialLogin_google.svg';

const cn = classNames.bind(styles);

const AskLogin = () => {
  const { pathname } = useLocation();
  const close = useResetRecoilState(modalContentState);
  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>로그인이 필요한 서비스입니다.</h1>
      <div className={cn('login-btn')}>
        <Link to={`/auth/login?next=${pathname}`}>
          <Button
            type="button"
            color="main"
            size="md"
            content="로그인하기"
            onClick={close}
          />
        </Link>
      </div>

      {/* <div className={cn('divider')}>
        <span>또는</span>
      </div>
      <ul className={cn('providers')}> */}
      {/* TODO */}
      {/* <li>
          <SocialLoginButton
            href="#"
            provider="네이버"
            imgSRC={socialLogin_naver}
          />
        </li>
        <li>
          <SocialLoginButton
            href="#"
            provider="카카오"
            imgSRC={socialLogin_kakao}
          />
        </li> */}
      {/* <li>
          <SocialLoginButton
            href="https://prod.joyride.site/oauth2/authorization/google"
            provider="구글"
            imgSRC={socialLogin_google}
          />
        </li>
      </ul> */}
    </div>
  );
};

export default AskLogin;
