import styles from './SocialLoginButton.module.scss';

interface SocialLoginButtonProps {
  href: string;
  provider: string;
  imageURL: string;
  // onClick: ClickHandler;
}

const SocialLoginButton = ({
  href,
  provider,
  imageURL,
}: // onClick,
SocialLoginButtonProps) => (
  <a href={href} aria-label={`${provider} 로그인 버튼`}>
    <img className={styles.img} src={imageURL} alt={provider} />
  </a>
);

export default SocialLoginButton;
