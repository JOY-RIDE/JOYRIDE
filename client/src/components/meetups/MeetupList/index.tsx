import { MeetupData } from 'types/meetup';
import MeetupItem from '../MeetupItem';
import styles from './MeetupList.module.scss';

interface MeetupListProp {
  meetups: MeetupData[];
}

const MeetupList = ({ meetups }: MeetupListProp) => (
  <section className={styles.meetups}>
    {meetups.map(meetup => (
      <MeetupItem key={meetup.id} meetup={meetup} />
    ))}
  </section>
);

export default MeetupList;
