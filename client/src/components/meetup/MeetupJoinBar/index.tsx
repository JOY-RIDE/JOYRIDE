import styles from './MeetupJoinBar.module.scss';
import classNames from 'classnames/bind';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalContentState, toastMessageState } from 'states/common';
import { meetupAPI } from 'apis/meetupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userIdState } from 'states/auth';
import AskLogin from 'components/common/AskLogin';
import { useParams } from 'react-router-dom';
import AskMeetupJoin from '../AskMeetupJoin';

function getMeetupJoinFailErrorMessage(code: string) {
  switch (code) {
    case '2033':
      return '이미 참여 중인 모임입니다';
    case '2036':
      return '종료된 모임입니다'; // TODO
    case '2037':
      return '정원이 꽉 찬 모임입니다.';
    default:
      return '모임 참가 중 문제가 발생했습니다';
  }
}

const cn = classNames.bind(styles);

interface MeetupJoinBarProp {
  dueDate: string;
}

const MeetupJoinBar = ({ dueDate }: MeetupJoinBarProp) => {
  const { meetupId } = useParams();
  const userId = useRecoilValue(userIdState);
  const displayModal = useSetRecoilState(modalContentState);
  const showToastMessage = useSetRecoilState(toastMessageState);

  const queryClient = useQueryClient();
  const mutation = useMutation(meetupAPI.joinMeetup, {
    onSuccess: () => {
      showToastMessage('모임에 참가되었습니다. 즐거운 모임 되세요!');
      queryClient.invalidateQueries(['meetup', Number(meetupId)]);
    },
    onError: (e: any) =>
      showToastMessage(getMeetupJoinFailErrorMessage(e.message)),
  });
  const joinMeetup = () => mutation.mutate(Number(meetupId));

  const handleJoinClick = () => {
    if (!userId) {
      displayModal(<AskLogin />);
      return;
    }
    displayModal(<AskMeetupJoin joinMeetup={joinMeetup} />);
  };

  return (
    <div className={cn('container')}>
      <div>
        <button className={cn('bookmark-btn')} aria-label="모임 북마크 버튼">
          {/* TODO: active */}
          <BsBookmark />
          {/* <BsBookmarkFill/> */}
        </button>
        <p>{dueDate} 모집 마감</p>
      </div>
      <button
        className={cn('join-btn')}
        aria-label="모임 참가 버튼"
        onClick={handleJoinClick}
      >
        참가하기
      </button>
    </div>
  );
};

export default MeetupJoinBar;
