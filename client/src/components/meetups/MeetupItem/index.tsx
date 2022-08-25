import { memo } from 'react';
import { Meetup } from 'types/meetup';
import { Link } from 'react-router-dom';
import MeetupInfo from '../MeetupInfo';
import MeetupRoute from '../MeetupRoute';
import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupItemProp {
  meetup: Meetup;
}

const MeetupItem = memo(({ meetup }: MeetupItemProp) => (
  <Link to={`/meetups/${meetup.id}`} className={cn('link')}>
    <article className={cn('meetup')}>
      <MeetupInfo {...meetup} />
      <MeetupRoute courseName={meetup.courseName} path={meetup.path} />
    </article>
  </Link>
));

export default MeetupItem;
