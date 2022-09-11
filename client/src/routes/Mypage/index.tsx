import Profile from 'components/Mypage/Profile';
import styles from './Mypage.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const MyPage = () => (
  <div className={cn('container')}>
    <Profile />
  </div>
);

export default MyPage;
