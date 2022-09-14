import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import Loading from 'components/common/Loading';
import PageTitle from 'components/common/PageTitle';
import Empty from 'components/mypage/Empty';
import { HiHeart } from 'react-icons/hi';
import { useEffect } from 'react';
import ItemList from 'components/mypage/ItemList';
import { userIdState } from 'states/auth';
import { courseAPI } from 'apis/courseAPI';
import LikedCourseItem from 'components/mypage/LikedCourseItem';

const LikedCourses = () => {
  const userId = useRecoilValue(userIdState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: courses } = useQuery<any[]>(
    ['serverInfo', 'like'],
    () => courseAPI.getLikedCourseList(userId as number),
    {
      staleTime: 60 * 1000,
      onError: () => showToastMessage('페이지 로딩 중 문제가 발생했습니다.'),
    }
  );

  useEffect(() => {
    window.scrollY && window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <PageTitle size="md">좋아요 표시한 코스</PageTitle>
      {!courses ? (
        <Loading />
      ) : courses.length ? (
        <ItemList items={courses} ItemComponent={LikedCourseItem} />
      ) : (
        <Empty
          Icon={<HiHeart />}
          content="마음에 드는 코스에 좋아요를 표시하세요."
        />
      )}
    </>
  );
};

export default LikedCourses;
