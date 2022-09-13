import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineRight } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { ServerIRoads } from 'types/course';
import { fetchCoursesFromServer } from 'apis/coursesAPI';
import { MeetupData } from 'types/meetup';
import { meetupAPI } from 'apis/meetupAPI';
import { toastMessageState } from 'states/common';
import dayjs from 'dayjs';
import _ from 'lodash';
import CourseList from 'components/home/CourseList';
import MeetupList from 'components/home/MeetupList';
import { getMeetupsOrderedBy } from 'utils/order';
import { MEETUP_FILTERS_INITIAL_STATE } from 'states/meetup';

const cn = classNames.bind(styles);

const Home = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: courses } = useQuery<ServerIRoads[]>(
    ['serverCourses'],
    fetchCoursesFromServer
  );
  const mainCourses = _.sortBy(courses, 'likeCount').reverse().slice(0, 3);

  const { data: meetups } = useQuery<MeetupData[]>(
    // TODO
    ['meetups', MEETUP_FILTERS_INITIAL_STATE],
    () => meetupAPI.getMeetupList(),
    {
      select: meetups =>
        // TODO: 정렬 삭제
        getMeetupsOrderedBy(
          '-createdAt',
          meetups.filter(
            meetup =>
              dayjs().isBefore(dayjs(meetup.dueDate)) && meetup.status !== 0
          )
        ).slice(0, 3),
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
        {mainCourses && <CourseList courses={mainCourses} />}
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
