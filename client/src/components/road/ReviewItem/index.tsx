import styles from './ReviewItem.module.scss';
import classNames from 'classnames/bind';
import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';

const cn = classNames.bind(styles);

const ReviewItem = () => {
  return (
    <div className={styles.review}>
      <div className={cn('each')}>
        <div className={cn('header')}>
          <div className={cn('left')}>
            <span>username</span>
            <span className={cn('stars')}>
              {[1, 2, 3].map(idx => (
                <MdOutlineStar key={idx} />
              ))}
            </span>
          </div>
          <span className={cn('created-at')}>2022.08.26</span>
        </div>
        <div className={cn('content')}>
          <p>너무 좋아요</p>
        </div>
      </div>
      <div className={cn('each')}>
        <div className={cn('header')}>
          <div className={cn('left')}>
            <span className={cn('field')}>경관</span>
            <span className={cn('stars')}>
              {[1, 2, 3].map(idx => (
                <MdOutlineStar key={idx} />
              ))}
              <MdOutlineStarHalf />
            </span>
          </div>
        </div>
        <div className={cn('content')}>
          <p>그냥 그랬어요.</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
