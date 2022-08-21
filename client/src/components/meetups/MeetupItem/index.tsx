import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupItemProps {
  MeetupInfo: ReactElement;
  MeetupPath: ReactElement;
  id: number;
  title: string;
  imgSRC: string;
}

const MeetupItem = ({
  id,
  MeetupInfo,
  MeetupPath,
  title,
  imgSRC,
}: MeetupItemProps) => (
  <Link to={`${id}`} className={cn('link')}>
    <article className={cn('container')}>
      <div className={cn('container__top')}>
        {MeetupInfo}
        <img className={cn('img')} src={imgSRC} alt={title} />
      </div>
      {MeetupPath}
    </article>
  </Link>
);

export default MeetupItem;
