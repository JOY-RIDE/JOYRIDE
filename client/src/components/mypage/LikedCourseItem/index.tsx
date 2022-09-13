import styles from './LikedCourseItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { courseAPI } from 'apis/courseAPI';
import { HiHeart } from 'react-icons/hi';

const cn = classNames.bind(styles);

const LikedCourseItem = ({ id, sigun, crsKorNm, image, crsSummary }: any) => {
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
      </Link>

      <button className={cn('cancel-btn')}>{<HiHeart />}</button>
    </li>
  );
};

export default LikedCourseItem;
