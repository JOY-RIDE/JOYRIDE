import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupItemProps {
  MeetupInfo: ReactElement;
  id: number;
  title: string;
  imgSRC: string;
  // MeetupPath: ReactElement;
}

const MeetupItem = ({
  id,
  MeetupInfo,
  title,
  imgSRC,
}: // MeetupPath,
MeetupItemProps) => (
  <Link to={`${id}`}>
    <article className={cn('container')}>
      <div className={cn('container__top')}>
        {MeetupInfo}
        <img className={cn('img')} src={imgSRC} alt={title} />
      </div>

      {/* {<MeetupPath />} */}
    </article>
  </Link>
);

export default MeetupItem;
