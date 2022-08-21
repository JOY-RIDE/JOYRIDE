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

const MeetupInfo = (props: Meetup) => (
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

      <div className={cn('detail')}>
        <div className={cn('detail__row')}>
          <label className={cn('label')}>코스 난이도</label>
          <span className={cn('emphasized')}>
            {stringifyCourseLevel(props.courseLevel)}
          </span>
        </div>
        <div className={cn('detail__row')}>
          <label className={cn('label')}>자전거 종류</label>
          <ul>
            {props.bicycleTypes.map((type, index) => (
              <li key={index} className={cn('emphasized')}>
                {type}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('detail__row')}>
          <label className={cn('label')}>라이딩 실력</label>
          <ul>
            {props.ridingLevels.map((level, index) => (
              <li key={index} className={cn('emphasized')}>
                {stringifyRidingLevel(level)}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('detail__row')}>
          <label className={cn('label')}>인원</label>
          <div>
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

export default MeetupInfo;
