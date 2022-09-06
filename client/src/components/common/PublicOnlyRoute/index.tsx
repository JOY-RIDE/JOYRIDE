import { useRecoilValue } from 'recoil';
import { userIdState } from 'states/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicOnlyRoute = () =>
  useRecoilValue(userIdState) ? <Navigate to="/" replace /> : <Outlet />;

export default PublicOnlyRoute;
