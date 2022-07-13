import React from 'react';
import styles from './Footer.module.scss';
import Container from 'components/common/Container';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Footer = () => (
  <footer className={cn('footer')}>
    <Container>
      <h1>Footer</h1>
    </Container>
  </footer>
);

export default Footer;
