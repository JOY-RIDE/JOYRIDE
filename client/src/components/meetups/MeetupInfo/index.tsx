import { Meetup } from 'types/meetup';
import {
  stringifyCourseLevel,
  stringifyDate,
  stringifyRidingLevel,
} from 'utils/stringify';
import { calculateRemainingDays } from 'utils/calculate';
import styles from './MeetupInfo.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MeetupInfo = (props: Meetup) => {
  const restInfoLabels = ['코스 난이도', '라이딩 실력', '인원'];
  return (
    <div className={cn('container')}>
      <div className={cn('text')}>
        <header className={cn('header')}>
          <div className={cn('date-wrapper')}>
            <span className={cn('meeting-date')}>
              {stringifyDate(props.meetingDate, {
                year: false,
                month: true,
                day: true,
              })}
            </span>
            <span className={cn('due-date')}>
              {calculateRemainingDays(new Date(), props.dueDate)}일 뒤 모집 마감
            </span>
          </div>
          <h2 className={cn('title')}>{props.title}</h2>
        </header>

        <div className={cn('rest-info-wrapper')}>
          <div className={cn('labels')}>
            {restInfoLabels.map((text, index) => (
              <label key={index}>{text}</label>
            ))}
          </div>
          <div className={cn('rest-info')}>
            <div className={cn('course-level')}>
              <span className={cn('emphasized')}>
                {stringifyCourseLevel(props.courseLevel)}
              </span>
            </div>
            <ul className={cn('riding-levels')}>
              {props.ridingLevels.map((level, index) => (
                <li key={index} className={cn('emphasized')}>
                  {stringifyRidingLevel(level)}
                </li>
              ))}
            </ul>
            <div className={cn('participants')}>
              <span className={cn('emphasized')}>
                {props.currentParticipants.length}
              </span>
              /{props.maxNumOfParticipants}명
            </div>
          </div>
        </div>
      </div>

      <img className={cn('img')} src={props.image} alt={props.title} />
    </div>
  );
};

export default MeetupInfo;
