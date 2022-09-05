import { useRecoilValue } from 'recoil';
import { userIDState } from 'states/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicOnlyRoute = () =>
  useRecoilValue(userIDState) ? <Navigate to="/" replace /> : <Outlet />;

export default PublicOnlyRoute;
