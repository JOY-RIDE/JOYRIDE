import SocialLoginButton from '../SocialLoginButton';
import socialLogin_naver from 'assets/images/socialLogin_naver.svg';
import socialLogin_kakao from 'assets/images/socialLogin_kakao.svg';
import socialLogin_google from 'assets/images/socialLogin_google.svg';
import styles from './SocialLogin.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const SocialLogin = () => (
  <>
    <div className={cn('divider')}>
      <span>또는</span>
    </div>
    <ul className={cn('providers')}>
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
      <li>
        <SocialLoginButton
          href="http://prod.joyride.site:9001/oauth2/authorization/google"
          provider="구글"
          imgSRC={socialLogin_google}
        />
      </li>
    </ul>
  </>
);

export default SocialLogin;
