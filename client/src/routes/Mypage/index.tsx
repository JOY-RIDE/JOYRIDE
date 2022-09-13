import Profile from 'components/mypage/Profile';
import styles from './Mypage.module.scss';
import classNames from 'classnames/bind';
import MyMeetupsPreview from 'components/mypage/MyMeetupsPreview';
import BookmarkedMeetupsPreview from 'components/mypage/BookmarkedMeetupsPreview';
import JoinedMeetupsPreview from 'components/mypage/JoinedMeetupsPreview';
import LikedCoursesPreview from 'components/mypage/LikedCoursesPreview';

const cn = classNames.bind(styles);

const MyPage = () => (
  <div className={cn('container')}>
    <Profile />
    <LikedCoursesPreview />
    <MyMeetupsPreview />
    <JoinedMeetupsPreview />
    <BookmarkedMeetupsPreview />
  </div>
);

export default MyPage;
