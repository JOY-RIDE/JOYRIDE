import classNames from 'classnames/bind';
import { useRecoilValue } from 'recoil';
import { userProfileState } from 'states/auth';
import { UserProfile } from 'types/auth';
import { stringifyGender, stringifyRidingSkill } from 'utils/stringify';
import styles from './Profile.module.scss';
import { BiPencil } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const cn = classNames.bind(styles);

const Profile = () => {
  const {
    nickname,
    image,
    manner,
    gender,
    birthYear,
    bicycleType,
    ridingSkill,
    introduce,
  } = useRecoilValue(userProfileState) as UserProfile;
  const User = useRecoilValue(userProfileState) as UserProfile;
  return (
    <div className={cn('container')}>
      <img className={cn('img')} src={image} alt={nickname} />
      <div className={cn('text')}>
        <div className={cn('nickname-wrapper')}>
          <h1 className={cn('nickname')}>{nickname}</h1>
          <Link to="modify_profile" aria-label="정보 수정 링크 버튼">
            <BiPencil />
          </Link>
        </div>

        <div className={cn('details')}>
          <div className={cn('field')}>
            <label className={cn('label')}>매너 온도</label>
            <span className={cn('data')}>{manner}°C</span>
          </div>
          <div className={cn('field')}>
            <label className={cn('label')}>성별</label>
            <span className={cn('data')}>
              {gender ? stringifyGender(gender) : '없음'}
            </span>
          </div>
          <div className={cn('field', 'age')}>
            <label className={cn('label')}>나이</label>
            <div className={cn('data')}>
              {birthYear ? (
                <>
                  {new Date().getFullYear() - birthYear + 1}세{' '}
                  <span>({birthYear}년)</span>
                </>
              ) : (
                '없음'
              )}
            </div>
          </div>
          <div className={cn('field')}>
            <label className={cn('label')}>자전거 종류</label>
            <span className={cn('data')}>{bicycleType || '없음'}</span>
          </div>
          <div className={cn('field')}>
            <label className={cn('label')}>라이딩 실력</label>
            <span className={cn('data')}>
              {ridingSkill ? stringifyRidingSkill(ridingSkill) : '없음'}
            </span>
          </div>
          <div className={cn('field')}>
            <label className={cn('label')}>상태 메세지</label>
            <span className={cn('data', 'null')}>{introduce || '없음'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
