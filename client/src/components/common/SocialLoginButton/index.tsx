import { ClickHandler } from 'typescript/types';
import styles from './SocialLoginButton.module.scss';

interface SocialLoginButtonProps {
  provider: string;
  imageURL: string;
  onClick: ClickHandler;
}

const SocialLoginButton = ({
  provider,
  imageURL,
  onClick,
}: SocialLoginButtonProps) => (
  <button aria-label={`${provider} 로그인`} onClick={onClick}>
    <img className={styles.img} src={imageURL} alt={provider} />
  </button>
);

export default SocialLoginButton;
