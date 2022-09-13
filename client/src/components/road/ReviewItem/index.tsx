import { useRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import styles from './ReviewItem.module.scss';
import classNames from 'classnames/bind';
import { userIdState } from 'states/auth';
import { joyrideAxios as axios } from '../../../apis/axios';
import { MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';
import { FaStar, FaStarHalf } from 'react-icons/fa';

const cn = classNames.bind(styles);

export interface CourseReview {
  accessibility_rate: number;
  accessibility_review: string | null;
  created_at: string;
  facilities_rate: number;
  facilities_review: string | null;
  id: number;
  nickName: string;
  safety_rate: number;
  safety_review: string | null;
  scene_rate: number;
  scene_review: string | null;
  //   title: string;
  total_rate: number;
  total_review: string;
  //   updated_at: string;
  user_id: number;
}

const ReviewItem = ({
  id,
  user_id,
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
  const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);

  const queryClient = useQueryClient();

  const handleReviewDelete = () => {
    axios
      .delete(`/courses/review/${id}`)
      .then(response => console.log(response)) // 성공 핸들링
      .catch(error => console.log(error));
    queryClient.invalidateQueries(['serverInfo']);
  };

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
            <span className={cn('stars')}>
              {handleRateToStars(Math.floor(total_rate)).map(idx => (
                <MdOutlineStar key={idx} />
              ))}
              {Number.isInteger(total_rate) ? null : <MdOutlineStarHalf />}
            </span>
          </div>
          <div className={cn('right')}>
            <p className={cn('created-at')}>{created_at.split(' ')[0]}</p>
            {user_id === loggedInUser ? (
              <button onClick={handleReviewDelete}>삭제</button>
            ) : null}
          </div>
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
              <span className={cn('stars')}>
                {handleRateToStars(Math.floor(scene_rate)).map(idx => (
                  <MdOutlineStar key={idx} />
                ))}
                {Number.isInteger(scene_rate) ? null : <MdOutlineStarHalf />}
              </span>
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
              <span className={cn('stars')}>
                {handleRateToStars(Math.floor(facilities_rate)).map(idx => (
                  <MdOutlineStar key={idx} />
                ))}
                {Number.isInteger(facilities_rate) ? null : (
                  <MdOutlineStarHalf />
                )}
              </span>
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
              <span className={cn('stars')}>
                {handleRateToStars(Math.floor(accessibility_rate)).map(idx => (
                  <MdOutlineStar key={idx} />
                ))}
                {Number.isInteger(accessibility_rate) ? null : (
                  <MdOutlineStarHalf />
                )}
              </span>
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
              <span className={cn('stars')}>
                {handleRateToStars(Math.floor(safety_rate)).map(idx => (
                  <MdOutlineStar key={idx} />
                ))}
                {Number.isInteger(safety_rate) ? null : <MdOutlineStarHalf />}
              </span>
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
