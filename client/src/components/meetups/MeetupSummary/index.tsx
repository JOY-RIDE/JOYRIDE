import { Meetup } from 'types/meetup';
import {
  stringifyMeetupDifficulty,
  stringifyDate,
  stringifyRidingSkill,
} from 'utils/stringify';
import { calculateRemainingDays } from 'utils/calculate';
import styles from './MeetupSummary.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MeetupSummary = (props: Meetup) => (
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

      <div className={cn('summaries')}>
        <div className={cn('summary')}>
          <label className={cn('label')}>코스 난이도</label>
          <span className={cn('data', 'emphasized')}>
            {stringifyMeetupDifficulty(props.pathDifficulty)}
          </span>
        </div>
        <div className={cn('summary')}>
          <label className={cn('label')}>자전거 종류</label>
          <ul className={cn('data')}>
            {props.bicycleTypes.map((type, index) => (
              <li key={index} className={cn('emphasized')}>
                {type}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn('summary')}>
          <label className={cn('label')}>라이딩 실력</label>
          <ul className={cn('data')}>
            <li className={cn('emphasized')}>
              {stringifyRidingSkill(props.ridingSkill)}
            </li>
          </ul>
        </div>
        <div className={cn('summary')}>
          <label className={cn('label')}>인원</label>
          <div className={cn('data')}>
            <span className={cn('emphasized')}>
              {props.participants ? props.participants.length : 0}
            </span>
            /{props.maxNumOfParticipants}명
          </div>
        </div>
      </div>
    </div>

    <img className={cn('img')} src={props.image} alt={props.title} />
  </div>
);

export default MeetupSummary;
