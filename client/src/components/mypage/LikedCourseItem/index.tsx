import styles from './LikedCourseItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { courseAPI } from 'apis/courseAPI';
import { HiHeart } from 'react-icons/hi';

const cn = classNames.bind(styles);

const LikedCourseItem = ({ crsKorNm, image, crsContents }: any) => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const queryClient = useQueryClient();
  // const { mutate } = useMutation(courseAPI.cancelCourseLike, {
  //   onSuccess: () => {
  //     showToastMessage('좋아요를 취소했습니다.');
  //     queryClient.invalidateQueries(['serverInfo', 'like']);
  //   },
  //   onError: () => showToastMessage('좋아요 취소 중 문제가 발생했습니다.'),
  // });
  // const cancelLike = () => mutate(id);

  return (
    <li className={cn('container')}>
      <Link to={`/roads/${crsKorNm}`}>
        <h1 className={cn('title')}>{crsKorNm}</h1>
        <p className={cn('content')}>{crsContents.replaceAll('<br>', ' ')}</p>
      </Link>

      <img className={cn('img')} src={image} alt={crsKorNm} />
      <button className={cn('cancel-btn')} aria-label="코스 좋아요 취소 버튼">
        <HiHeart />
      </button>
    </li>
  );
};

export default LikedCourseItem;
