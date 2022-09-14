import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import Loading from 'components/common/Loading';
import PageTitle from 'components/common/PageTitle';
import Empty from 'components/mypage/Empty';
import { BiBookmarkPlus } from 'react-icons/bi';
import { useEffect } from 'react';
import BookmarkedMeetupItem from 'components/mypage/BookmarkedMeetupItem';
import ItemList from 'components/mypage/ItemList';

const BookmarkedMeetups = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups', 'bookmark'],
    meetupAPI.getBookmarkedMeetupList,
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
      <PageTitle size="md">북마크한 모임</PageTitle>
      {!meetups ? (
        <Loading />
      ) : meetups.length ? (
        <ItemList items={meetups} ItemComponent={BookmarkedMeetupItem} />
      ) : (
        <Empty
          Icon={<BiBookmarkPlus />}
          content="관심 있는 모임을 북마크 해보세요."
        />
      )}
    </>
  );
};

export default BookmarkedMeetups;
