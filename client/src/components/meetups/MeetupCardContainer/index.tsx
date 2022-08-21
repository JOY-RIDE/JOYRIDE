import styles from './MeetupCardContainer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupCardContainer {
  // MeetupInfo: any;
  title: string;
  imgSRC: string;
  // MeetupPath: any;
}

const MeetupCardContainer = ({
  // MeetupInfo,
  title,
  imgSRC,
}: // MeetupPath,
MeetupCardContainer) => (
  <article className={cn('container')}>
    <div className={cn('container__top')}>
      {/* <MeetupInfo /> */}
      <img className={cn('img')} src={imgSRC} alt={title} />
    </div>
    {/* {<MeetupPath />} */}
  </article>
);

export default MeetupCardContainer;
