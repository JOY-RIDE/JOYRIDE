import { useRecoilValue } from 'recoil';
import { loggedInState } from 'states/atoms';
import { Navigate, Outlet } from 'react-router-dom';

const UserOnly = () => {
  const loggedIn = useRecoilValue(loggedInState);
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default UserOnly;
