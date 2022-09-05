import { useRecoilValue } from 'recoil';
import { userIDState } from 'states/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { pathname } = useLocation();
  return useRecoilValue(userIDState) ? (
    <Outlet />
  ) : (
    <Navigate to={`/auth/login?next=${pathname}`} replace />
  );
};

export default PrivateRoute;
