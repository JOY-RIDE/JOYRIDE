import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import styles from './MyMeetupsPreview.module.scss';
import MeetupList from '../MeetupList';
import SectionTitle from '../SectionTitle';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MyMeetupsPreview = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups'],
    meetupAPI.getMyMeetupList,
    {
      select: meetups => meetups.slice(0, 3),
      staleTime: 24 * 60 * 60 * 1000,
      cacheTime: Infinity,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  return (
    <section className={cn('wrapper')}>
      <header className={cn('header')}>
        <SectionTitle title="내가 만든 모임" count={meetups?.length} />
      </header>
      {meetups && <MeetupList meetups={meetups} />}
    </section>
  );
};

export default MyMeetupsPreview;
