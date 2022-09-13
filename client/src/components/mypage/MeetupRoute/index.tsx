import styles from './MeetupRoute.module.scss';
import classNames from 'classnames/bind';
import { MeetupCourseName, MeetupPath } from 'types/meetup';

const cn = classNames.bind(styles);

interface MeetupRouteProps {
  courseName: MeetupCourseName;
  path: MeetupPath;
}

const MeetupRoute = ({ courseName, path }: MeetupRouteProps) => {
  const pathLength = path.length;
  const to = path[pathLength - 1];
  const restPathString = path.slice(0, pathLength - 1).join(' → ');
  return (
    <div className={cn('route')}>
      {courseName && <span className={cn('course')}>{courseName}</span>}
      <div className={cn('path')}>
        <p className={cn('rest-path')}>{restPathString}</p>
        <span className={cn('to')}> → {to}</span>
      </div>
    </div>
  );
};

export default MeetupRoute;
