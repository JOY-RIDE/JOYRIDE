import styles from './MeetupCardContainer.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface MeetupCardContainer {
  MeetupInfo: any;
  imageSRC: string;
  title: string;
  MeetupRoute: any;
}

const MeetupCardContainer = ({
  MeetupInfo,
  imageSRC,
  title,
  MeetupRoute,
}: MeetupCardContainer) => (
  <article className={cn('container')}>
    <div className={cn('top')}>
      <MeetupInfo />
      <img className={cn('img')} src={imageSRC} alt={title} />
    </div>
    <MeetupRoute />
  </article>
);

export default MeetupCardContainer;
