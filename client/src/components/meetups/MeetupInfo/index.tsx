import { Meetup } from 'types/meetup';
import {
  stringifyDifficulty,
  stringifyDate,
  stringifyRidingSkill,
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

      <ul className={cn('details')}>
        <li className={cn('detail')}>
          <label className={cn('label')}>코스 난이도</label>
          <span className={cn('data', 'emphasized')}>
            {stringifyDifficulty(props.pathDifficulty)}
          </span>
        </li>
        <li className={cn('detail')}>
          <label className={cn('label')}>자전거 종류</label>
          <ul className={cn('data')}>
            {props.bicycleTypes.map((type, index) => (
              <li key={index} className={cn('emphasized')}>
                {type}
              </li>
            ))}
          </ul>
        </li>
        <li className={cn('detail')}>
          <label className={cn('label')}>라이딩 실력</label>
          <ul className={cn('data')}>
            {props.ridingSkills.map((skill, index) => (
              <li key={index} className={cn('emphasized')}>
                {stringifyRidingSkill(skill)}
              </li>
            ))}
          </ul>
        </li>
        <li className={cn('detail')}>
          <label className={cn('label')}>인원</label>
          <div className={cn('data')}>
            <span className={cn('emphasized')}>
              {props.participants.length}
            </span>
            /{props.maxNumOfParticipants}명
          </div>
        </li>
      </ul>
    </div>

    <img className={cn('img')} src={props.image} alt={props.title} />
  </div>
);

export default MeetupInfo;
