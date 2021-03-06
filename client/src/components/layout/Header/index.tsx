import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Container from 'components/common/Container';
import logo from 'assets/images/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineSearch } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const cn = classNames.bind(styles);

interface Iform {
  keyword: string;
}

const Header = () => {
  // const user = useRecoilValue(userState)
  const user = false; // 임시로 해놓음

  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const onClickMenu = () => {
    setMenuToggle(false);
  };

  const { register, handleSubmit, reset } = useForm<Iform>();
  const navigate = useNavigate();
  const onValid = (data: Iform) => {
    navigate(`/search?keyword=${data.keyword}`);
    setMenuToggle(false);
    reset();
  };

  return (
    <header className={cn('header')}>
      <Container>
        <div className={cn('row')}>
          <button
            className={cn('toggleBtn')}
            aria-label="JOYRIDE 메뉴 보기 버튼"
            onClick={() => setMenuToggle(!menuToggle)}
          >
            <GiHamburgerMenu />
          </button>

          <Link
            to="/"
            className={cn('home')}
            aria-label="메인 페이지 링크 버튼"
            onClick={onClickMenu}
          >
            <img className={cn('logo')} src={logo} alt="로고" />
          </Link>

          {user ? (
            <Link
              to="/mypage"
              className={cn('mypage')}
              aria-label="마이 페이지 링크 버튼"
              onClick={onClickMenu}
            >
              {/* TODO: 백엔드에서 유저 사진 받아오기 */}
              <FaRegUserCircle />
            </Link>
          ) : (
            <Link
              to="/login"
              className={cn('login')}
              aria-label="로그인 페이지 링크 버튼"
            >
              <FiLogIn />
            </Link>
          )}
        </div>
        {menuToggle && (
          <motion.div
            className={cn('wrapper')}
            animate={{ y: [-5, 0], opacity: [0, 1] }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
          >
            <Link
              to="/roads"
              className={cn('roads', 'menus')}
              aria-label="자전거 코스 링크 버튼"
              onClick={onClickMenu}
            >
              자전거 코스
            </Link>
            <Link
              to="/meetups"
              className={cn('meetups', 'menus')}
              aria-label="자전거 모임 링크 버튼"
              onClick={onClickMenu}
            >
              자전거 모임
            </Link>
            <form
              className={cn('form', 'menus')}
              onSubmit={handleSubmit(onValid)}
            >
              <input
                {...register('keyword', { required: true })}
                className={cn('input')}
                placeholder="궁금한 내용을 검색해 보세요!"
              />
              <AiOutlineSearch className={cn('icon')} />
            </form>
          </motion.div>
        )}
      </Container>
    </header>
  );
};

export default Header;
