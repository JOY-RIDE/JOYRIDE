import { Meetup } from 'types/meetup';
import MeetupItem from '../MeetupItem';
import MeetupInfo from '../MeetupInfo';
import styles from './MeetupList.module.scss';

interface MeetupList {
  meetups: Meetup[];
}

const MeetupList = ({ meetups }: MeetupList) => (
  <section className={styles.meetups}>
    {meetups.map(meetup => {
      const props = {
        MeetupInfo: <MeetupInfo {...meetup} />,
        title: meetup.title,
        imgSRC: meetup.image,
      };
      return <MeetupItem key={meetup.id} {...props} />;
    })}
  </section>
);

export default MeetupList;
