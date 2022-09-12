import { memo } from 'react';
import { MeetupData } from 'types/meetup';
import { Link } from 'react-router-dom';
import MeetupInfo from '../MeetupInfo';
import MeetupRoute from '../MeetupRoute';
import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MeetupItem = memo((props: MeetupData) => (
  <Link to={`/meetups/${props.id}`} className={cn('link')}>
    <article className={cn('meetup')}>
      <MeetupInfo {...props} />
      <MeetupRoute courseName={props.courseName} path={props.path} />
    </article>
  </Link>
));

export default MeetupItem;
