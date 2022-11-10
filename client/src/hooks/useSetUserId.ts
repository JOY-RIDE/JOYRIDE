import { useSetRecoilState } from 'recoil';
import { userIdState } from 'states/auth';

const useSetUserId = () => {
  const setUserId = useSetRecoilState(userIdState);
  return setUserId;
};

export default useSetUserId;
