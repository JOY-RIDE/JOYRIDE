import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import MeetupList from 'components/Mypage/MeetupList';
import Loading from 'components/common/Loading';
import NoResults from 'components/common/NoResults';
import PageTitle from 'components/common/PageTitle';

const JoinedMeetups = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups, isLoading } = useQuery<MeetupData[]>(
    ['meetups'],
    meetupAPI.getJoinedMeetupList,
    {
      staleTime: 24 * 60 * 60 * 1000,
      cacheTime: Infinity,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  return (
    <>
      <PageTitle size="md">참가한 모임</PageTitle>
      {isLoading ? (
        <Loading />
      ) : meetups?.length ? (
        <MeetupList meetups={meetups} />
      ) : (
        <NoResults content="나와 맞는 모임에 참가해 보세요." />
      )}
    </>
  );
};

export default JoinedMeetups;
