import { useRecoilValue } from 'recoil';
import { authAPIState } from 'states/atoms';
import SocialLoginButton from '../SocialLoginButton';
import naver_circle from 'assets/images/naver_circle.svg';
import kakao_circle from 'assets/images/kakao_circle.svg';
import google_circle from 'assets/images/google_circle.svg';
import styles from './SocialLogin.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const SocialLogin = () => {
  const authAPI = useRecoilValue(authAPIState)
  return (
    <>
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
            onClick={authAPI.loginGoogle}
          />
        </li>
      </ul>
    </>
  );
};

export default SocialLogin;
