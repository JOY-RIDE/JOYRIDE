import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './Like.module.scss';
import { toastMessageState } from 'states/common';
import { userIdState } from 'states/auth';

const cn = classNames.bind(styles);

const Like = () => {
  const [isLiked, setIsLiked] = useState(0);
  const [like, setLike] = useState(0);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);
  console.log(loggedInUser);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  console.log(currentPath);

  const handleLike = () => {
    if (loggedInUser === null) {
      showToastMessage('로그인이 필요한 서비스입니다.');
      //   navigate(`/auth/login?next=${currentPath}`);
      setTimeout(function () {
        navigate(`/auth/login?next=${currentPath}`);
      }, 800);
    } else {
      if (isLiked === 0) {
        setIsLiked(1);
        setLike(like + 1);
      } else {
        setIsLiked(0);
        setLike(like - 1);
      }
    }
  };
  return (
    <div className={styles.like}>
      <button onClick={handleLike}>
        {isLiked == 1 ? (
          <HiOutlineHeart fill="#F95555"></HiOutlineHeart>
        ) : (
          <HiOutlineHeart></HiOutlineHeart>
        )}
      </button>
      <span className={cn('likecnt')}>{like}</span>
    </div>
  );
};

export default Like;
