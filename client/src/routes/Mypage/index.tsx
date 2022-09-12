import Profile from 'components/Mypage/Profile';
import styles from './Mypage.module.scss';
import classNames from 'classnames/bind';
import MyMeetupsPreview from 'components/Mypage/MyMeetupsPreview';
import BookmarkedMeetupsPreview from 'components/Mypage/BookmarkedMeetupsPreview';
import JoinedMeetupsPreview from 'components/Mypage/JoinedMeetupsPreview';
import SectionTitle from 'components/Mypage/SectionTitle';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';

const cn = classNames.bind(styles);

const MyPage = () => (
  <div className={cn('container')}>
    <Profile />
    <section className={cn('wrapper')}>
      <header className={cn('header')}>
        <SectionTitle title="좋아요 표시한 코스" />
        <Link to="like/courses" className={cn('more')}>
          <span>더보기</span>
          <AiOutlineRight />
        </Link>
      </header>
    </section>
    <MyMeetupsPreview />
    <JoinedMeetupsPreview />
    <BookmarkedMeetupsPreview />
  </div>
);

export default MyPage;
