import { Meetup } from 'typescript/interfaces';
import MeetupItem from '../MeetupItem';
import styles from './MeetupList.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupList {
  meetups: Meetup[];
}

const MeetupList = ({ meetups }: MeetupList) => (
  <section className={styles.meetups}>
    {meetups.map(meetup => {
      const { image: imgSRC, ...others } = meetup;
      return <MeetupItem key={meetup.id} imgSRC={imgSRC} {...others} />;
    })}
  </section>
);

export default MeetupList;