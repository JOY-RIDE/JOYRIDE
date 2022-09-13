import styles from './MeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { stringifyMeetupPathDifficulty } from 'utils/stringify';

const cn = classNames.bind(styles);

const MeetupItem = (props: MeetupData) => {
  const path = props.path;
  const pathLength = path.length;
  const to = path[pathLength - 1];
  const restPathString = path.slice(0, pathLength - 1).join(' → ');
  return (
    <Link to={`/meetups/${props.id}`}>
      <li className={cn('container')}>
        <div className={cn('preview')}>
          <div className={cn('text')}>
            <header className={cn('header')}>
              <span className={cn('meeting-date')}>
                {dayjs(props.meetingDate).format('M월 D일')}
              </span>
              <div className={cn('title-wrapper')}>
                <span className={cn('location')}>{props.localLocation}</span>
                <h2 className={cn('title')}>{props.title}</h2>
              </div>
            </header>

            <div className={cn('info-wrapper')}>
              <div className={cn('info-top')}>
                {props.courseName && (
                  <span className={cn('course-name')}>{props.courseName}</span>
                )}
                <div className={cn('field', 'path-difficulty')}>
                  <label className={cn('label')}>
                    <span>난이도</span>
                  </label>
                  <span
                    className={cn('emphasized', {
                      // high: props.pathDifficulty === 3,
                      // middle: props.pathDifficulty === 2,
                      // low: props.pathDifficulty === 1,
                    })}
                  >
                    {stringifyMeetupPathDifficulty(props.pathDifficulty)}
                  </span>
                </div>
              </div>

              <div className={cn('info-bottom')}>
                <div className={cn('field', 'gathering-place')}>
                  <label className={cn('label')}>
                    <HiOutlineLocationMarker />
                    <span>집결지</span>
                  </label>
                  <span className={cn('emphasized')}>
                    {props.gatheringPlace}
                  </span>
                </div>

                <span className={cn('dot')}>·</span>

                <div className={cn('field')}>
                  <label className={cn('label')}>인원</label>
                  <div className={cn('nums')}>
                    <span className={cn('emphasized')}>{props.joinPeople}</span>
                    /{props.maxPeople}명
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img
            className={cn('img')}
            src={props.meetingImgUrl}
            alt={props.title}
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
