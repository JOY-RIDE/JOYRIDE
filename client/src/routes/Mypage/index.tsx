import Profile from 'components/Mypage/Profile';
import styles from './Mypage.module.scss';
import classNames from 'classnames/bind';
import MyMeetupsPreview from 'components/Mypage/MyMeetupsPreview';

const cn = classNames.bind(styles);

const MyPage = () => (
  <div className={cn('container')}>
    <Profile />
    <section className={cn('liked-courses')}>
      <h2 className={cn('title')}>
        좋아요 표시한 코스<span></span>
      </h2>
    </section>
    <MyMeetupsPreview />
    <section className={cn('joined-meetups')}>
      <h2 className={cn('title')}>
        참가한 모임<span></span>
      </h2>
    </section>
    <section className={cn('bookmarked-meetups')}>
      <h2 className={cn('title')}>
        북마크한 모임<span></span>
      </h2>
    </section>
  </div>
);

export default MyPage;
