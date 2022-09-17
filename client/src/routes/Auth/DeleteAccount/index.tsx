import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DeleteAccount.module.scss';
import ClearIcon from '@mui/icons-material/Clear';

const cn = classNames.bind(styles);

const DeleteAccount = () => {
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <div className={cn('header')}>
        <span>탈퇴하기</span>
        <button onClick={onClickClose}>
          <ClearIcon />
        </button>
      </div>
      <div className={cn('content')}></div>
    </div>
  );
};

export default DeleteAccount;
