import styles from './LikedCourseItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { courseAPI } from 'apis/courseAPI';
import { HiHeart } from 'react-icons/hi';
import { userIdState } from 'states/auth';

const cn = classNames.bind(styles);

const LikedCourseItem = ({ crsKorNm, image, crsContents }: any) => {
  const userId = useRecoilValue(userIdState) as number;
  const showToastMessage = useSetRecoilState(toastMessageState);
  const queryClient = useQueryClient();
  const cancelCourseLike = async () => {
    await courseAPI.cancelCourseLike(crsKorNm, userId);
    showToastMessage('좋아요를 취소했습니다.');
    queryClient.invalidateQueries(['serverInfo', 'like']);
  };

  return (
    <li className={cn('container')}>
      <Link to={`/roads/${crsKorNm}`}>
        <h1 className={cn('title')}>{crsKorNm}</h1>
        <p className={cn('content')}>{crsContents.replaceAll('<br>', ' ')}</p>
      </Link>

      <img className={cn('img')} src={image} alt={crsKorNm} />
      <button
        className={cn('cancel-btn')}
        aria-label="코스 좋아요 취소 버튼"
        onClick={cancelCourseLike}
      >
        <HiHeart />
      </button>
    </li>
  );
};

export default LikedCourseItem;
