import { useRecoilValue } from 'recoil';
import { isLoggedInState } from 'states/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () =>
  useRecoilValue(isLoggedInState) ? <Navigate to="/" /> : <Outlet />;

export default PublicRoute;
