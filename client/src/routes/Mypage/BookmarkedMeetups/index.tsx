import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
// import MeetupList from 'components/Mypage/MeetupList';
import Loading from 'components/common/Loading';
import PageTitle from 'components/common/PageTitle';
import Empty from 'components/Mypage/Empty';
import { BiBookmarkPlus } from 'react-icons/bi';
import { useEffect } from 'react';

const BookmarkedMeetups = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['bookmarkedMeetups'],
    meetupAPI.getBookmarkedMeetupList,
    {
      staleTime: 60 * 1000,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  useEffect(() => {
    window.scrollY && window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <PageTitle size="md">북마크한 모임</PageTitle>
      {/* {!meetups ? (
        <Loading />
      ) : meetups.length ? (
        // <MeetupList meetups={meetups} />
      ) : (
        <Empty
          Icon={<BiBookmarkPlus />}
          content="관심 있는 모임을 북마크 해보세요."
        />
      )} */}
    </>
  );
};

export default BookmarkedMeetups;
