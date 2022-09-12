import Profile from 'components/Mypage/Profile';
import styles from './Mypage.module.scss';
import classNames from 'classnames/bind';
import MyMeetupsPreview from 'components/Mypage/MyMeetupsPreview';
import BookmarkedMeetupsPreview from 'components/Mypage/BookmarkedMeetupsPreview';
import JoinedMeetupsPreview from 'components/Mypage/JoinedMeetupsPreview';
import SectionTitle from 'components/Mypage/SectionTitle';

const cn = classNames.bind(styles);

const MyPage = () => (
  <div className={cn('container')}>
    <Profile />
    <section className={cn('wrapper')}>
      <header className={cn('header')}>
        <SectionTitle title="좋아요 표시한 코스" />
      </header>
    </section>
    <MyMeetupsPreview />
    <JoinedMeetupsPreview />
    <BookmarkedMeetupsPreview />
  </div>
);

export default MyPage;
