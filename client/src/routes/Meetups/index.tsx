import PageTitle from 'components/common/PageTitle';
import { BiPlusCircle } from 'react-icons/bi';
import { mockMeetupAPI } from 'apis/meetupAPI';
import MeetupList from 'components/meetups/MeetupList';
import styles from './Meetups.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

// TODO: react query, pagination
const Meetups = () => {
  const meetups = mockMeetupAPI.getAllMeetups();

  return (
    <div>
      <header className={cn('header')}>
        <PageTitle size="md">자전거 모임</PageTitle>
        <button className={cn('create-btn')}>
          <BiPlusCircle />
          <span>모임 만들기</span>
        </button>
      </header>

      <div className={cn('filter-sort')}></div>

      <div className={cn('meetups-wrapper')}>
        <MeetupList meetups={meetups} />
      </div>
    </div>
  );
};

export default Meetups;
