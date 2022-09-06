import { MeetupCourseName, MeetupPath } from 'types/meetup';
import styles from './MeetupRoute.module.scss';
import classNames from 'classnames/bind';
import { BsArrowRight } from 'react-icons/bs';
import Chip from 'components/common/Chip';

const cn = classNames.bind(styles);

interface MeetupRouteProps {
  courseName: MeetupCourseName;
  path: MeetupPath;
}

const MeetupRoute = ({ courseName, path }: MeetupRouteProps) => (
  <div className={cn('container')}>
    {courseName && <span className={cn('course')}>{courseName}</span>}
    <ul className={cn('path')}>
      {path.map((stop, index) => (
        <>
          {index > 0 && <BsArrowRight key={index} />}
          <Chip
            key={stop}
            size="sm"
            content={stop}
            isActive
            isDeletable={false}
          />
        </>
      ))}
    </ul>
  </div>
);

export default MeetupRoute;
