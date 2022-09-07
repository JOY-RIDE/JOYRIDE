import { MeetupCourseName, MeetupPath } from 'types/meetup';
import styles from './MeetupRoutePreview.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupRoutePreviewProps {
  courseName: MeetupCourseName;
  path: MeetupPath;
}

const MeetupRoutePreview = ({ courseName, path }: MeetupRoutePreviewProps) => {
  const pathLength = path.length;
  // const from = path[0];
  const to = path[pathLength - 1];
  const restPathString = path.slice(0, pathLength - 1).join(' → ');
  return (
    <div className={cn('container')}>
      {courseName && <span className={cn('course')}>{courseName}</span>}
      {/* TODO: 코스명 너무 길 때 */}
      <div className={cn('path')}>
        <p className={cn('rest-path')}>{restPathString}</p>
        <span className={cn('to')}> → {to}</span>
      </div>
    </div>
  );
};

export default MeetupRoutePreview;
