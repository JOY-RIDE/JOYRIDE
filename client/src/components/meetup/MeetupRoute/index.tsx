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
  <section className={cn('container', { long: courseName })}>
    {courseName && <span className={cn('course')}>{courseName}</span>}
    <ul className={cn('path')}>
      {path.map((stop, index) => (
        <>
          {index > 0 && <BsArrowRight key={index} />}
          <li key={stop}>
            <Chip size="md" content={stop} isActive isDeletable={false} />
          </li>
        </>
      ))}
    </ul>
  </section>
);

export default MeetupRoute;
