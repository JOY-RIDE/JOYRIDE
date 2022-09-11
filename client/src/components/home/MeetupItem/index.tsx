import styles from './MeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { stringifyMeetupPathDifficulty } from 'utils/stringify';

const cn = classNames.bind(styles);

interface MeetupItemProp {
  meetup: MeetupData;
}

const MeetupItem = ({ meetup }: MeetupItemProp) => {
  const path = meetup.path;
  const pathLength = path.length;
  const to = path[pathLength - 1];
  const restPathString = path.slice(0, pathLength - 1).join(' → ');
  return (
    <Link to={`/meetups/${meetup.id}`}>
      <li className={cn('container')}>
        <div className={cn('preview')}>
          <div className={cn('text')}>
            <header className={cn('header')}>
              <span className={cn('meeting-date')}>
                {dayjs(meetup.meetingDate).format('M월 D일')}
              </span>
              <div className={cn('title-wrapper')}>
                <span className={cn('location')}>{meetup.localLocation}</span>
                <h2 className={cn('title')}>{meetup.title}</h2>
              </div>
            </header>

            <div className={cn('info-wrapper')}>
              <div className={cn('info-top')}>
                {meetup.courseName && (
                  <span className={cn('course-name')}>{meetup.courseName}</span>
                )}
                <div className={cn('field')}>
                  <label className={cn('label')}>
                    <span>난이도</span>
                  </label>
                  <span className={cn('emphasize')}>
                    {stringifyMeetupPathDifficulty(meetup.pathDifficulty)}
                  </span>
                </div>
              </div>

              <div className={cn('info-bottom')}>
                <div className={cn('field', 'gathering-place')}>
                  <label className={cn('label')}>
                    <HiOutlineLocationMarker />
                    <span>집결지</span>
                  </label>
                  <span className={cn('emphasize')}>
                    {meetup.gatheringPlace}
                  </span>
                </div>

                <span className={cn('dot')}>·</span>

                <div className={cn('field')}>
                  <label className={cn('label')}>인원</label>
                  <div className={cn('nums')}>
                    <span className={cn('emphasize')}>{meetup.joinPeople}</span>
                    /{meetup.maxPeople}명
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img
            className={cn('img')}
            src={meetup.meetingImgUrl}
            alt={meetup.title}
          />
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
