import { useState, useRef } from 'react';
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { userProfileState, userIdState } from 'states/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Container from 'components/layout/Container';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
// import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineSearch } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { userAPI } from 'apis/userAPI';
import { JOYRDIE_LOGO_IMAGE } from 'utils/urls';

const cn = classNames.bind(styles);

interface Iform {
  keyword: string;
}

const Header = () => {
  const isAtHome = useMatch('/');
  const isAtAuth = useMatch('/auth/*');
  const { pathname } = useLocation();
  const loginNextQuery = isAtHome || isAtAuth ? '' : `?next=${pathname}`;
  const userProfile = useRecoilValue(userProfileState);

  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const toggleMenu = () => setMenuToggle(menuToggle => !menuToggle);
  const closeMenu = () => setMenuToggle(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, closeMenu);

  const setUserId = useSetRecoilState(userIdState);
  const handleLogoutClick = () => {
    userAPI.logout(setUserId);
    closeMenu();
  };

  const { register, handleSubmit, reset } = useForm<Iform>();
  const navigate = useNavigate();
  const onValid = (data: Iform) => {
    navigate(`/search?keyword=${data.keyword}`);
    setMenuToggle(false);
    reset();
  };

  return (
    <div className={cn('header')} ref={menuRef}>
      <Container>
        <div className={cn('row')}>
          <button aria-label="메뉴 보기 버튼" onClick={toggleMenu}>
            <GiHamburgerMenu />
          </button>

          <Link
            to="/"
            className={cn('logo')}
            aria-label="메인 페이지 링크 버튼"
            onClick={closeMenu}
          >
            <img src={JOYRDIE_LOGO_IMAGE} alt="로고" />
          </Link>

          {userProfile ? (
            <div className={cn('logged-in')}>
              <Link
                to="/mypage"
                aria-label="마이 페이지 링크 버튼"
                onClick={closeMenu}
              >
                <img
                  className={cn('profile-img')}
                  src={userProfile.image}
                  alt="프로필 사진"
                />
              </Link>
              <button aria-label="로그아웃 버튼" onClick={handleLogoutClick}>
                <FiLogOut />
              </button>
            </div>
          ) : (
            <Link
              to={`/auth/login${loginNextQuery}`}
              aria-label="로그인 페이지 링크 버튼"
              onClick={closeMenu}
            >
              <FiLogIn />
            </Link>
          )}
        </div>
      </Container>

      {menuToggle && (
        <motion.div
          className={cn('wrapper')}
          animate={{ y: [-5, 0], opacity: [0, 1] }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
        >
          <Container>
            <div className={cn('menus-container')}>
              <Link
                to="/roads"
                className={cn('roads', 'menus')}
                aria-label="자전거 코스 링크 버튼"
                onClick={closeMenu}
              >
                자전거 코스
              </Link>
              <Link
                to="/meetups"
                className={cn('meetups', 'menus')}
                aria-label="자전거 모임 링크 버튼"
                onClick={closeMenu}
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
            </div>
          </Container>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
