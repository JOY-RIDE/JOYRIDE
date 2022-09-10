import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineRight } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { MeetupData } from 'types/meetup';
import { meetupAPI } from 'apis/meetupAPI';
import { toastMessageState } from 'states/common';
import dayjs from 'dayjs';
import MeetupList from 'components/home/MeetupList';

const cn = classNames.bind(styles);

const Home = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups'],
    meetupAPI.getMeetupList,
    {
      select: meetups =>
        meetups
          .filter(meetup => dayjs().isBefore(dayjs(meetup.dueDate)))
          .slice(0, 3),
      staleTime: 10 * 60 * 1000,
      cacheTime: Infinity,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  return (
    <div className={cn('container')}>
      <section className={cn('content')}>
        <div className={cn('top')}>
          <h1 className={cn('title')}>인기 있는 코스</h1>
          <Link to="/roads" className={cn('to-list')}>
            더보기 <AiOutlineRight />
          </Link>
        </div>
      </section>

      <section className={cn('content')}>
        <div className={cn('top')}>
          <h1 className={cn('title')}>모집 중인 모임</h1>
          <Link to="/meetups" className={cn('to-list')}>
            더보기 <AiOutlineRight />
          </Link>
        </div>
        {meetups && <MeetupList meetups={meetups} />}
      </section>
    </div>
  );
};

export default Home;
