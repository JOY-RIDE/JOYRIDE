import { useMatch } from 'react-router-dom';
import Container from 'components/common/Container';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { JOYRDIE_LOGO_GREEN_IMAGE } from 'utils/urls';

const cn = classNames.bind(styles);

const Footer = () => {
  const isAtAuth = useMatch('/auth/*');
  const isAtMeetup = useMatch('/meetups/:meetupId');
  if (isAtAuth || isAtMeetup) return null;
  return (
    <footer className={cn('footer')}>
      <Container>
        <img className={cn('logo')} src={JOYRDIE_LOGO_GREEN_IMAGE} alt="로고" />
        <h3 className={cn('brand')}>JOYRIDE 조이라이드</h3>
        <div className={cn('links')}>
          <a
            className={cn('link')}
            href="
        https://eight-profit-b8e.notion.site/JoyRide-387ba8a71ce34dadb1ea48c15ee79533"
            target="_blank"
            rel="noreferrer"
          >
            About Us
          </a>
          <a
            className={cn('link')}
            href="https://github.com/JOY-RIDE/JOYRIDE"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repository
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
