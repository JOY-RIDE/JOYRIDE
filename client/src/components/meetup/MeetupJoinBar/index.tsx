import styles from './MeetupJoinBar.module.scss';
import classNames from 'classnames/bind';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { meetupAPI } from 'apis/meetupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userIdState } from 'states/auth';

function getMeetupJoinFailErrorMessage(code: string) {
  switch (code) {
    case '2033':
      return '이미 참여 중인 모임입니다';
    case '2036':
      return '종료된 모임입니다'; // TODO
    default:
      return '모임 참가 중 문제가 발생했습니다';
  }
}

const cn = classNames.bind(styles);

interface MeetupJoinBarProps {
  meetupId: number;
  dueDate: string;
}

const MeetupJoinBar = ({ meetupId, dueDate }: MeetupJoinBarProps) => {
  const userId = useRecoilValue(userIdState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const queryClient = useQueryClient();
  const mutation = useMutation(meetupAPI.joinMeetup, {
    onSuccess: () => {
      showToastMessage('모임에 참가되었습니다. 즐거운 모임 되세요!');
      queryClient.invalidateQueries(['meetup', meetupId]);
    },
    onError: (e: any) =>
      showToastMessage(getMeetupJoinFailErrorMessage(e.message)),
  });

  const joinMeetup = () => {
    if (!userId) {
      // TODO
      window.alert('로그인이 필요한 서비스입니다. 로그인 안내 모달 제작 예정');
      return;
    }
    if (window.confirm('모임에 참가할까요? 모달 제작 예정')) {
      mutation.mutate(meetupId);
    }
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
        onClick={joinMeetup}
      >
        참가하기
      </button>
    </div>
  );
};

export default MeetupJoinBar;
