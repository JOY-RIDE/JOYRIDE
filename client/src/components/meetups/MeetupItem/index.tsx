import { Meetup } from 'types/meetup';
import { Link } from 'react-router-dom';
import MeetupInfo from '../MeetupInfo';
import MeetupPath from '../MeetupPath';
import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupItemProp {
  meetup: Meetup;
}

const MeetupItem = ({ meetup }: MeetupItemProp) => (
  <Link to={`/meetups/${meetup.id}`} className={cn('link')}>
    <article className={cn('meetup')}>
      <MeetupInfo {...meetup} />
      <MeetupPath
        courseName={meetup.courseName}
        ridingPath={meetup.ridingPath}
      />
    </article>
  </Link>
);

export default MeetupItem;
