import { Meetup } from 'types/meetup';
import {
  stringifyMeetupPathDifficulty,
  stringifyRidingSkill,
} from 'utils/stringify';
import styles from './MeetupSummary.module.scss';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';

const cn = classNames.bind(styles);

const MeetupSummary = (props: Meetup) => (
  <div className={cn('container')}>
    <div className={cn('text')}>
      <header className={cn('header')}>
        <div className={cn('date-wrapper')}>
          <span className={cn('meeting-date')}>
            {dayjs(props.meetingDate).format('M월 D일')}
          </span>
          <span className={cn('due-date')}>
            {dayjs(props.dueDate).diff(new Date(), 'd')}일 뒤 모집 마감
          </span>
        </div>
        <h2 className={cn('title')}>{props.title}</h2>
      </header>

      <div className={cn('summaries')}>
        <div className={cn('summary')}>
          <label className={cn('label')}>코스 난이도</label>
          <span className={cn('data', 'emphasized')}>
            {stringifyMeetupPathDifficulty(props.pathDifficulty)}
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
              {props.participants.length}
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
