import { Meetup } from 'types/meetup';
import MeetupItem from '../MeetupItem';
import MeetupInfo from '../MeetupInfo';
import MeetupPath from '../MeetupPath';
import styles from './MeetupList.module.scss';

interface MeetupListProps {
  meetups: Meetup[];
}

const MeetupList = ({ meetups }: MeetupListProps) => (
  <section className={styles.meetups}>
    {meetups.map(meetup => {
      const props = {
        id: meetup.id,
        MeetupInfo: <MeetupInfo {...meetup} />,
        MeetupPath: (
          <MeetupPath
            courseName={meetup.courseName}
            ridingPath={meetup.ridingPath}
          />
        ),
        title: meetup.title,
        imgSRC: meetup.image,
      };

      return <MeetupItem key={meetup.id} {...props} />;
    })}
  </section>
);

export default MeetupList;
