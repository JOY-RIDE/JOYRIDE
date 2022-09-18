import { MeetupData } from 'types/meetup';
import MeetupItem from '../../meetups/MeetupItem';
import styles from './RelatedMeetups.module.scss';

interface MeetupListProp {
  meetups: MeetupData[];
}

const RelatedMeetups = ({ meetups }: MeetupListProp) => (
  <section className={styles.meetups}>
    {meetups.map(meetup => (
      <MeetupItem key={meetup.id} {...meetup} />
    ))}
  </section>
);

export default RelatedMeetups;
