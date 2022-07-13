import React from 'react';
import styles from './Header.module.scss';
import Container from 'components/common/Container';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cn('header')}>
      <Container>
        <h1>Header</h1>
      </Container>
    </header>
  );
};

export default Header;
