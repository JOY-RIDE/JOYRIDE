import PageTitle from 'components/common/PageTitle';
import { BiPlusCircle } from 'react-icons/bi';
import { mockMeetupAPI } from 'apis/meetupAPI';
import MeetupList from 'components/meetups/MeetupList';
import styles from './Meetups.module.scss';
import classNames from 'classnames/bind';
import MeetupFilterChoices from 'components/meetups/MeetupFilterChoices';
import { useResetRecoilState } from 'recoil';
import { meetupFiltersState } from 'states/meetup';
import { useEffect } from 'react';
import MeetupFilterBoard from 'components/meetups/MeetupFilterBoard';
import ContentToggleButton from 'components/common/ContentToggleButton';

const cn = classNames.bind(styles);

// TODO: react query, pagination
const Meetups = () => {
  const meetups = mockMeetupAPI.getAllMeetups();
  const resetFilters = useResetRecoilState(meetupFiltersState);
  useEffect(() => resetFilters, []);

  return (
    <div>
      <header className={cn('header')}>
        <PageTitle size="md">자전거 모임</PageTitle>
        <button className={cn('create-btn')}>
          <BiPlusCircle />
          <span>모임 만들기</span>
        </button>
      </header>

      <div className={cn('filter-order')}>
        <ContentToggleButton title="필터" Content={MeetupFilterBoard} />
        <ContentToggleButton title="정렬" Content={() => <div>정렬</div>} />
      </div>
      <MeetupFilterChoices />

      <div className={cn('meetups-wrapper')}>
        <MeetupList meetups={meetups} />
      </div>
    </div>
  );
};

export default Meetups;
