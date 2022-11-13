import { useNavigate } from 'react-router-dom';
// import completed from 'assets/images/completed.svg';
import Button from 'components/common/Button';
import styles from './SignupCompleted.module.scss';
import classNames from 'classnames/bind';
import { CgCheckO } from 'react-icons/cg';
import useSignupFormData from 'hooks/signup/useSignupFormData';

const cn = classNames.bind(styles);

const SignupCompleted = () => {
  const [data] = useSignupFormData();
  const { nickname } = data;
  const navigate = useNavigate();
  const handleLoginClick = () => navigate('/auth/login');

  return (
    <div className={cn('wrapper')}>
      <CgCheckO />
      {/* <img src={completed} alt="가입 완료" /> */}

      <h1 className={cn('title')}>
        {nickname}님,
        <br />
        가입이 완료되었습니다
      </h1>

      {/* TODO */}
      <p className={cn('info')}>
        JOYRIDE에서
        <br />
        다양한 자전거 코스와 모임들을 만나보세요!
        {/* {email}으로 발송된 링크를
        <br />
        클릭하시면 계정이 활성화됩니다. */}
      </p>

      <Button
        type="button"
        color="main"
        size="md"
        content="로그인하기"
        onClick={handleLoginClick}
      />
    </div>
  );
};

export default SignupCompleted;
