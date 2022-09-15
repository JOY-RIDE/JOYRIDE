import { FINISH_MARKER_IMAGE, START_MARKER_IMAGE } from 'utils/urls';
import meetup_stop from 'assets/icons/meetup_stop.svg';
import meetup_gatheringPlace from 'assets/icons/meetup_gatheringPlace.svg';
import styles from './MeetupPathMapGuide.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MeetupPathMapGuide = () => (
  <div className={cn('container')}>
    <div className={cn('col')}>
      <div className={cn('mark')}>
        <img src={meetup_gatheringPlace} alt="집결지" />
      </div>
      <p className={cn('desc')}>집결지</p>
    </div>

    <div className={cn('col')}>
      <div className={cn('mark')}>
        <img src={START_MARKER_IMAGE} alt="출발지" />
      </div>
      <p className={cn('desc')}>라이딩 출발지</p>
    </div>

    <div className={cn('col')}>
      <div className={cn('mark')}>
        <img src={meetup_stop} alt="경유지" />
      </div>
      <div className={cn('desc')}>경유지</div>
    </div>

    <div className={cn('col')}>
      <div className={cn('mark')}>
        <img src={FINISH_MARKER_IMAGE} alt="종료지" />
      </div>
      <p className={cn('desc')}>라이딩 종료지</p>
    </div>

    <div className={cn('col')}>
      <div className={cn('mark')}>
        <div className={cn('line')} />
      </div>
      <p className={cn('desc')}>경로</p>
    </div>
  </div>
);

export default MeetupPathMapGuide;
