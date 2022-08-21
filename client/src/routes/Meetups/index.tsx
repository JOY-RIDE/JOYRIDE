import PageTitle from 'components/common/PageTitle';
import { BiPlusCircle } from 'react-icons/bi';
import styles from './Meetups.module.scss';
import classNames from 'classnames/bind';
import { mockMeetupAPI } from 'apis/meetupAPI';
import MeetupCardContainer from 'components/meetups/MeetupCardContainer';

const cn = classNames.bind(styles);

const Meetups = () => (
  <div>
    <header className={cn('header')}>
      <PageTitle size="md">자전거 모임</PageTitle>
      <button className={cn('create-btn')}>
        <BiPlusCircle />
        <span>모임 만들기</span>
      </button>
    </header>
    {mockMeetupAPI.getAllMeetups().map(meetup => {
      const { image: imgSRC, ...others } = meetup;
      return (
        <MeetupCardContainer key={meetup.id} imgSRC={imgSRC} {...others} />
      );
    })}
  </div>
);

export default Meetups;
