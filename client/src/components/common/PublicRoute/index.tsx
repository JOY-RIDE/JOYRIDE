import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'states/atoms';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;