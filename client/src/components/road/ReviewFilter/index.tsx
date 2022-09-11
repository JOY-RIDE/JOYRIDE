import styles from './ReviewFilter.module.scss';
import classNames from 'classnames/bind';
import ReviewFilterOptions from '../ReviewFilterOptions';

const cn = classNames.bind(styles);

interface ReviewFilterProps {
  view: number | undefined;
  facilities: number | undefined;
  accessibility: number | undefined;
  safety: number | undefined;
}

const ReviewFilter = ({
  view,
  facilities,
  accessibility,
  safety,
}: ReviewFilterProps) => {
  return (
    // TODO 마우스 드래그 좌우 스크롤
    <ul className={styles.reviewFilter}>
      {/* <ReviewFilterOptions content={'전체'} isChosen={true} /> */}
      <ReviewFilterOptions content={'경관'} rating={view} isChosen={false} />
      <ReviewFilterOptions
        content={'편의시설'}
        rating={facilities}
        isChosen={false}
      />
      <ReviewFilterOptions
        content={'접근성'}
        rating={accessibility}
        isChosen={false}
      />
      <ReviewFilterOptions content={'안전'} rating={safety} isChosen={false} />
    </ul>
  );
};

export default ReviewFilter;
