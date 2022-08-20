import styles from './MeetupCardContainer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupCardContainer {
  // MeetupInfo: any;
  title: string;
  image: string;
  // MeetupPath: any;
}

const MeetupCardContainer = ({
  // MeetupInfo,
  title,
  image,
}: // MeetupPath,
MeetupCardContainer) => (
  <article className={cn('container')}>
    <div className={cn('top')}>
      {/* <MeetupInfo /> */}
      <img className={cn('img')} src={image} alt={title} />
    </div>
    {/* {<MeetupPath />} */}
  </article>
);

export default MeetupCardContainer;
