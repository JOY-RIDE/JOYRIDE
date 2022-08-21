import { useNavigate } from 'react-router-dom';
import completed from 'assets/images/completed.svg';
import Button from 'components/common/Button';
import styles from './SignupCompleted.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface SignupCompletedProps {
  email: string;
  nickname: string;
}

const SignupCompleted = ({ email, nickname }: SignupCompletedProps) => {
  const navigate = useNavigate();
  const handleLoginClick = () => navigate('/login');

  return (
    <div className={cn('page')}>
      <img src={completed} alt="가입 완료" />
      <h1 className={cn('title')}>
        {nickname}님,
        <br />
        가입이 완료되었습니다
      </h1>
      <p className={cn('info')}>
        {email}으로 발송된 링크를
        <br />
        클릭하시면 계정이 활성화됩니다.
      </p>
      <Button
        color="main"
        size="md"
        text="로그인하기"
        onClick={handleLoginClick}
      />
    </div>
  );
};

export default SignupCompleted;
