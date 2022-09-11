import styles from './ReviewItem.module.scss';
import classNames from 'classnames/bind';
import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';

const cn = classNames.bind(styles);

export interface CourseReview {
  accessibility_rate: number;
  accessibility_review: string | null;
  created_at: string;
  facilities_rate: number;
  facilities_review: string | null;
  //   id: number;
  nickName: string;
  safety_rate: number;
  safety_review: string | null;
  scene_rate: number;
  scene_review: string | null;
  //   title: string;
  total_rate: number;
  total_review: string;
  //   updated_at: string;
  //   user_id: number;
}

const ReviewItem = ({
  nickName,
  created_at,
  total_rate,
  total_review,
  scene_rate,
  scene_review,
  facilities_rate,
  facilities_review,
  accessibility_rate,
  accessibility_review,
  safety_rate,
  safety_review,
}: CourseReview) => {
  return (
    <div className={styles.review}>
      <div className={cn('each')}>
        <div className={cn('header')}>
          <div className={cn('left')}>
            <span>{nickName}</span>
            {/* <span className={cn('stars')}>{total_rate}</span> */}
          </div>
          <span className={cn('created-at')}>{created_at.split(' ')[0]}</span>
        </div>
        <div className={cn('content')}>
          <p>{total_review}</p>
        </div>
      </div>
      {scene_rate === 0 ? null : (
        <div className={cn('each')}>
          <div className={cn('header')}>
            <div className={cn('left')}>
              <span className={cn('field')}>경관</span>
              <span className={cn('stars')}>{scene_rate}</span>
            </div>
          </div>
          <div className={cn('content')}>
            <p>{scene_review !== 'string' ? scene_review : null}</p>
          </div>
        </div>
      )}
      {facilities_rate === 0 ? null : (
        <div className={cn('each')}>
          <div className={cn('header')}>
            <div className={cn('left')}>
              <span className={cn('field')}>편의시설</span>
              <span className={cn('stars')}>{facilities_rate}</span>
            </div>
          </div>
          <div className={cn('content')}>
            <p>{facilities_review !== 'string' ? facilities_review : null}</p>
          </div>
        </div>
      )}
      {accessibility_rate === 0 ? null : (
        <div className={cn('each')}>
          <div className={cn('header')}>
            <div className={cn('left')}>
              <span className={cn('field')}>접근성</span>
              <span className={cn('stars')}>{accessibility_rate}</span>
            </div>
          </div>
          <div className={cn('content')}>
            <p>
              {accessibility_review !== 'string' ? accessibility_review : null}
            </p>
          </div>
        </div>
      )}
      {safety_rate === 0 ? null : (
        <div className={cn('each')}>
          <div className={cn('header')}>
            <div className={cn('left')}>
              <span className={cn('field')}>안전</span>
              <span className={cn('stars')}>{safety_rate}</span>
            </div>
          </div>
          <div className={cn('content')}>
            <p>{safety_review !== 'string' ? safety_review : null}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
