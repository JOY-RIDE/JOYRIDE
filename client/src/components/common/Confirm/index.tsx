import styles from './Confirm.module.scss';
import classNames from 'classnames/bind';
import { useResetRecoilState } from 'recoil';
import { modalContentState } from 'states/common';
import Button from 'components/common/Button';

const cn = classNames.bind(styles);

interface ConfirmProps {
  question: string;
  onConfirm: () => void;
}

const Confirm = ({ question, onConfirm }: ConfirmProps) => {
  const close = useResetRecoilState(modalContentState);
  const handleConfirmClick = () => {
    onConfirm();
    close();
  };
  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>{question}</h1>
      <div className={cn('btns')}>
        <Button
          type="button"
          color="whiteGrey"
          size="md"
          content="아니요"
          onClick={close}
        />
        <Button
          type="button"
          color="main"
          size="md"
          content="네"
          onClick={handleConfirmClick}
        />
      </div>
    </div>
  );
};

export default Confirm;
