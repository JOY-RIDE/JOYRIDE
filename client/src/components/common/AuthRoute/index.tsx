import { useRecoilValue } from 'recoil';
import { userIDState } from 'states/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = () => {
  const { pathname } = useLocation();
  return useRecoilValue(userIDState) ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?next=${pathname}`} replace />
  );
};

export default AuthRoute;
