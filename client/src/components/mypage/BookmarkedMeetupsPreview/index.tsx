import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import styles from '../MyMeetupsPreview/MyMeetupsPreview.module.scss';
import SectionTitle from '../SectionTitle';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import BookmarkedMeetupItem from '../BookmarkedMeetupItem';
import ItemList from '../ItemList';

const cn = classNames.bind(styles);

const BookmarkedMeetupsPreview = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups', 'bookmark'],
    meetupAPI.getBookmarkedMeetupList,
    {
      staleTime: 60 * 1000,
      onError: () => showToastMessage('로딩 중 문제가 발생했습니다.'),
    }
  );

  return (
    <section className={cn('wrapper')}>
      <header className={cn('header')}>
        <SectionTitle title="북마크한 모임" count={meetups?.length} />
        <Link to="bookmark/meetups" className={cn('more')}>
          <span>더보기</span>
          <AiOutlineRight />
        </Link>
      </header>

      {meetups && (
        <ItemList
          items={meetups.slice(0, 3)}
          ItemComponent={BookmarkedMeetupItem}
        />
      )}
    </section>
  );
};

export default BookmarkedMeetupsPreview;
