import { useRecoilValue } from 'recoil';
import { userIDState } from 'states/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () =>
  useRecoilValue(userIDState) ? <Navigate to="/" replace /> : <Outlet />;

export default PublicRoute;
