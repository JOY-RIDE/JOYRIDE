import styles from './MeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { stringifyMeetupPathDifficulty } from 'utils/stringify';

const cn = classNames.bind(styles);

interface MeetupItemProp {
  meetup: MeetupData;
}

const MeetupItem = ({
  meetup: {
    id,
    meetingDate,
    localLocation,
    title,
    courseName,
    pathDifficulty,
    joinPeople,
    maxPeople,
    meetingImgUrl,
    path,
  },
}: MeetupItemProp) => {
  const pathLength = path.length;
  const to = path[pathLength - 1];
  const restPathString = path.slice(0, pathLength - 1).join(' → ');
  return (
    <Link to={`/meetups/${id}`}>
      <li className={cn('container')}>
        <div className={cn('preview')}>
          <div className={cn('text')}>
            <header className={cn('header')}>
              <span className={cn('meeting-date')}>
                {dayjs(meetingDate).format('M월 D일')}
              </span>

              <div className={cn('title-wrapper')}>
                <span className={cn('location')}>{localLocation}</span>
                <h2 className={cn('title')}>{title}</h2>
              </div>
            </header>

            <div className={cn('info-wrapper')}>
              {courseName && (
                <span className={cn('courseName')}>{courseName}</span>
              )}

              <div className={cn('info')}>
                <div className={cn('field')}>
                  <label className={cn('label')}>난이도</label>
                  <span className={cn('emphasize')}>
                    {stringifyMeetupPathDifficulty(pathDifficulty)}
                  </span>
                </div>
                <span className={cn('dot')}>·</span>
                <div className={cn('field')}>
                  <label className={cn('label')}>인원</label>
                  <div className={cn('nums')}>
                    <span className={cn('emphasize')}>{joinPeople}</span>/
                    {maxPeople}명
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img className={cn('img')} src={meetingImgUrl} alt={title} />
        </div>

        <div className={cn('path')}>
          <p className={cn('rest-path')}>{restPathString}</p>
          <span className={cn('to')}> → {to}</span>
        </div>
      </li>
    </Link>
  );
};

export default MeetupItem;
