import { memo } from 'react';
import { MeetupData } from 'types/meetup';
import { Link } from 'react-router-dom';
import MeetupSummary from '../MeetupSummary';
import MeetupRoutePreview from '../MeetupRoutePreview';
import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupItemProp {
  meetup: MeetupData;
}

const MeetupItem = memo(({ meetup }: MeetupItemProp) => (
  <Link to={`/meetups/${meetup.id}`} className={cn('link')}>
    <article className={cn('meetup')}>
      <MeetupSummary {...meetup} />
      <MeetupRoutePreview courseName={meetup.courseName} path={meetup.path} />
    </article>
  </Link>
));

export default MeetupItem;
