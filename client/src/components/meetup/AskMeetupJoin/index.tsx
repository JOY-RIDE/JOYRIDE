import styles from './AskMeetupLogin.module.scss';
import classNames from 'classnames/bind';
import { useResetRecoilState } from 'recoil';
import { modalContentState } from 'states/common';
import Button from 'components/common/Button';

const cn = classNames.bind(styles);

interface AskMeetupJoinProp {
  joinMeetup: () => void;
}

const AskMeetupJoin = ({ joinMeetup }: AskMeetupJoinProp) => {
  const close = useResetRecoilState(modalContentState);
  const handleYesClick = () => {
    joinMeetup();
    close();
  };
  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>모임에 참가할까요?</h1>
      <div className={cn('btns')}>
        <Button
          type="button"
          color="whiteGrey"
          size="md"
          content="다음에 할게요"
          onClick={close}
        />
        <Button
          type="button"
          color="main"
          size="md"
          content="네"
          onClick={handleYesClick}
        />
      </div>
    </div>
  );
};

export default AskMeetupJoin;
