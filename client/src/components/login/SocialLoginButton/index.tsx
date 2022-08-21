import { useSearchParams } from 'react-router-dom';
import styles from './SocialLoginButton.module.scss';

interface SocialLoginButtonProps {
  href: string;
  provider: string;
  imgSRC: string;
  // onClick: ClickHandler;
}

const SocialLoginButton = ({
  href,
  provider,
  imgSRC,
}: // onClick,
SocialLoginButtonProps) => {
  const nextURL = useSearchParams()[0].get('next');
  return (
    <a
      href={`${href}${nextURL ? `?next=${nextURL}` : ''}`}
      aria-label={`${provider} 로그인 버튼`}
    >
      <img className={styles.img} src={imgSRC} alt={provider} />
    </a>
  );
};

export default SocialLoginButton;
