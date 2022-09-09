import styles from './MeetupParticipantList.module.scss';
import classNames from 'classnames/bind';
import { MeetupParticipant } from 'types/meetup';

const cn = classNames.bind(styles);

interface MeetupParticipantListProps {
  participants: MeetupParticipant[];
}

const MeetupParticipantList = ({
  participants,
}: MeetupParticipantListProps) => (
  <ul className={cn('participants')}>
    {participants.map(participant => (
      <li key={participant.id} className={cn('participant')}>
        <div className={cn('left')}>
          <img
            className={cn('avatar')}
            src={participant.profile_img_url}
            alt={participant.nickname}
          />
          <span className={cn('nickname')}>{participant.nickname}</span>
        </div>

        <div className={cn('right')}>
          <span className={cn('manner')}>{participant.manner}°C</span>
        </div>
      </li>
    ))}
  </ul>
);
export default MeetupParticipantList;
