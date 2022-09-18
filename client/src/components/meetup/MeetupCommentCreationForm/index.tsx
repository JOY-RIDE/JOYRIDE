import styles from './MeetupParticipantList.module.scss';
import classNames from 'classnames/bind';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userIdState } from 'states/auth';
import Button from 'components/common/Button';
import { modalContentState, toastMessageState } from 'states/common';
import { SubmitHandler } from 'types/callback';
import { useRef } from 'react';
import AskLogin from 'components/common/AskLogin';
import { meetupAPI } from 'apis/meetupAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const cn = classNames.bind(styles);

interface MeetupCommentCreationFormProp {
  meetId: number;
}

const MeetupCommentCreationForm = ({
  meetId,
}: MeetupCommentCreationFormProp) => {
  const userId = useRecoilValue(userIdState);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const displayModal = useSetRecoilState(modalContentState);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(meetupAPI.createComment, {
    onSuccess: () => {
      showToastMessage('댓글이 등록되었습니다.');
      queryClient.invalidateQueries(['meetup', Number(meetId)]);
      formRef.current?.reset();
    },
    onError: () => showToastMessage('댓글 등록 중 문제가 발생했습니다.'),
  });

  const handleSubmit: SubmitHandler = e => {
    e.preventDefault();
    if (!userId) {
      displayModal(<AskLogin />);
      return;
    }
    if (!textareaRef.current?.value) return;
    mutate({ meetId, content: textareaRef.current.value });
  };

  return (
    <form ref={formRef} className={cn('form')} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={cn('content')}
        defaultValue=""
        placeholder="댓글을 입력하세요."
      />
      <Button type="submit" color="main" size="md" content="등록" />
    </form>
  );
};
export default MeetupCommentCreationForm;
