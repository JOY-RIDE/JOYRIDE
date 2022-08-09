import { useRecoilValue } from 'recoil';
import { loggedInState } from 'states/atoms';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const loggedIn = useRecoilValue(loggedInState);
  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
