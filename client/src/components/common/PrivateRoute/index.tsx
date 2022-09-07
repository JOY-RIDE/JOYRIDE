import { useRecoilValue } from 'recoil';
import { userIdState } from 'states/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { pathname } = useLocation();
  return useRecoilValue(userIdState) ? (
    <Outlet />
  ) : (
    <Navigate to={`/auth/login?next=${pathname}`} replace />
  );
};

export default PrivateRoute;
