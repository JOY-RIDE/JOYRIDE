import styles from './BookmarkedMeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsBookmarkFill } from 'react-icons/bs';
import MeetupRoute from '../MeetupRoute';
import { meetupAPI } from 'apis/meetupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';

const cn = classNames.bind(styles);

const BookmarkedMeetupItem = ({
  id,
  title,
  gatheringPlace,
  meetingDate,
  courseName,
  path,
}: MeetupData) => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(meetupAPI.cancelMeetupBookmark, {
    onSuccess: () => {
      showToastMessage('북마크를 해제했습니다.');
      queryClient.invalidateQueries(['meetups', 'bookmark']);
    },
    onError: () => showToastMessage('북마크 해제 중 문제가 발생했습니다.'),
  });
  const cancelBookmark = () => mutate(id);

  /* TODO: 없어지는지 확인 */
  return (
    <li className={cn('container')}>
      <Link to={`/meetups/${id}`}>
        <h1 className={cn('title')}>{title}</h1>
        <div className={cn('meeting')}>
          <div className={cn('place')}>
            <HiOutlineLocationMarker />
            <span>{gatheringPlace}</span>
          </div>
          <span className={cn('date')}>
            {dayjs(meetingDate).format('M월 D일')}
          </span>
        </div>
        <MeetupRoute courseName={courseName} path={path} />
      </Link>

      <button className={cn('cancel-btn')} onClick={cancelBookmark}>
        {<BsBookmarkFill />}
      </button>
    </li>
  );
};

export default BookmarkedMeetupItem;
