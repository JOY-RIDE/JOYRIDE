import { CourseName, RidingPath } from 'types/meetup';
import styles from './MeetupPath.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupPathProps {
  courseName: CourseName;
  ridingPath: RidingPath;
}

const MeetupPath = ({ courseName, ridingPath }: MeetupPathProps) => {
  const pathLength = ridingPath.length;
  const from = ridingPath[0];
  const to = ridingPath[pathLength - 1];
  const restPathString = ridingPath.slice(1, pathLength - 1).join(' → ');
  return (
    <div className={cn('container')}>
      {courseName && <span className={cn('course')}>{courseName}</span>}
      <div className={cn('path-wrapper')}>
        <span className={cn('from')}>
          {from}
          {pathLength > 2 && ' → '}
        </span>
        <p className={cn('rest-path')}>{restPathString}</p>
        <span className={cn('to')}> → {to}</span>
      </div>
    </div>
  );
};

export default MeetupPath;
