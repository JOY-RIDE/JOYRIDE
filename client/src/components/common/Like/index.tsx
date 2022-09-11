import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import classNames from 'classnames/bind';
import styles from './Like.module.scss';
import AskLogin from '../AskLogin';
import { toastMessageState } from 'states/common';
import { userIdState } from 'states/auth';
import { joyrideAxios as axios } from '../../../apis/axios';

const cn = classNames.bind(styles);

interface likeProps {
  count: number | undefined;
}

const Like = ({ count }: likeProps) => {
  const [isLiked, setIsLiked] = useState(0);
  const [like, setLike] = useState(count);
  const [loggedInUser, setLoggedInUser] = useRecoilState(userIdState);
  const showToastMessage = useSetRecoilState(toastMessageState);
  const { roadId: crsNm } = useParams();

  useEffect(() => {
    axios
      .post('/courses/like/check', {
        title: crsNm,
        user_id: loggedInUser,
      })
      .then(response => {
        setIsLiked(response.data.result.isLike);
      }) // 성공 핸들링
      .catch(error => console.log(error));
  }, []);

  const handleLike = () => {
    if (loggedInUser === null) {
      showToastMessage('로그인이 필요한 서비스입니다.');
    } else {
      if (isLiked === 0) {
        setIsLiked(1);
        axios
          .post('/courses/like', {
            title: crsNm,
            user_id: loggedInUser,
          })
          .then(response => console.log(response)) // 성공 핸들링
          .catch(error => console.log(error));
      } else {
        setIsLiked(0);
        setLike(prev => prev! - 1);
      }
    }
  };
  return (
    <div className={styles.like}>
      <button onClick={handleLike}>
        {isLiked == 1 ? (
          <HiOutlineHeart fill="#F95555"></HiOutlineHeart>
        ) : (
          <HiOutlineHeart></HiOutlineHeart>
        )}
      </button>
      {/* TODO 좋아요 숫자 새로고침 없이 리렌더 */}
      {/* <span className={cn('likecnt')}>{count}</span> */}
    </div>
  );
};

export default Like;
