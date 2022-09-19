import styles from './MeetupCommentList.module.scss';
import classNames from 'classnames/bind';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userIdState } from 'states/auth';
import dayjs from 'dayjs';
import { modalContentState, toastMessageState } from 'states/common';
import Confirm from 'components/common/Confirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { meetupAPI } from 'apis/meetupAPI';
import { Comment } from 'types/common';

const cn = classNames.bind(styles);

interface MeetupCommentListProps {
  meetupId: number;
  comments: Comment[];
}

const MeetupCommentList = ({ meetupId, comments }: MeetupCommentListProps) => {
  const userId = useRecoilValue(userIdState);
  const displayModal = useSetRecoilState(modalContentState);
  const showToastMessage = useSetRecoilState(toastMessageState);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(meetupAPI.deleteComment, {
    onSuccess: () => {
      showToastMessage('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries(['meetup', meetupId]);
    },
    onError: () => showToastMessage('댓글 삭제 중 문제가 발생했습니다.'),
  });
  const handleDeleteClick = (commentId: number) => () =>
    displayModal(
      <Confirm
        question="댓글을 삭제할까요?"
        onConfirm={() => mutate(commentId)}
      />
    );

  return (
    <ul className={cn('container')}>
      {comments.map(comment => (
        <li key={comment.id} className={cn('comment')}>
          <div className={cn('top')}>
            <div className={cn('top__data')}>
              <img
                className={cn('avatar')}
                src={comment.profileImgUrl}
                alt={comment.nickname}
              />
              <span className={cn('nickname')}>{comment.nickname}</span>
              <span className={cn('createdAt')}>
                {dayjs(comment.createdAt).format('YYYY.MM.DD')}
              </span>
            </div>
            {userId === comment.userId && (
              <button
                className={cn('delete-btn')}
                onClick={handleDeleteClick(comment.id)}
              >
                삭제
              </button>
            )}
          </div>

          <p className={cn('content')}>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};
export default MeetupCommentList;
