import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './Like.module.scss';
import AskLogin from '../AskLogin';
import { toastMessageState } from 'states/common';
import { userIdState } from 'states/auth';

const cn = classNames.bind(styles);

interface likeProps {
  count?: number;
}

const Like = ({ count }: likeProps) => {
  const [isLiked, setIsLiked] = useState(0);
  const [like, setLike] = useState(count);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);
  const showToastMessage = useSetRecoilState(toastMessageState);

  const handleLike = () => {
    if (loggedInUser === null) {
      showToastMessage('로그인이 필요한 서비스입니다.');
    } else {
      if (isLiked === 0) {
        setIsLiked(1);
      } else {
        setIsLiked(0);
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
      <span className={cn('likecnt')}>{count}</span>
    </div>
  );
};

export default Like;
