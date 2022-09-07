import styles from './ResetPassword.module.scss';
import { BsQuestionCircle } from 'react-icons/bs';
import classNames from 'classnames/bind';
import PasswordResetForm from 'components/resetPassword/PasswordResetForm';

const cn = classNames.bind(styles);

const ResetPassword = () => (
  <>
    <div className={cn('info-wrapper')}>
      <BsQuestionCircle />
      <h1 className={cn('title')}>비밀번호를 잊어버리셨나요?</h1>
      <p className={cn('info')}>
        JOYRIDE에 가입하신 이메일을 입력해 주세요.
        <br />
        비밀번호 재설정을 도와드리겠습니다.
      </p>
    </div>
    <PasswordResetForm />
  </>
);

export default ResetPassword;
