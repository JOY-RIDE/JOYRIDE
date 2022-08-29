import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './Like.module.scss';

const cn = classNames.bind(styles);

const Like = () => {
  return (
    <div className={styles.like}>
      <HiOutlineHeart></HiOutlineHeart>
      <span className={cn('likecnt')}>12</span>
    </div>
  );
};

export default Like;
