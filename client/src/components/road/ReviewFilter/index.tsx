import styles from './ReviewFilter.module.scss';
import classNames from 'classnames/bind';
import ReviewFilterOptions from '../ReviewFilterOptions';

const cn = classNames.bind(styles);

const ReviewFilter = () => {
  return (
    // TODO 마우스 드래그 좌우 스크롤
    <ul className={styles.reviewFilter}>
      <ReviewFilterOptions content={'전체'} isChosen={true} />
      <ReviewFilterOptions content={'경관'} rating={3.5} isChosen={false} />
      <ReviewFilterOptions content={'편의시설'} rating={4.2} isChosen={false} />
      <ReviewFilterOptions content={'접근성'} rating={2} isChosen={false} />
      <ReviewFilterOptions content={'안전'} rating={2.5} isChosen={false} />
    </ul>
  );
};

export default ReviewFilter;
