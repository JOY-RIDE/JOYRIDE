import Profile from 'components/mypage/Profile';
import styles from './Mypage.module.scss';
import classNames from 'classnames/bind';
import MyMeetupsPreview from 'components/mypage/MyMeetupsPreview';
import BookmarkedMeetupsPreview from 'components/mypage/BookmarkedMeetupsPreview';
import JoinedMeetupsPreview from 'components/mypage/JoinedMeetupsPreview';
import SectionTitle from 'components/mypage/SectionTitle';
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
