import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import MeetUp from 'components/home/MeetUp';
import { AiOutlineRight } from 'react-icons/ai';

const cn = classNames.bind(styles);

const Home = () => (
  <section className={styles.home}>
    <div className={cn('content')}>
      <div className={cn('top')}>
        <span className={cn('title')}>인기 있는 코스</span>
        <Link to="/roads" className={cn('to-list')}>
          더보기 <AiOutlineRight />
        </Link>
      </div>
    </div>
    <div className={cn('content')}>
      <div className={cn('top')}>
        <span className={cn('title')}>모집 중인 모임</span>
        <Link to="/meetups" className={cn('to-list')}>
          더보기 <AiOutlineRight />
        </Link>
      </div>
      <MeetUp />
    </div>
  </section>
);

export default Home;
