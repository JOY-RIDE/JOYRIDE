import styles from './MeetupItem.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupItem {
  // MeetupInfo: any;
  title: string;
  imgSRC: string;
  // MeetupPath: any;
}

const MeetupItem = ({
  // MeetupInfo,
  title,
  imgSRC,
}: // MeetupPath,
MeetupItem) => (
  <article className={cn('container')}>
    <div className={cn('container__top')}>
      {/* <MeetupInfo /> */}
      <img className={cn('img')} src={imgSRC} alt={title} />
    </div>
    {/* {<MeetupPath />} */}
  </article>
);

export default MeetupItem;
