import styles from './MeetupList.module.scss';
import { MeetupData } from 'types/meetup';
import MeetupItem from '../MeetupItem';

interface MeetupListProp {
  meetups: MeetupData[];
}

const MeetupList = ({ meetups }: MeetupListProp) => (
  <ul className={styles.meetups}>
    {meetups.map(meetup => (
      <MeetupItem meetup={meetup} />
    ))}
  </ul>
);

export default MeetupList;
