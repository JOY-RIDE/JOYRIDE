import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import Loading from 'components/common/Loading';
import PageTitle from 'components/common/PageTitle';
import { FiPlusCircle } from 'react-icons/fi';
import Empty from 'components/mypage/Empty';
import { useEffect } from 'react';
import MyMeetupItem from 'components/mypage/MyMeetupItem';
import ItemList from 'components/mypage/ItemList';

const MyMeetups = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups', 'admin'],
    meetupAPI.getMyMeetupList,
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
      <PageTitle size="md">내가 만든 모임</PageTitle>
      {!meetups ? (
        <Loading />
      ) : meetups.length ? (
        <ItemList items={meetups} ItemComponent={MyMeetupItem} />
      ) : (
        <Empty Icon={<FiPlusCircle />} content="원하는 모임을 만들어 보세요." />
      )}
    </>
  );
};

export default MyMeetups;
