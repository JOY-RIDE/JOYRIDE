import { MeetupData } from 'types/meetup';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { useQuery } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import styles from '../MyMeetupsPreview/MyMeetupsPreview.module.scss';
import MeetupList from '../MeetupList';
import SectionTitle from '../SectionTitle';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';

const cn = classNames.bind(styles);

const BookmarkedMeetupsPreview = () => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { data: meetups } = useQuery<MeetupData[]>(
    ['meetups'],
    meetupAPI.getBookmarkedMeetupList,
    {
      staleTime: 24 * 60 * 60 * 1000,
      cacheTime: Infinity,
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
      {meetups && <MeetupList meetups={meetups.slice(0, 3)} />}
    </section>
  );
};

export default BookmarkedMeetupsPreview;