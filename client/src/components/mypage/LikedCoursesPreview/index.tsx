import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import styles from '../MyMeetupsPreview/MyMeetupsPreview.module.scss';
import SectionTitle from '../SectionTitle';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import { courseAPI } from 'apis/courseAPI';
import { userIdState } from 'states/auth';
import ItemList from '../ItemList';
import LikedCourseItem from '../LikedCourseItem';

const cn = classNames.bind(styles);

const LikedCoursesPreview = () => {
  const userId = useRecoilValue(userIdState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: courses } = useQuery<any[]>(
    ['serverInfo', 'like'],
    () => courseAPI.getLikedCourseList(userId as number),
    {
      staleTime: 60 * 1000,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  return (
    <section className={cn('wrapper')}>
      <header className={cn('header')}>
        <SectionTitle title="좋아요 표시한 코스" count={courses?.length} />
        <Link to="like/courses" className={cn('more')}>
          <span>더보기</span>
          <AiOutlineRight />
        </Link>
      </header>

      {courses && (
        <ItemList items={courses.slice(0, 3)} ItemComponent={LikedCourseItem} />
      )}
    </section>
  );
};

export default LikedCoursesPreview;
