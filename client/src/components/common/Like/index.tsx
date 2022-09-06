import { useState } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './Like.module.scss';

const cn = classNames.bind(styles);

const Like = () => {
  const [isLiked, setIsLiked] = useState(0);
  const [like, setLike] = useState(0);
  const handleLike = () => {
    if (isLiked === 0) {
      setIsLiked(1);
      setLike(like + 1);
    } else {
      setIsLiked(0);
      setLike(like - 1);
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
