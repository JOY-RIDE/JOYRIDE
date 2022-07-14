import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Container from 'components/common/Container';
import logo from 'assets/images/logo.svg';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const Header = () => {
  // const user = useRecoilValue(userState)
  const user = true; // 임시로 해놓음

  return (
    <header className={cn('header')}>
      <Container>
        <div className={cn('row')}>
          <button
            className={cn('toggleBtn')}
            aria-label="JOYRIDE 메뉴 보기 버튼"
          >
            <GiHamburgerMenu />
          </button>

          <Link
            to="/"
            className={cn('home')}
            aria-label="JOYRIDE 메인 페이지 링크 버튼"
          >
            <img className={cn('logo')} src={logo} alt="로고" />
          </Link>

          {user ? (
            <Link
              to="/mypage"
              className={cn('mypage')}
              aria-label="JOYRIDE 마이 페이지 링크 버튼"
            >
              {/* TODO: 백엔드에서 유저 사진 받아오기 */}
              <FaRegUserCircle />
            </Link>
          ) : (
            // TODO: 버튼 디자인 필요
            <Link to="/login" className={cn('login')}>
              Log in
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
