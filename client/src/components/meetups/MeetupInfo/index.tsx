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
}: Meetup) => (
  <div className={cn('container')}>
    <div className={cn('container__top')}>
      <div className={cn('date-wrapper')}>
        <span className={cn('meeting-date')}>
          {stringifyDate(meetingDate, { year: false, month: true, day: true })}
        </span>
        <span className={cn('due-date')}>
          {calculateRemainingDays(new Date(), dueDate)}일 뒤 모집 마감
        </span>
      </div>
      <h2 className={cn('title')}>{title}</h2>
    </div>

    <div className={cn('container__bottom')}>
      <div className={cn('bottom__row')}>
        <label className={cn('label')}>코스 난이도</label>
        <span className={cn('rest-info')}>
          {stringifyCourseLevel(courseLevel)}
        </span>
      </div>

      <div className={cn('bottom__row')}>
        <label className={cn('label')}>라이딩 실력</label>
        <ul className={cn('riding-levels')}>
          {ridingLevels.map((level, index) => (
            <li key={index} className={cn('rest-info')}>
              {stringifyRidingLevel(level)}
            </li>
          ))}
        </ul>
      </div>

      <div className={cn('bottom__row')}>
        <label className={cn('label')}>인원</label>
        <div className={cn('participants')}>
          <span className={cn('rest-info')}>{currentParticipants.length}</span>
          <span>/{maxNumOfParticipants}명</span>
        </div>
      </div>
    </div>
  </div>
);

export default MeetupInfo;
