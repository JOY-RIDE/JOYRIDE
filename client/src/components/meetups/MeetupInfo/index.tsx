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

const MeetupInfo = ({
  title,
  courseLevel,
  ridingLevels,
  currentParticipants,
  maxNumOfParticipants,
  meetingDate,
  dueDate,
}: Meetup) => {
  const labels = ['코스 난이도', '라이딩 실력', '인원'];
  return (
    <div className={cn('wrapper')}>
      <div className={cn('wrapper__top')}>
        <div className={cn('date-wrapper')}>
          <span className={cn('meeting-date')}>
            {stringifyDate(meetingDate, {
              year: false,
              month: true,
              day: true,
            })}
          </span>
          <span className={cn('due-date')}>
            {calculateRemainingDays(new Date(), dueDate)}일 뒤 모집 마감
          </span>
        </div>
        <h2 className={cn('title')}>{title}</h2>
      </div>

      <div className={cn('wrapper__bottom')}>
        <div className={cn('labels')}>
          {labels.map((text, index) => (
            <label key={index}>{text}</label>
          ))}
        </div>

        <div className={cn('rest-data')}>
          <span className={cn('emphasized')}>
            {stringifyCourseLevel(courseLevel)}
          </span>
          <ul className={cn('riding-levels')}>
            {ridingLevels.map((level, index) => (
              <li key={index} className={cn('emphasized')}>
                {stringifyRidingLevel(level)}
              </li>
            ))}
          </ul>
          <div className={cn('participants')}>
            <span className={cn('emphasized')}>
              {currentParticipants.length}
            </span>
            <span>/{maxNumOfParticipants}명</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetupInfo;
