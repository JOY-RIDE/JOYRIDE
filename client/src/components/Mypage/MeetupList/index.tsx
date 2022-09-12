import { ComponentGetter } from 'types/callback';
import { MeetupData } from 'types/meetup';
import styles from './MeetupList.module.scss';

interface MeetupListProps {
  meetups: MeetupData[];
  ItemComponent: ComponentGetter;
}

const MeetupList = ({ meetups, ItemComponent }: MeetupListProps) => (
  <ul className={styles.wrapper}>
    {meetups &&
      meetups.map(meetup => <ItemComponent key={meetup.id} {...meetup} />)}
  </ul>
);

export default MeetupList;
