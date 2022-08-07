import { useRecoilValue } from 'recoil';
import { userState } from 'states/atoms';
import { Navigate, Outlet } from 'react-router-dom';

const UserOnly = () => {
  const user = useRecoilValue(userState);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default UserOnly;
