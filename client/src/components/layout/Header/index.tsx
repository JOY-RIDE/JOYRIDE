import React from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cn('header')}>
      <h1>Header</h1>
    </header>
  );
};

export default Header;
