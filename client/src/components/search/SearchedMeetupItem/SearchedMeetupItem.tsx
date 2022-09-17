import styles from './SearchedMeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import MeetupRoute from '../../meetups/MeetupRoute';

const cn = classNames.bind(styles);

const SearchedMeetupItem = ({
  id,
  title,
  gatheringPlace,
  meetingDate,
  courseName,
  path,
  status,
}: MeetupData) => {
  return (
    <li className={cn('container')}>
      <div className={cn('top')}>
        <Link to={`/meetups/${id}`}>
          <h1 className={cn('title')}>{title}</h1>
          <div className={cn('meeting')}>
            <div className={cn('place')}>
              <HiOutlineLocationMarker />
              <span>{gatheringPlace}</span>
            </div>
            <span className={cn('date')}>
              {dayjs(meetingDate).format('M월 D일')}
            </span>
          </div>
        </Link>
      </div>
      <MeetupRoute courseName={courseName} path={path} />
    </li>
  );
};

export default SearchedMeetupItem;
