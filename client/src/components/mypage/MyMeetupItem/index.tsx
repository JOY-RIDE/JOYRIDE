import styles from './MeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import MeetupRoute from '../MeetupRoute';
import { meetupAPI } from 'apis/meetupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { modalContentState, toastMessageState } from 'states/common';
import { ClickHandler } from 'types/callback';
import Confirm from 'components/common/Confirm';

const cn = classNames.bind(styles);

const MyMeetupItem = ({
  id,
  title,
  gatheringPlace,
  meetingDate,
  courseName,
  path,
  status,
}: MeetupData) => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(meetupAPI.closeMeetup, {
    onSuccess: () => {
      showToastMessage('모임을 닫았습니다.');
      queryClient.invalidateQueries(['meetups']);
    },
    onError: () => showToastMessage('모임 닫기 중 문제가 발생했습니다.'),
  });

  const showModal = useSetRecoilState(modalContentState);
  const closeMeetup = () => mutate(id);
  const handleCloseClick: ClickHandler<HTMLButtonElement> = () =>
    showModal(
      <Confirm question="모임을 닫으시겠어요?" onConfirm={closeMeetup} />
    );

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

      <button
        className={cn('close-btn', {
          hidden: dayjs().isAfter(dayjs(meetingDate)) || status === 0,
        })}
        onClick={handleCloseClick}
        disabled={!status}
      >
        {<EventBusyIcon />}모임 닫기
      </button>
    </li>
  );
};

export default MyMeetupItem;
