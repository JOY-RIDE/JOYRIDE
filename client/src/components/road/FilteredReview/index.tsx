import { useRecoilState } from 'recoil';
import styles from './FilteredReview.module.scss';
import classNames from 'classnames/bind';
import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { ICourseFilteredReview } from 'types/course';
import { reviewFilterState } from 'states/course';

const cn = classNames.bind(styles);

const FilteredReview = ({
  id,
  user_id,
  nickName,
  created_at,
  filterRate,
  filterReview,
}: ICourseFilteredReview) => {
  const [currentFilter, setCurrentFilter] = useRecoilState(reviewFilterState);

  const handleRateToStars = (rate: number) => {
    if (Number.isInteger(rate)) {
      var arr = [...Array(rate)].map((v, i) => i);
    } else {
      const intVal = Math.floor(rate);
      var arr = [...Array(intVal)].map((v, i) => i);
    }
    return arr;
  };

  return (
    <div className={styles.review}>
      <div className={cn('each')}>
        <div className={cn('header')}>
          <div className={cn('left')}>
            <span className={cn('nickname')}>{nickName}</span>
          </div>
          <div className={cn('right')}>
            <p className={cn('created-at')}>{created_at.split(' ')[0]}</p>
          </div>
        </div>
      </div>
      <div className={cn('each')}>
        <div className={cn('header')}>
          <div className={cn('left')}>
            <span className={cn('field')}>{currentFilter}</span>
            <span className={cn('stars')}>
              {handleRateToStars(Math.floor(filterRate)).map(idx => (
                <MdOutlineStar key={idx} />
              ))}
              {Number.isInteger(filterRate) ? null : <MdOutlineStarHalf />}
            </span>
          </div>
        </div>
        <div className={cn('content')}>
          <p>{filterReview !== 'string' ? filterReview : null}</p>
        </div>
      </div>
    </div>
  );
};

export default FilteredReview;
