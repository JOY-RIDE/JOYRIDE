import styles from './FindEmail.module.scss';
import classNames from 'classnames/bind';
import { JOYRIDE_EMAIL } from 'utils/urls';
import Button from 'components/common/Button';
import { useSetRecoilState } from 'recoil';
import { toastMessageState } from 'states/common';
import { BsQuestionCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const cn = classNames.bind(styles);

const FindEmail = () => {
  const navigate = useNavigate();
  const showToastMessage = useSetRecoilState(toastMessageState);
  const handleGoBackClick = () => navigate(-1);
  const handleEmailCopyClick = () =>
    navigator.clipboard
      .writeText(JOYRIDE_EMAIL)
      .then(() => showToastMessage('이메일 주소가 복사되었습니다.'));

  return (
    <div className={cn('wrapper')}>
      <BsQuestionCircle />

      <h1 className={cn('title')}>가입한 이메일을 잊어버리셨나요?</h1>

      <p className={cn('info')}>
        <a
          className={cn('email')}
          href={`mailto:${JOYRIDE_EMAIL}?subject=가입 이메일 찾기 문의`}
        >
          joyride.webservice@gmail.com
        </a>{' '}
        으로
        <br />
        문의를 남겨 주시면 빠르게 도와드리겠습니다.
      </p>

      <div className={cn('btns')}>
        <Button
          type="button"
          color="whiteGrey"
          size="md"
          content="이전으로"
          onClick={handleGoBackClick}
        />
        <Button
          type="button"
          color="main"
          size="md"
          content="이메일 주소 복사하기"
          onClick={handleEmailCopyClick}
        />
      </div>
    </div>
  );
};

export default FindEmail;
