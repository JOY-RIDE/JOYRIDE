import styles from './JoinedMeetupItem.module.scss';
import { MeetupData } from 'types/meetup';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { ImExit } from 'react-icons/im';
import MeetupRoute from '../MeetupRoute';
import { meetupAPI } from 'apis/meetupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { modalContentState, toastMessageState } from 'states/common';
import { ClickHandler } from 'types/callback';
import Confirm from 'components/common/Confirm';

const cn = classNames.bind(styles);

const JoinedMeetupItem = ({
  id,
  title,
  gatheringPlace,
  meetingDate,
  courseName,
  path,
}: MeetupData) => {
  const showToastMessage = useSetRecoilState(toastMessageState);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(meetupAPI.exitMeetup, {
    onSuccess: () => {
      showToastMessage('모임을 탈퇴했습니다.');
      queryClient.invalidateQueries(['meetups']);
    },
    onError: () => showToastMessage('모임 탈퇴 중 문제가 발생했습니다.'),
  });

  const showModal = useSetRecoilState(modalContentState);
  const exitMeetup = () => mutate(id);
  const handleExitClick: ClickHandler<HTMLButtonElement> = () =>
    showModal(<Confirm question="모임을 탈퇴할까요?" onConfirm={exitMeetup} />);

  /* TODO: 없어지는지 확인 */
  return (
    <li className={cn('container')}>
      <div className={cn('top')}>
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
        </Link>

        <button
          className={cn('exit-btn', {
            hidden: dayjs().isAfter(dayjs(meetingDate)),
          })}
          onClick={handleExitClick}
        >
          {<ImExit />}모임 탈퇴
        </button>
      </div>
      <MeetupRoute courseName={courseName} path={path} />
    </li>
  );
};

export default JoinedMeetupItem;
