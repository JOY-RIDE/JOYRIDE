import styles from './MeetupCommentList.module.scss';
import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';
import { userIdState } from 'states/auth';
import dayjs from 'dayjs';

const cn = classNames.bind(styles);

interface MeetupCommentListProp {
  comments: any[]; // TODO
}

const MeetupCommentList = ({ comments }: MeetupCommentListProp) => {
  const userId = useRecoilValue(userIdState);
  return (
    <ul className={cn('container')}>
      {comments.map(comment => (
        <li key={comment.id} className={cn('comment')}>
          <div className={cn('top')}>
            <div className={cn('top__data')}>
              <img
                className={cn('avatar')}
                src={comment.author.image}
                alt={comment.author.nickname}
              />
              <span className={cn('nickname')}>{comment.author.nickname}</span>
              <span className={cn('createdAt')}>
                {dayjs(comment.createdAt).format('YYYY.MM.DD')}
              </span>
            </div>

            {userId === comment.author.id && (
              <button className={cn('delete-btn')}>삭제</button>
            )}
          </div>
          <p className={cn('content')}>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};
export default MeetupCommentList;
