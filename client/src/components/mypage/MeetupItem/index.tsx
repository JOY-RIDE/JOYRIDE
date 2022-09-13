import styles from './MeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { HiOutlineLocationMarker } from 'react-icons/hi';

const cn = classNames.bind(styles);

interface MeetupItemProp {
  meetup: MeetupData;
}

const MeetupItem = ({
  meetup: { id, title, gatheringPlace, meetingDate, courseName, path },
}: MeetupItemProp) => {
  const pathLength = path.length;
  const to = path[pathLength - 1];
  const restPathString = path.slice(0, pathLength - 1).join(' → ');

  return (
    <Link to={`/meetups/${id}`} className={cn('container')}>
      <li>
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

        <div className={cn('route')}>
          {courseName && (
            <span className={cn('course-name')}>{courseName}</span>
          )}
          <div className={cn('path')}>
            <p className={cn('rest-path')}>{restPathString}</p>
            <span className={cn('to')}> → {to}</span>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default MeetupItem;
