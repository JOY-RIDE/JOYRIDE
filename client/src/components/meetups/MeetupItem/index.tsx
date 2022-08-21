import { ReactElement } from 'react';
import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupItem {
  MeetupInfo: ReactElement;
  title: string;
  imgSRC: string;
  // MeetupPath: ReactElement;
}

const MeetupItem = ({
  MeetupInfo,
  title,
  imgSRC,
}: // MeetupPath,
MeetupItem) => (
  <article className={cn('container')}>
    <div className={cn('container__top')}>
      {MeetupInfo}
      <img className={cn('img')} src={imgSRC} alt={title} />
    </div>

    {/* {<MeetupPath />} */}
  </article>
);

export default MeetupItem;
