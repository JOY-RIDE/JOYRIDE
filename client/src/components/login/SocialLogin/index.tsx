import SocialLoginButton from '../SocialLoginButton';
import naver_circle from 'assets/images/naver_circle.svg';
import kakao_circle from 'assets/images/kakao_circle.svg';
import google_circle from 'assets/images/google_circle.svg';
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
      <li>
        <SocialLoginButton href="#" provider="네이버" imgSRC={naver_circle} />
      </li>
      <li>
        <SocialLoginButton href="#" provider="카카오" imgSRC={kakao_circle} />
      </li>
      <li>
        <SocialLoginButton
          href="http://localhost:9001/oauth2/authorization/google"
          provider="구글"
          imgSRC={google_circle}
        />
      </li>
    </ul>
  </>
);

export default SocialLogin;
