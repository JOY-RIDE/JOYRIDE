import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import Loading from 'components/common/Loading';
import PageTitle from 'components/common/PageTitle';
import Empty from 'components/mypage/Empty';
import { RiRidingLine } from 'react-icons/ri';
import { useEffect } from 'react';
import JoinedMeetupItem from 'components/mypage/JoinedMeetupItem';
import ItemList from 'components/mypage/ItemList';

const JoinedMeetups = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups', 'join'],
    meetupAPI.getJoinedMeetupList,
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
      <PageTitle size="md">참가한 모임</PageTitle>
      {!meetups ? (
        <Loading />
      ) : meetups.length ? (
        <ItemList items={meetups} ItemComponent={JoinedMeetupItem} />
      ) : (
        <Empty
          Icon={<RiRidingLine />}
          content="나와 맞는 모임에 참가해 보세요."
        />
      )}
    </>
  );
};

export default JoinedMeetups;
