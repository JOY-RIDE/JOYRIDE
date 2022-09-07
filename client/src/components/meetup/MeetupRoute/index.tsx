import { MeetupCourseName, MeetupPath } from 'types/meetup';
import styles from './MeetupRoute.module.scss';
import classNames from 'classnames/bind';
import { BsArrowRight } from 'react-icons/bs';
import Chip from 'components/common/Chip';
import { Fragment } from 'react';

const cn = classNames.bind(styles);

interface MeetupRouteProps {
  courseName: MeetupCourseName;
  path: MeetupPath;
}

const MeetupRoute = ({ courseName, path }: MeetupRouteProps) => (
  <div className={cn('container', { long: courseName })}>
    {courseName && <span className={cn('course')}>{courseName}</span>}
    <ul className={cn('path')}>
      {path.map((stop, index) => (
        <Fragment key={index}>
          {index > 0 && <BsArrowRight />}
          <li>
            <Chip size="md" content={stop} isActive isDeletable={false} />
          </li>
        </Fragment>
      ))}
    </ul>
  </div>
);

export default MeetupRoute;
