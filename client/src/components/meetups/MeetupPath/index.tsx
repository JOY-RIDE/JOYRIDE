import { CourseName, RidingPath } from 'types/meetup';
import styles from './MeetupPath.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupPathProps {
  courseName: CourseName;
  ridingPath: RidingPath;
}

const MeetupPath = ({ courseName, ridingPath }: MeetupPathProps) => {
  const destination = ridingPath[ridingPath.length - 1];
  const restPath = ridingPath.slice(0, ridingPath.length - 1).join(' → ');
  return (
    <div className={cn('container')}>
      {courseName && <span className={cn('course')}>{courseName}</span>}
      <div className={cn('path-wrapper')}>
        <p className={cn('path')}>{restPath}</p>
        <span className={cn('destination')}> → {destination}</span>
      </div>
    </div>
  );
};

export default MeetupPath;
