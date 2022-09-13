import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames/bind';
import styles from './ModifyProfile.module.scss';
import { userProfileState } from 'states/auth';
import ClearIcon from '@mui/icons-material/Clear';

const cn = classNames.bind(styles);

const ModifyProfile = () => {
  const userProfile = useRecoilValue(userProfileState);
  console.log(userProfile);

  const navigate = useNavigate();
  const onClickClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={cn('header')}>
        <span>개인정보 수정하기</span>
        <button onClick={onClickClose}>
          <ClearIcon />
        </button>
      </div>
    </div>
  );
};

export default ModifyProfile;
