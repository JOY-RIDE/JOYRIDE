import React from 'react';
import Container from 'components/common/Container';
import logo_green from 'assets/images/logo_green.svg';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Footer = () => (
  <footer className={cn('footer')}>
    <Container>
      <img className={cn('logo')} src={logo_green} alt="로고" />

      <h3 className={cn('brand')}>JOYRIDE 조이라이드</h3>

      <div className={cn('links')}>
        <a
          className={cn('link')}
          href="
        https://eight-profit-b8e.notion.site/JoyRide-387ba8a71ce34dadb1ea48c15ee79533"
          target="_blank"
        >
          About Us
        </a>
        <a
          className={cn('link')}
          href="https://github.com/JOY-RIDE/JOYRIDE"
          target="_blank"
        >
          GitHub Repository
        </a>
      </div>
    </Container>
  </footer>
);

export default Footer;
