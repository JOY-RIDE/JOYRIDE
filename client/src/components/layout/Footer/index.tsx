import React from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Footer = () => (
  <footer className={cn('footer')}>
    <h1>Footer</h1>
  </footer>
);

export default Footer;
